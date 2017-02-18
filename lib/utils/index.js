const events = require('./events');
const renderUtils = require('./renderUtils');
const scrollTo = require('./scrollTo');
const series = require('./series');
const {changeSlide, display} = require('../actions');
const noOp = () => {};

const NONE = 'none';
const BLOCK = 'block';
const I_BLOCK = 'inline-block';
const HEAD = 'HEAD';
const TAIL = 'TAIL';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function getSlideComponents(children = [], considerHorizontals) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.filter(c => {
    if (!c) {
      return false;
    }

    if (c.type.name === 'Slide') {
      return true;
    }

    if (considerHorizontals && c.type.name === 'HorizontalSlider') {
      return true;
    }

    return false;
  });
}

function resize() {
  const s = this.state;
  const p = this.props;
  const { slideComponents } = s;
  const winProp = this.winProp;
  const { infinite } = p;
  const isHorizontal = this.name === 'HorizontalSlider';

  var slides = [];

  for (let i = 0; i < s.slideCount; i++) {
    slides.push(window[winProp] * i);
  }

  //build snapshots for the first and only time;
  const considerHorizontals = this.name === 'Fullpage' ? true : false;
  var validComponents = getSlideComponents(p.children, considerHorizontals);

  // if (!this.snapShots) {
  //   this.snapShots = buildSnapshots(validComponents);
  // }

  // var currentSlides = validComponents;
  //
  // currentSlides = swap.call(this, s.activeSlide);

  this.setState({
    // slideComponents: currentSlides,
    slideComponentsConst: validComponents,
    slides,
    height: window.innerHeight,
    width: window.innerWidth
  }, applyInfiniteStyles.bind(this));
}

function removeAllButActive(activeSlide, cb) {
  // here we could just snatch everything
  cb = cb || noOp;

  var arr = document.querySelectorAll(`[data-slide=${this.name}]`);

  arr.forEach((elem, i) => {
    if (i !== activeSlide) {
      elem.style.display = 'none';
    }
  });

  return cb();

  let count = 0;

  this.props.children.forEach((c) => {
    if (c.type.name !== 'Slide' && c.type.name !== 'HorizontalSlider') {
      return;
    }

    if (count !== this.state.activeSlide) {
      applyDisplay(c, NONE);
    }
    count++
  });

  this.setState({force: !this.state.force}, cb);

  // var snap = swap.call(this, activeSlide);
  // //first we swap them
  //
  // var slideComponents = snap.map((c, i) => {
  //   if (i !== 1) {
  //     applyDisplay(c, NONE);
  //   }
  //
  //   return c;
  // });
  //
  // this.setState({slideComponents}, cb);
}

function applyInfiniteStyles(cb) {
  cb = cb || noOp;
  removeAllButActive.call(this, this.state.activeSlide, cb);
}

function applyVisibiltyToAll(cb) {
  cb = cb || noOp;
  const styleProp = this.name === 'HorizontalSlider' ? I_BLOCK : BLOCK;

  var arr = document.querySelectorAll(`[data-slide=${this.name}]`);
  arr.forEach((elem, i) => {
    elem.style.display = styleProp
  });
  return cb();



  var slideComponents = this.state.slideComponents.map((c) => {
    applyDisplay(c, styleProp);
    return c;
  });

  this.setState({slideComponents}, cb);
}

function applyDisplay(component, val) {
  if (!component.props.style) {
    throw new Error('must provide style prop to ', component.type);
  }

  component.props.style.display = val;
}

function insertChild(idx, cb) {
  cb = cb || noOp;
  var slideComponents = this.state.slideComponents.map((c, i) => {
    if (i === idx) {
      applyDisplay(c, this.slideStyleProp);
    }

    return c;
  });
  this.setState({slideComponents}, cb);
}

function removeChild(idx, cb) {
  cb = cb || noOp;
  var slideComponents = this.state.slideComponents.map((c, i) => {
    if (i === idx) {
      applyDisplay(c, NONE);
    }

    return c;
  });
  this.setState({slideComponents}, cb);
}

const INTENT_MAP = {
	'VERTICAL': {
		0: 'UP',
		1: 'DOWN'
	},
	'HORIZONTAL': {
		0: 'LEFT',
		1: 'RIGHT'
	}
};

function buildSnapshots(slides) {
  var len = slides.length;
  var result = {};

  for (let i = 0; i < len; i++) {
    let leftIdx = slides[i - 1] ? i - 1 : len - 1;
    let rightIdx = slides[i + 1] ? i + 1 : 0;
    result[i] = [slides[leftIdx], slides[i], slides[rightIdx]];
  }


  return result;
}

