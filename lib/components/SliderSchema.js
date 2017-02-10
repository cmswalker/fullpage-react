const React = require('react');
const { KEY_IDX, defaultClass, GET_BODY, GET_BROWSER, GET_OS} = require('../utils/renderUtils');
const scrollDirection = new(require('../utils/scrollDirection'));
var FULLPAGE;

const events = require('../events');

const VERTICAL = 'VERTICAL';
const HORIZONTAL = 'HORIZONTAL';
const noOp = () => {};

var APPLIED_RESIZE = false;
var needsConversion = null;

class SliderSchema extends React.Component {
  constructor(props) {
    super(props);
    var p = this.props;

    const winProp = p.horizontal ? 'innerWidth' : 'innerHeight';
    const noOp = () => {};

    this.horizontalIncrement = p.horizontalIncrement || noOp;
    this.horizontalDecrement = p.horizontalDecrement || noOp;
    this.horizontalResetHead = p.horizontalResetHead || noOp;
    this.horizontalResetTail = p.horizontalResetTail || noOp;

    var slideComponents = getSlides(p.children);

    this.state = {
      name: 'SliderSchema',
      type: p.horizontal ? 'horizontal' : 'vertical',
      slideChildren: slideComponents,
      originalChildren: slideComponents,
      winProp,
      downThreshold: p.downThreshold || 100,
      upThreshold: p.upThreshold || 100,
      slides: [],
      navElements: p.navElements || {}
    };

    this.onScroll = this.onScroll.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    if (!p.horizontal) {
      if (!FULLPAGE) {
        FULLPAGE = this;
        events.pub(FULLPAGE, FULLPAGE.state.type, FULLPAGE.goTo);
      } else {
        throw new Error('Only one instance of fullpage allowed')
      }
    } else {
      events.pub(this, `${this.state.type}-${this.props.name}`, this.goTo);
    }

  }

  // shouldComponentUpdate(nP, nS) {
  //   if (nP.horizontal) {
  //     const p = this.props;
  //     const s = this.state;
  //     console.log(p, nP);
  //     console.log(s, nS);
  //   }
  //   return true;
  // }

  goTo(slide, cb) {
    cb = cb || noOp;
    const direction = this.state.type === 'vertical' ? 'vertical' : 'horizontal';
    const current = this.state.activeSlide;
    const node = this.node;

    if (slide == current) {
      return;
    }

    if (direction === 'vertical') {
      return this.scrollVertical.call(FULLPAGE, node, slide, events.fullpageActiveSlide);
    }

    //else do hori
  }

  componentDidMount() {
    const body = GET_BODY();

    if (body.scrollTop > 0) {
      setTimeout(() => {
        body.scrollTop = 0;
      }, 0)
    }

    const p = this.props;
    const s = this.state;
    const node = this.node;

    if (!APPLIED_RESIZE) {
      window.addEventListener('resize', this.resize.bind(this, s.winProp));
      //override the threshold for windows firefox
      var b = GET_BROWSER();
      var os = GET_OS();
      if (b === 'Firefox' && os === 'WINDOWS') {
        needsConversion = true;
      }
      window.addEventListener('keydown', this.checkKey);

      APPLIED_RESIZE = true;
    }

    node.addEventListener('wheel', this.onScroll);
    node.addEventListener('touchmove', this.onTouchStart);
    node.addEventListener('touchend', this.onTouchEnd);

    this.resize();
  }

  resize() {
    var s = this.state;
    var p = this.props;
    var winProp = s.winProp;
    var slides = [];

    for (let i = 0; i < p.slideCount; i++) {
      slides.push(window[winProp] * i);
    }

    this.setState({
      slides,
      height: window.innerHeight
    });

    //for preserving state
    this.removeChildren(() => {
      if (p.activeSlide === 0) {
        this.mountFirst()
      } else {
        this.mountIdx(p.activeSlide);
      }
    });
  }

  onTouchStart(e) {
    e.preventDefault();
    var t = e.touches[0].clientY;

    scrollDirection.latestTouch = t;
    scrollDirection.addTouch(t);

    if (scrollDirection.touchFulfilled()) {
      this.setState({'touchStart': scrollDirection.getTouch(0)});
      scrollDirection.resetTouches();
    }
  }

