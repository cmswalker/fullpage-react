const React = require('react');
const ReactDOM = require('react-dom');
const ScrollSwipe = require('scroll-swipe');

const Slide = require('./slide');
const HorizontalSliderModule = require('./HorizontalSlider');

const { HorizontalSlider, changeHorizontalSlide } = HorizontalSliderModule;


const {changeSlide, display} = require('../actions');
const utils = require('../utils');
const { handleScroll, removeAllButActive, applyVisibiltyToAll, INTENT_MAP, resize, getSlideComponents, scrollTo, events, renderUtils, insertChild, removeChild, series } = utils;
const { defaultClass, KEY_IDX, GET_BODY, GET_BROWSER, GET_OS} = renderUtils;
const noOp = () => {};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const HEAD = 'HEAD';
const TAIL = 'TAIL';
const VERTICAL = 'VERTICAL';
const HORIZONTAL = 'HORIZONTAL';
const BLOCK = 'block';
var _fp = null;


//Roadmap
//Global fullpage function X
//Global horizontal function X
// var touchArr = [];
// var latestTouch
// var needsConversion = null;
// var needsConversionOSX = null;

function changeFullpageSlide(to) {
  alert(to)
  const comp = _fp;

  if (comp.state.scrollPending) {
    return;
  }

  if (to !== 'NEXT' && to !== 'PREV') {
    return;
  }

  const intent = to === 'NEXT' ? 1 : 0;
  const data = {
    intent
  };

  const direction = VERTICAL;

  comp.onVerticalScroll.call(comp, data, direction);
}

class Fullpage extends React.Component {
  constructor(props) {
    super(props);

    const p = this.props;
    this.name = 'Fullpage';
    this.ss = null;
    this.winProp = 'innerHeight';
    this.elementBoundary = 'scrollTop';
    this.slideStyleProp = BLOCK;
    this.scrollSpeed = p.scrollSpeed || 500;

    this.onHorizontalChange = p.onHorizontalChange || noOp;

    var slideComponents = getSlideComponents(this.props.children, true);

    this.state = {
      slides: [],
      slideComponents,
      slideCount: slideComponents.length,
      activeSlide: p.activeSlide || 0,
      lastActive: -1,
      scrollSensitivity: p.scrollSensitivity || 100,
      touchSensitivity: p.touchSensitivity || 100,
      scrollPending: false
    };
  }

  componentDidMount() {
    const node = this.node;
    const s = this.state;

    var ss = new ScrollSwipe({
      target: node,
      scrollSensitivity: s.scrollSensitivity / 5,
      touchSensitivity: s.touchSensitivity / 5,
      scrollPreventDefault: true,
      touchPreventDefault: true,
      scrollCb: this.onScrollAction.bind(null, this),
      touchCb: this.onTouchAction.bind(this)
    });
    this.ss = ss;

    // document.addEventListener('keydown', this.checkKey);
    window.addEventListener('resize', resize.bind(this));

    //override the threshold for windows firefox
    const b = GET_BROWSER();
    const os = GET_OS();
    //
    // if (b === 'Firefox' && os === 'WINDOWS') {
    //   needsConversion = true;
    // }
    // if (b === 'Firefox' && os === 'OSX') {
    //   needsConversionOSX = true;
    // }
    //initialize slides
    resize.call(this);

    if (_fp) {
      return;
    }

    _fp = this;
    //hide scrollbars
    if (this.props.hideScrollBars) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    this.ss.killAll();
    this.ss = null;

    document.removeEventListener('keydown', this.checkKey);
    window.removeEventListener('resize', resize.bind(this));
  }

  checkKey(e) {
    let direction = null;
    e = e || window.event;
    if (KEY_IDX[e.keyCode]) {
      direction = KEY_IDX[e.keyCode];
    } else {
      return false;
    }

    //can remove this when carousel is implemented
    if (typeof direction !== 'number') {
      return false;
    }

    this.scrollToSlide(this.state.activeSlide + direction);
  }

  scrollToSlide(slide, override) {
    var s = this.state;

    if (override) {
      return scrollTo.call(this, GET_BODY(), s.slides[slide], 100, () => {
        this.setState({
          activeSlide: slide,
          scrollPending: false
        });

      });
    }

    if (s.scrollPending) {
      return;
    }

    if (slide < 0 || slide >= s.slidesCount) {
      return;
    }

    this.setState({
      activeSlide: slide,
      scrollPending: true
    });

    scrollTo(GET_BODY(), s.slides[slide], 600, () => {
      this.setState({activeSlide: slide});
      this.setState({scrollPending: false});
    });
  }

  onTouchAction(data) {

  }

