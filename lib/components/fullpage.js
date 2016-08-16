const React = require('react');

const TopNav = require('./topNav');
const SideNav = require('./sideNav');

const scrollTo = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');

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
  }

  componentDidMount() {
    document.addEventListener('wheel', this.onScroll.bind(this));
    document.addEventListener('touchstart', this.onTouchStart.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
    events.pub(this, this.scrollToSlide);
    console.log('mounted', this.state.slides)

    //initialize slides
    console.log('CALLING INITIALIZE')
    this.onResize();
    this.scrollToSlide(0);
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.onScroll);
    document.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('resize', this.onResize);
  }

  componentWillUpdate(nP, nS) {

  }

  componentDidUpdate(pP, pS) {
    events.active = this.state.activeSlide;
    this.props.active(this.state.activeSlide);
  }

  onResize() {
    let slides = [];
    console.log('slidesCount', this.state.slidesCount);

    for (let i = 0; i < this.state.slidesCount; i++) {
      slides.push(window.innerHeight * i);
    }
    console.log('slides after', slides);

    this.state.slides = slides;
    this.state.height = window.innerHeight;
    // this.setState({
    //   'slides': [1,2,3],
    //   'height': window.innerHeight
    // });
    console.log('state slides after', this.state.slides);    
  }

  scrollToSlide(slide, dir) {
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
    scrollTo(document.body, self.state.slides[slide], 600, function() {
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
    const scrollUp = (e.wheelDelta || e.deltaY || e.detail) > this.state.upThreshold;

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

    var self = this;
    console.log('actively calling scrollTo', self.state.slides[activeSlide])
    scrollTo(document.body, self.state.slides[activeSlide], 500, function() {
      self.setState({'activeSlide': activeSlide});
      self.setState({'lastActive': scrollDown ? activeSlide-- : activeSlide++});

      setTimeout(function() {
        self.setState({'scrollPending': false})
      }, (self.state.upThreshold * 2));
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

    if (c.type.name === 'Slide') {
      return result = result + 1;
    }

    return result;
  }, 0)
} 

module.exports = Fullpage;