  onTouchEnd(e) {
    var s = this.state;
    var p = this.props;
    const touchEnd = e.changedTouches[0].clientY;
    const touchStart = s.touchStart;
    const sensitivity = s.touchSensitivity;

    //prevent standard taps creating false positives;
    if (scrollDirection.latestTouch !== touchEnd) {
      return;
    }

    if ((!touchStart) || touchStart > (touchEnd + Math.abs(sensitivity / 2)) ) {

      if (p.activeSlide === p.slideCount - 1) {// prevent down going down
        return;
      }

      return this.scrollToSlide(this.node, p.activeSlide + 1);
    }

    if (p.activeSlide === 0) {// prevent up going up
      return;
    }

    this.scrollToSlide(this.node, p.activeSlide - 1);
  }

  onArrowClick() {
    this.scrollToSlide(this.node, this.state.activeSlide + 1);
  }

  onScroll(e) {
    e.preventDefault();

    if (events.SCROLL_PENDING) {
      return;
    }

    var s = this.state;
    var p = this.props;

    var meas = (1 > 2) ? -e.deltaY : (e.wheelDelta || -e.deltaY || e.detail);
    //windows firefox produces very low wheel activity so we have to multiply it
    // if (needsConversion) {
    //   meas = meas * 3;
    // }

    const scrollDown =  meas < s.downThreshold;
    const scrollUp = !scrollDown && ( meas > s.upThreshold );

    if (!scrollDown && !scrollUp) {
      return;
    }

    const x = e.deltaX;
    const y = e.deltaY;

    scrollDirection.addXScroll(x);
    scrollDirection.addYScroll(y);

    scrollDirection.scrollFulfilled((fulfilled, direction) => {
      if (!fulfilled) {
        return;
      }

      //NOTE:Important
      if (direction === HORIZONTAL && !p.horizontal) {
        return;
      }

      var activeSlide = p.activeSlide;
      var limit = p.slideCount - 1;

      //NOTE:Important
      if (direction === VERTICAL) {
        activeSlide = events.fullpageActiveSlide;
        limit = events.fullpageSlideCount - 1;
      }

      const node = this.node;

      if (scrollDown) {

        if (activeSlide === limit) {// prevent down going down
          if (p.scrollBack) {
            activeSlide = -1;
          } else if (p.horizontal) {
            //continue
          } else {
            return;
          }
        }

        activeSlide++;
      } else if (scrollUp) {

          if (!activeSlide) {// prevent up going up
            if (p.scrollBack) {
              activeSlide = s.originalChildren.length;
            } else if (p.horizontal) {
              //continue
            } else {
              return;
            }

          }

          activeSlide--;
      }

      events.SCROLL_PENDING = true;
      if (direction === VERTICAL) {
        return this.scrollVertical.call(FULLPAGE, node, activeSlide, events.fullpageActiveSlide);
      }

      this.scrollHorizontal(node, activeSlide, p.activeSlide);
    });
  }

  scrollVertical(element, slide, currentActive) {
    const s = this.state;
    const p = this.props;
    const ACTION = currentActive < slide ? 'INCREMENT' : 'DECREMENT';

    var destination = window.innerHeight;

    //start increment
    if (ACTION === 'INCREMENT') {

      let idx = s.originalChildren[slide] ? slide : 0;
      let child = s.originalChildren[idx];

      if (idx === 0) {
        if (!p.infinite) {
          return events.SCROLL_PENDING = false;
        }
      }

      this.appendChild(child, () => {
        //here if idx is 0, we know it was on infinite;
        if (idx === 0 && p.infinite) {
          p.fullpageResetHead(destination, () => {
            this.removeChild(0);
          });

          return;
        }

        let difference = slide - currentActive;

        if (difference === 1) {
          p.fullpageIncrement(destination, () => {
            this.removeChild(0);
          });
        } else {
          p.fullpageIncrementJump(destination, difference, () => {
            this.removeChild(0);
          });
        }

      });

      return;
    }

    let originalLen = s.originalChildren.length;
    let idx = s.originalChildren[slide] ? slide : originalLen - 1;
    let child = s.originalChildren[idx];

    if (idx === originalLen -1) {
      if (!p.infinite) {
        return events.SCROLL_PENDING = false;
      }
    }

    this.prependChild(child, () => {
      //here if idx is equal to aray length, we know it was on infinite;
      if (idx === originalLen -1 && p.infinite) {
        p.fullpageResetTail(destination, () => {
          this.removeChild(1);
        });
        return;
      }

      let difference = currentActive - slide;

      if (difference === 1) {
        p.fullpageDecrement(destination, () => {
          this.removeChild(1);
        });
      } else {
        p.fullpageDecrementJump(destination, difference, () => {
          this.removeChild(1);
        });
      }


    });
  }