  // onTouchStart(e) {
  //   e.preventDefault();
  //   var t = e.touches[0].clientY;
  //   latestTouch = t;
  //   touchArr.push(t);
  //
  //   if (touchArr.length > 10) {
  //     this.setState({'touchStart': touchArr[0]});
  //     touchArr = [];
  //     return;
  //   }
  // }
  //
  // onTouchEnd(e) {
  //   var s = this.state;
  //   const touchEnd = e.changedTouches[0].clientY;
  //   const touchStart = s.touchStart;
  //   const sensitivity = s.touchSensitivity;
  //
  //   //prevent standard taps creating false positives;
  //   if (latestTouch !== touchEnd) {
  //     return;
  //   }
  //
  //   if ((!touchStart) || touchStart > (touchEnd + Math.abs(sensitivity / 2)) ) {
  //
  //     if (s.activeSlide == s.slidesCount - 1) {// prevent down going down
  //       return;
  //     }
  //
  //     return this.scrollToSlide(s.activeSlide + 1);
  //   }
  //
  //   if (s.activeSlide == 0) {// prevent up going up
  //     return;
  //   }
  //
  //   this.scrollToSlide(s.activeSlide - 1);
  // }

  onArrowClick() {
    this.scrollToSlide(this.state.activeSlide + 1);
  }

  onVerticalScroll(data, direction) {
    const s = this.state;
    const p = this.props;

    handleScroll.call(this, data, direction, GET_BODY(), p.onFullpageChange);

    // const { infinite, resetSlides } = p;
    // const { node, ss } = this;
    //
    // const intent = INTENT_MAP[direction][data.intent];
    //
    // const scrollUp = intent === 'UP';
    // const scrollDown = intent === 'DOWN';
    //
    // //windows firefox produces very low wheel activity so we have to multiply it
    // // if (needsConversion) {
    // //   meas = meas * 3;
    // // }
    // //
    // // if (needsConversionOSX) {
    // //   meas = meas * 40;
    //
    // let activeSlide = s.activeSlide;
    //
    // if (scrollDown) {
    //   if (activeSlide === s.slideCount -1 && !infinite && !resetSlides) {// prevent down going down
    //     ss.listen();
    //     return this.setState({scrollPending: false});
    //   }
    //
    //   activeSlide = activeSlide + 1;
    //
    // } else {
    //   if (activeSlide === 0 && !infinite && !resetSlides) {// prevent up going up
    //     ss.listen();
    //     return this.setState({scrollPending: false});
    //   }
    //
    //   activeSlide = activeSlide - 1;
    // }
    //
    // this.setState({scrollPending: true});
    //
    // let action = scrollDown ? INCREMENT : DECREMENT;
    //
    // if (resetSlides || infinite) {
    //   //reset flow
    //   if (action === INCREMENT) {
    //     if (!s.slideComponentsConst[activeSlide]) {
    //       activeSlide = 0;
    //       action = HEAD;
    //     }
    //   } else {
    //     if (!s.slideComponents[activeSlide]) {
    //       activeSlide = s.slideComponentsConst.length -1;
    //       action = TAIL;
    //     }
    //   }
    // }
    //
    // let scrollDestination = window[this.winProp] * activeSlide;
    // let c;
    // let next;
    // let last;
    // let windowVal = s.activeSlide;
    //
    // const swap = infinite && (action === HEAD || action === TAIL);
    //
    // if (swap) {
    //   var arr = document.querySelectorAll(`[data-slide=${this.name}]`);
    //
    //   for (let i = 0; i < arr.length; i++) {
    //     if (c) {
    //       break;
    //     }
    //
    //     if (i === s.activeSlide) {
    //       c = arr[i];
    //       if (action === HEAD) {
    //         last = arr[0];
    //         next = arr[1] || c;
    //       } else {
    //         last = arr[arr.length - 1];
    //         next = arr[i + 1] || c;
    //       }
    //     }
    //   }
    //
    //   if (action === HEAD) {
    //     windowVal = 0;
    //     scrollDestination = window.innerHeight;
    //   } else {
    //     //set it at the footer;
    //     windowVal = 1;
    //     scrollDestination = 0;
    //   }
    // }
    //
    // if (swap) {
    //   if (action === HEAD) {
    //     swapElements(c, last);
    //     swapElements(last, next);
    //   } else {
    //     swapElements(last, next);
    //     swapElements(c, last);
    //   }
    // }
    //
    // series([
    //   (done) => {
    //     applyVisibiltyToAll.call(this);
    //     GET_BODY()[this.elementBoundary] = window[this.winProp] * windowVal;
    //
    //     scrollTo(GET_BODY(), this.elementBoundary, scrollDestination, this.scrollSpeed, () => {
    //       if (swap) {
    //         if (action === HEAD) {
    //           swapElements(last, next);
    //           swapElements(c, last);
    //         } else {
    //           swapElements(c, last);
    //           swapElements(last, next);
    //         }
    //       }
    //
    //       done();
    //     });
    //   },
    //   (done) => {
    //     removeAllButActive.call(this, activeSlide);
    //     done();
    //   }
    // ], () => {
    //   const newState = changeSlide(this.state, {type: action}, 1);
    //   this.setState(newState);
    //
    //   setTimeout(() => {
    //     this.setState({scrollPending: false}, () => {
    //       p.onFullpageChange(this.state);
    //       ss.listen();
    //     });
    //
    //   }, ( (s.scrollSensitivity * 4) + 500));
    // });
  }

