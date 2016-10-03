const React = require('react');

const TopNav = require('./topNav');
const SideNav = require('./sideNav');
const Slide = require('./slide');

const scrollTo = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');
const keyIndex = {
  37: 'left',
  38: -1,
  39: 'right',
  40: 1
};

let BROWSER = null;
let ELEMENT_BROWSERS = null;
let BODY = null;

class Fullpage extends React.Component {
  constructor(props) {
    super(props);
    
    let slideChildren = getSlideCount(this.props.children);      

    this.state = {
      name: 'Fullpage',
      defaultClass: 'Fullpage',
      slides: [],
      slidesCount: slideChildren,
      activeSlide: 0,
      lastActive: -1,
      downThreshold: -Math.abs(this.props.threshold || 100),
      upThreshold: this.props.threshold || 100,
      touchStart: 0,
      touchSensitivity: this.props.sensitivity || 100,
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
    document.addEventListener('touchstart', this.onTouchStart);
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('keydown', this.checkKey);
    window.addEventListener('resize', this.onResize);    
    events.pub(this, this.scrollToSlide);    

    //initialize slides    
    this.onResize();
    this.scrollToSlide(0);
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.onScroll);
    document.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('keydown', this.checkKey);
    window.removeEventListener('resize', this.onResize);    
  }

  componentWillUpdate(nP, nS) {

  }

  componentDidUpdate(pP, pS) {
    events.active = this.state.activeSlide;
    this.props.active(this.state.activeSlide);
  }

  checkKey(e) {    
    let direction = null;
    e = e || window.event;
    if (keyIndex[e.keyCode]) {
      direction = keyIndex[e.keyCode];
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
    let slides = [];

    for (let i = 0; i < this.state.slidesCount; i++) {
      slides.push(window.innerHeight * i);
    }
    
    this.setState({
      'slides': slides,
      'height': window.innerHeight
    });
    
    this.scrollToSlide(this.state.activeSlide, true);
  }

  scrollToSlide(slide, override) {
    if (override) {      
      return scrollTo.call(this, getBody(), this.state.slides[slide], 100, () => {
        this.setState({'activeSlide': slide});
        this.setState({'scrollPending': false});
      });
    }

    if (this.state.scrollPending) {
      return;
    }

    if (slide < 0 || slide >= this.state.slidesCount) {
      return;
    }

    this.setState({
      'activeSlide': slide,
      'scrollPending': true
    });

    var self = this;
    scrollTo(getBody(), self.state.slides[slide], 600, function() {
      self.setState({'activeSlide': slide});
      self.setState({'scrollPending': false});
    });
  }

  onTouchStart(e) {
    this.setState({'touchStart': e.touches[0].clientY});
    e.preventDefault();
  }

  onTouchEnd(e) {
    const touchEnd = e.changedTouches[0].clientY;

    if (this.state.touchStart > (touchEnd + Math.abs(this.state.touchSensitivity)) ) {

      if (this.state.activeSlide == this.state.slidesCount - 1) {// prevent down going down
        return;
      }

      return this.scrollToSlide(this.state.activeSlide + 1);

    } else {

      if (this.state.activeSlide == 0) {// prevent up going up
        return;
      }

      this.scrollToSlide(this.state.activeSlide - 1);
    }
  }

  onArrowClick() {
    this.scrollToSlide(this.state.activeSlide + 1);
  }

  onScroll(e) {    
    e.preventDefault();    
    if (this.state.scrollPending) {
      return;
    }

    const scrollDown = (e.wheelDelta || -e.deltaY || e.detail) < this.state.downThreshold;
    const scrollUp = (e.wheelDelta || -e.deltaY || e.detail) > this.state.upThreshold;

    let activeSlide = this.state.activeSlide;

    if (scrollDown) {
      if (activeSlide == this.state.slidesCount -1) {// prevent down going down
        return this.setState({'scrollPending': false});
      }

      activeSlide = activeSlide + 1;

    } else if (scrollUp) {
        if (!activeSlide) {// prevent up going up
          return this.setState({'scrollPending': false});
        }

        activeSlide = activeSlide - 1;
    } else {
      return this.setState({'scrollPending': false});
    }

    this.setState({'scrollPending': true});
      
    scrollTo(getBody(), this.state.slides[activeSlide], 500, () => {
      this.setState({'activeSlide': activeSlide});
      this.setState({'lastActive': scrollDown ? activeSlide-- : activeSlide++});

      setTimeout(() => {
        this.setState({'scrollPending': false})
      }, (this.state.upThreshold * 2));
    });
    return this.setState({'scrollPending': true});
  }

  render() {
    return (
      <div className={renderUtils.defaultClass.call(this)} style={{height: this.state.height}}>
        {this.props.children}
      </div>
    );
  }
};
Fullpage.propTypes = {
  children: React.PropTypes.node.isRequired
}

function getSlideCount(children) {
  return children.reduce((result, c) => {
    if (Array.isArray(c)) {
      return getSlideCount(c);
    }

    if (!c.type) {
      return result;
    }    

    if (c.type === Slide) {      
      return result = result + 1;
    }

    return result;
  }, 0)
} 

const getBody = () => {
  if (!BODY) {
    BROWSER = renderUtils.browser();
    ELEMENT_BROWSERS = renderUtils.elementBrowsers;
    BODY = !!~ELEMENT_BROWSERS.indexOf(BROWSER) ? document.documentElement : document.body;
  }

  return BODY;
}

module.exports = Fullpage;
