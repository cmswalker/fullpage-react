const React = require('react');
const Slide = require('./slide');

const scrollTo = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');
const { KEY_IDX, GET_BODY, GET_BROWSER, GET_OS} = renderUtils;

var touchArr = [];
var latestTouch
var needsConversion = null;

class Fullpage extends React.Component {
  constructor(props) {
    super(props);

    var p = this.props;

    let slideComponents = getSlides(p.children);

    this.state = {
      name: 'Fullpage',
      defaultClass: 'Fullpage',
      slides: [],
      slideComponents,
      slideCount: slideComponents.length,
      activeSlide: 0,
      lastActive: -1,
      downThreshold: -Math.abs(p.threshold || 100),
      upThreshold: p.threshold || 100,
      touchStart: 0,
      touchSensitivity: p.sensitivity || 100,
      scrollPending: false
    };

    this.onScroll = this.onScroll.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.checkKey = this.checkKey.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    document.addEventListener('wheel', this.onScroll);
    document.addEventListener('touchmove', this.onTouchStart);
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('keydown', this.checkKey);
    window.addEventListener('resize', this.onResize);
    events.pub(this, this.scrollToSlide);

    //override the threshold for windows firefox
    var b = GET_BROWSER();
    var os = GET_OS();
    if (b === 'Firefox' && os === 'WINDOWS') {
      needsConversion = true;
    }

    //initialize slides
    this.onResize();
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.onScroll);
    document.removeEventListener('touchmove', this.onTouchStart);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('keydown', this.checkKey);
    window.removeEventListener('resize', this.onResize);
  }

  shouldComponentUpdate(nP, nS) {
    return true;
  }

  componentDidUpdate(pP, pS) {
    var s = this.state;
    events.active = s.activeSlide;
    this.props.active(s.activeSlide);
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

  onResize() {
    var s = this.state;
    let slides = [];

    for (let i = 0; i < s.slideCount; i++) {
      slides.push(window.innerHeight * i);
    }

    this.setState({
      'slides': slides,
      'height': window.innerHeight
    });

    this.scrollToSlide(s.activeSlide, true);
  }

  scrollToSlide(slide, override) {
    var s = this.state;

    if (override) {
      return scrollTo.call(this, GET_BODY(), s.slides[slide], 100, () => {
        this.setState({'activeSlide': slide});
        this.setState({'scrollPending': false});
      });
    }

    if (s.scrollPending) {
      return;
    }

    if (slide < 0 || slide >= s.slideCount) {
      return;
    }

    this.setState({
      'activeSlide': slide,
      'scrollPending': true
    });

    scrollTo(GET_BODY(), s.slides[slide], 600, () => {
      this.setState({'activeSlide': slide});
      this.setState({'scrollPending': false});
    });
  }

  onTouchStart(e) {
    e.preventDefault();
    var t = e.touches[0].clientY;
    latestTouch = t;
    touchArr.push(t);

    if (touchArr.length > 10) {
      this.setState({'touchStart': touchArr[0]});
      touchArr = [];
      return;
    }
  }

  onTouchEnd(e) {
    var s = this.state;
    const touchEnd = e.changedTouches[0].clientY;
    const touchStart = s.touchStart;
    const sensitivity = s.touchSensitivity;

    //prevent standard taps creating false positives;
    if (latestTouch !== touchEnd) {
      return;
    }

    if ((!touchStart) || touchStart > (touchEnd + Math.abs(sensitivity / 2)) ) {

      if (s.activeSlide == s.slideCount - 1) {// prevent down going down
        return;
      }

      return this.scrollToSlide(s.activeSlide + 1);
    }

    if (s.activeSlide == 0) {// prevent up going up
      return;
    }

    this.scrollToSlide(s.activeSlide - 1);
  }

  onArrowClick() {
    this.scrollToSlide(this.state.activeSlide + 1);
  }

  onScroll(e) {
    e.preventDefault();
    var s = this.state;

    if (s.scrollPending) {
      return;
    }

    var meas = needsConversion ? -e.deltaY : (e.wheelDelta || -e.deltaY || e.detail);
    //windows firefox produces very low wheel activity so we have to multiply it
    if (needsConversion) {
      meas = meas * 3;
    }

    const scrollDown =  meas < s.downThreshold;
    const scrollUp = !scrollDown && ( meas > s.upThreshold );

    if (!scrollDown && !scrollUp) {
      return this.setState({'scrollPending': false});
    }

    let activeSlide = s.activeSlide;

    if (scrollDown) {
      if (activeSlide == s.slideCount -1) {// prevent down going down
        return this.setState({'scrollPending': false});
      }

      activeSlide = activeSlide + 1;

    } else if (scrollUp) {
        if (!activeSlide) {// prevent up going up
          return this.setState({'scrollPending': false});
        }

        activeSlide = activeSlide - 1;
    }

    this.setState({'scrollPending': true});

    scrollTo(GET_BODY(), s.slides[activeSlide], 500, () => {
      this.setState({'activeSlide': activeSlide});
      this.setState({'lastActive': scrollDown ? activeSlide-- : activeSlide++});

      setTimeout(() => {
        this.setState({'scrollPending': false})
      }, (s.upThreshold * 2));
    });
    return this.setState({'scrollPending': true});
  }

  render() {
    return (
      <div className={renderUtils.defaultClass.call(this)} style={{height: this.state.height}}>
        {this.props.children}
      </div>
    )
  }
}
Fullpage.propTypes = {
  children: React.PropTypes.node.isRequired,
  threshold: React.PropTypes.number,
  sensitivity: React.PropTypes.number,
  active: React.PropTypes.func
}

function getSlides(children = []) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.filter(c => {
    if (c.type === Slide) {
      return true;
    }

    return false;
  });
}

module.exports = Fullpage;



//Gameplan
//Schema controls initial slide designation and filtering. It passes data down
//to the top-level Slides
//if one of these is a horizontal Slide, we repeat the process for its children
//and render a different type of wrapper in Render() (the type thats currently in schema)