  onScrollAction(comp, data) {
    if (comp.state.scrollPending) {
      return;
    }

    const { direction } = data;

    if (direction === VERTICAL) {
      return _fp.onVerticalScroll(data, direction);
    }

    //tricky, here comp.onHorizontalScroll is referring to the horizontal slider function, so we escape for fullpage
    if (comp.name === 'Fullpage') {
      return comp.ss.listen();
    }

    comp.onHorizontalScroll(data, direction);
  }

  render() {
    var p = this.props;
    var s = this.state;

    const { activeSlide } = s;

    console.log('rendering fullpage');

    //TODO: each slide has visibility state that subscribes to an action triggered by fullpage and fullpage slide

    const height = {height: '100%'};
    const scrollbars = p.hideScrollBars ? {overflowX: 'hidden'} : {};
    const horizontalSlideStyle = {display: 'inline-block', height: '100%', width: '100%'};

    var testStyles = {textAlign: 'center', fontSize: '30px'};

    //here we could just try hiding all that are not the active slide

    return (
      <div ref={node => this.node = node} className={defaultClass.call(this)} style={{height: s.height || window.innerHeight}}>
        {(p.children || []).map((c, i) => {
          if (c.type.name === 'Slide') {
            return c;
          }

          if (c.type.name === 'HorizontalSlider') {
            let hSliderProps = c.props;
            let style = hSliderProps.style || {};

            const horizontalSliderStyle = Object.assign(scrollbars, style,
              {height: s.height || window.innerHeight, width: '100%', whiteSpace: 'nowrap', padding: 'none', margin: '0 auto'});

            const horizontalSlides = (hSliderProps.children || []).map((ch, i) => {
              if (ch.type.name !== 'Slide') {
                return null;
              }

              let hSlideProps = ch.props;
              let slideStyle = hSlideProps.style || {};
              let attrs = {
                'data-slide': 'HorizontalSlider'
              };

              return <Slide key={i} horizontal={true} {...attrs} style={Object.assign({}, horizontalSlideStyle, slideStyle)}>{hSlideProps.children}</Slide>
            });

            let props = c.props;

            return <HorizontalSlider {...props} onScrollAction={this.onScrollAction} onHorizontalChange={this.onHorizontalChange} key={i} name={hSliderProps.name} infinite={hSliderProps.infinite} style={Object.assign(horizontalSliderStyle, height)}>{horizontalSlides}</HorizontalSlider>
          }
          // if (c.type.name === 'Slide' || c.type.name === 'HorizontalSlider') {
          //   return true;
          // }
          return null;
        })}
      </div>
    )

    return (
      <div ref={node => this.node = node} className={defaultClass.call(this)} style={{height: s.height || window.innerHeight}}>
        { (p.children || []).filter((c) => {
            return c.type.name !== 'Slide' && c.type.name !== 'HorizontalSlider';
        }) }

        {s.slideComponents.map((c, i) => {
          if (c.type.name === 'Slide') {
            let props = c.props;
            let style = props.style || {};
            return <Slide key={i} {...props} style={Object.assign(style, height, testStyles)}>{props.children}</Slide>
          }

          if (c.type.name === 'HorizontalSlider') {
            let hSliderProps = c.props;
            let style = hSliderProps.style || {};

            const horizontalSliderStyle = Object.assign(scrollbars, style,
              {height: s.height || window.innerHeight, width: '100%', whiteSpace: 'nowrap', padding: 'none', margin: '0 auto'});

            const horizontalSlides = (hSliderProps.children || []).map((ch, i) => {
              if (ch.type.name !== 'Slide') {
                return null;
              }

              let hSlideProps = ch.props;
              let slideStyle = hSlideProps.style || {};

              return <Slide key={i} style={Object.assign({}, horizontalSlideStyle, slideStyle)}>{hSlideProps.children}</Slide>
            });

            return <HorizontalSlider onScrollAction={this.onScrollAction} onHorizontalChange={this.onHorizontalChange} key={i} name={hSliderProps.name} infinite={hSliderProps.infinite} style={Object.assign(horizontalSliderStyle, height)}>{horizontalSlides}</HorizontalSlider>
          }

          return null;
        })}
      </div>
    );

  }
}
Fullpage.propTypes = {
  children: React.PropTypes.node,
  touchSensitivity: React.PropTypes.number,
  scrollSensitivity: React.PropTypes.number,
  activeSlide: React.PropTypes.number,
  onFullpageChange: React.PropTypes.func.isRequired,
  hideScrollBars: React.PropTypes.bool,
  infinite: React.PropTypes.bool,
  resetSlides: React.PropTypes.bool
};

module.exports = {
  Fullpage,
  changeHorizontalSlide,
  changeFullpageSlide
};

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