function swap(currentActive) {
  return this.snapShots[currentActive];
}

function handleScroll(data, direction, scrollElement, callback) {

  const s = this.state;
  const p = this.props;
  const isHorizontal = this.name === 'HorizontalSlider';

  const { infinite, resetSlides } = p;
  const { node, ss } = this;

  const intent = INTENT_MAP[direction][data.intent];

  const scrollUp = intent === 'UP' || intent === 'LEFT';
  const scrollDown = intent === 'DOWN' || intent === 'RIGHT';

  //windows firefox produces very low wheel activity so we have to multiply it
  // if (needsConversion) {
  //   meas = meas * 3;
  // }
  //
  // if (needsConversionOSX) {
  //   meas = meas * 40;

  let activeSlide = s.activeSlide;

  if (scrollDown) {
    if (activeSlide === s.slideCount -1 && !infinite && !resetSlides) {// prevent down going down
      ss.listen();
      return this.setState({scrollPending: false});
    }

    activeSlide = activeSlide + 1;

  } else {
    if (activeSlide === 0 && !infinite && !resetSlides) {// prevent up going up
      ss.listen();
      return this.setState({scrollPending: false});
    }

    activeSlide = activeSlide - 1;
  }

  this.setState({scrollPending: true});

  let action = scrollDown ? INCREMENT : DECREMENT;

  if (resetSlides || infinite) {
    //reset flow
    if (action === INCREMENT) {
      if (!s.slideComponentsConst[activeSlide]) {
        activeSlide = 0;
        action = HEAD;
      }
    } else {
      if (!s.slideComponents[activeSlide]) {
        activeSlide = s.slideComponentsConst.length -1;
        action = TAIL;
      }
    }
  }

  let scrollDestination = window[this.winProp] * activeSlide;
  let c;
  let next;
  let last;
  let windowVal = s.activeSlide;

  const swap = infinite && (action === HEAD || action === TAIL);

  if (swap) {
    var arr = document.querySelectorAll(`[data-slide=${this.name}]`);

    for (let i = 0; i < arr.length; i++) {
      if (c) {
        break;
      }

      if (i === s.activeSlide) {
        c = arr[i];
        if (action === HEAD) {
          last = arr[0];
          next = arr[1] || c;
        } else {
          last = arr[arr.length - 1];
          next = arr[i + 1] || c;
        }
      }
    }

    if (action === HEAD) {
      windowVal = 0;
      scrollDestination = window.innerHeight;
    } else {
      //set it at the footer;
      windowVal = 1;
      scrollDestination = 0;
    }
  }

  if (swap) {
    if (action === HEAD) {
      swapElements(c, last);
      swapElements(last, next);
    } else {
      swapElements(last, next);
      swapElements(c, last);
    }
  }

  series([
    (done) => {
      applyVisibiltyToAll.call(this);
      scrollElement[this.elementBoundary] = window[this.winProp] * windowVal;

      scrollTo(scrollElement, this.elementBoundary, scrollDestination, this.scrollSpeed, () => {
        if (swap) {
          if (action === HEAD) {
            swapElements(last, next);
            swapElements(c, last);
          } else {
            swapElements(c, last);
            swapElements(last, next);
          }
        }

        done();
      });
    },
    (done) => {
      removeAllButActive.call(this, activeSlide);
      done();
    }
  ], () => {
    const newState = changeSlide(this.state, {type: action}, 1);
    this.setState(newState, () => {
      callback(this.state);
    });

    setTimeout(() => {
      this.setState({scrollPending: false}, () => {
        ss.listen();
      });

    }, ( (s.scrollSensitivity * 4) + 500));
  });

}

module.exports = {
  swap,
  removeAllButActive,
  series,
  INTENT_MAP,
  handleScroll,
  applyVisibiltyToAll,
  resize,
  insertChild,
  removeChild,
  getSlideComponents,
  events,
  renderUtils,
  scrollTo
}

function swapElements(obj1, obj2) {
  // save the location of obj2
  var parent2 = obj2.parentNode;
  var next2 = obj2.nextSibling;
  // special case for obj1 is the next sibling of obj2
  if (next2 === obj1) {
      // just put obj1 before obj2
      parent2.insertBefore(obj1, obj2);
  } else {
      // insert obj2 right before obj1
      obj1.parentNode.insertBefore(obj2, obj1);

      // now insert obj1 where obj2 was
      if (next2) {
          // if there was an element after obj2, then insert obj1 right before that
          parent2.insertBefore(obj1, next2);
      } else {
          // otherwise, just append as last child
          parent2.appendChild(obj1);
      }
  }
}
