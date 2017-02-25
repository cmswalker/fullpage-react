const renderUtils = require('./renderUtils');
const scrollTo = require('./scrollTo');
const series = require('./series');
const { changeSlide } = require('../actions');
const { noOp, NONE, BLOCK, I_BLOCK, HEAD, TAIL, INCREMENT, DECREMENT } = require('./constants');

function getSlideComponents(children = [], considerHorizontals) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.filter(c => {
    if (!c || !c.type) {
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

  const considerHorizontals = this.name === 'Fullpage' ? true : false;
  var validComponents = getSlideComponents(p.children, considerHorizontals);

  this.setState({
    slideComponentsConst: validComponents,
    slideCount: validComponents.length,
    width: window.innerWidth,
    height: window.innerHeight
  }, removeAllButActive.bind(this, s.activeSlide));
}

function jumpScroll(activeSlide, scrollElement, cb) {
  cb = cb || noOp;

  let windowVal = this.state.activeSlide;
  let scrollDestination = window[this.winProp] * activeSlide;

  applyVisibiltyToAll.call(this);
  scrollElement[this.elementBoundary] = window[this.winProp] * windowVal;

  scrollTo(scrollElement, this.elementBoundary, scrollDestination, this.scrollSpeed, () => {
    removeAllButActive.call(this, activeSlide);
    const newState = {activeSlide, scrollPending: false};
    this.setState(newState, () => {
      cb(this.state);
    });
  });
}

function removeAllButActive(activeSlide) {
  var arr = document.querySelectorAll(`[data-slide=${this.name}]`);
  arr = Array.prototype.slice.call(arr);
  arr.forEach((elem, i) => {
    if (i !== activeSlide) {
      elem.style.display = NONE;
    }
  });
}

function applyVisibiltyToAll() {
  const styleProp = this.name === 'HorizontalSlider' ? I_BLOCK : BLOCK;

  var arr = document.querySelectorAll(`[data-slide=${this.name}]`);
  arr = Array.prototype.slice.call(arr);

  arr.forEach((elem) => {
    elem.style.display = styleProp
  });
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

function handleScroll(data, direction, scrollElement, callback) {
  const s = this.state;
  const p = this.props;
  const { resetSlides } = p;
  const { infinite, ss } = this;

  const intent = INTENT_MAP[direction][data.intent];

  const scrollUp = intent === 'UP' || intent === 'LEFT';
  const scrollDown = intent === 'DOWN' || intent === 'RIGHT';

  //windows firefox produces very low wheel activity so we have t\\o multiply it
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
      if (!s.slideComponentsConst[activeSlide]) {
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
    arr = Array.prototype.slice.call(arr);

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
      scrollDestination = window[this.winProp];
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
    }, 700);

  });

}

module.exports = {
  removeAllButActive,
  series,
  INTENT_MAP,
  handleScroll,
  applyVisibiltyToAll,
  resize,
  getSlideComponents,
  renderUtils,
  scrollTo,
  jumpScroll
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