  scrollHorizontal(element, slide, currentActive) {
    const s = this.state;
    const p = this.props;
    const ACTION = currentActive < slide ? 'INCREMENT' : 'DECREMENT';

    var destination = window.innerWidth;

    //start increment
    if (ACTION === 'INCREMENT') {
      //append the next child
      let idx = s.originalChildren[slide] ? slide : 0;
      let child = s.originalChildren[idx];

      if (idx === 0) {
        if (!p.infinite) {
          return events.SCROLL_PENDING = false;
        }
      }

      this.appendChild(child, () => {

        //here if idx is 0, we know it was on infinite;
        if (idx === 0 && p.infinite) {
          this.horizontalResetHead(destination, () => {
            this.removeChild(0);
          });
          return;
        }

        this.horizontalIncrement(destination, () => {
          this.removeChild(0);
        });
      });

      return;
    }

    //start decrement
    let originalLen = s.originalChildren.length;
    let idx = s.originalChildren[slide] ? slide : originalLen - 1;
    let child = s.originalChildren[idx];


    if (idx === originalLen -1) {
      if (!p.infinite) {
        return events.SCROLL_PENDING = false;
      }
    }

    this.prependChild(child, () => {
      //here if idx is equal to length, we know it was on infinite;
      if (idx === originalLen -1 && p.infinite) {
        this.horizontalResetTail(destination, () => {
          this.removeChild(1);
        });
        return;
      }

      this.horizontalDecrement(destination, () => {
        this.removeChild(1);
      });
    });
  }

  prependChild(child, cb) {
    cb = cb || noOp;
    var slides = this.state.slideChildren.slice(0);
    slides.unshift(child);
    this.setState({slideChildren: slides}, cb);
  }

  appendChild(child, cb) {
    cb = cb || noOp;
    var slides = this.state.slideChildren.slice(0);
    slides.push(child);
    this.setState({slideChildren: slides}, cb);
  }

  removeChild(idx, cb) {
    console.log('----------------------------', idx)
    cb = cb || noOp;
    var slides = this.state.slideChildren.slice(0);
    slides.splice(idx, 1);
    this.setState({slideChildren: slides}, cb);
  }

  removeChildren(cb) {
    console.log('**')
    //this should only remove slides
    cb = cb || noOp;
    this.setState({slideChildren: []}, cb);
  }

  mountFirst(cb) {
    cb = cb || noOp;
    this.setState({slideChildren: [this.state.originalChildren[0]] }, cb);
  }

  mountIdx(idx, cb) {
    cb = cb || noOp;
    this.setState({slideChildren: [this.state.originalChildren[idx]] }, cb);
  }

  render() {
    var p = this.props;
    var s = this.state;

    var horizontal = p.horizontal;
    var horizontalSlideStyle = {display: 'inline-block', height: '100%', width: '100%'};
    var testStyles = {'textAlign': 'center', 'fontSize': '30px'};

    if (horizontal) {
      console.log('rendering', p.name)
      return (
        <div ref={node => this.node = node} className={defaultClass.call(this)} style={{height: s.height || window.innerHeight}}>

          {(p.children || []).filter((c, i) => {
            return c.type.name === 'HorizontalNav';
          })}

          <div className='HorizontalSlides' style={{height: s.height || window.innerHeight}}>

            {(s.slideChildren || []).map((c, i) => {
              if (c.type.name === 'Slide') {
                return <div key={i} style={Object.assign(horizontalSlideStyle, testStyles)}>{c}</div>
              }

              return null;
            })}
          </div>

        </div>
      );
    }

    return (
      <div ref={node => this.node = node} className={defaultClass.call(this)} style={{height: s.height || window.innerHeight}}>
        { (p.children || []).filter((c, i) => {
            return c.type.name !== 'Slide' && c.type.name !== 'HorizontalSlider';
        }) }

        {(s.slideChildren || []).map((c, i) => {
          if (c.type.name === 'Slide' || c.type.name === 'HorizontalSlider') {
            return c;
          }

          return null;
        })}
      </div>
    );

  }
}

function getSlides(children = []) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.filter(c => {
    if (c.type.name === 'Slide' || c.type.name === 'HorizontalSlider') {
      return true;
    }

    return false;
  });
}

SliderSchema.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  name: React.PropTypes.string.isRequired
};
module.exports = SliderSchema;

//TODO: the event global needs to call actions at the schema level so we can do child manipulation. Above this it wont animate properly
//TODO: only use derement JUMP and increment JUMP (pass default difference to all actions, even if we dont need it)
