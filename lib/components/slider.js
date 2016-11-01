const React = require('react');

const CONSTS = require('./consts');
const Slide = require('./slide');
const HSlide = require('./hslide');

const scrollTo = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');

const SCROLL_DIR = CONSTS.SCROLL_DIRECTIONS.X;


let BROWSER = null;
let ELEMENT_BROWSERS = null;
let BODY = null;

class Slider extends React.Component {
  constructor(props) {
    super(props);

    let slideChildren = getSlideCount(this.props.children);      

    this.state = {
      name: 'Slider',
      defaultClass: 'Slider',
      hSlides: [],
      hSlidesCount: slideChildren,
      activeSlide: 0,
      lastActive: -1,
      downThreshold: -Math.abs(this.props.threshold || 100),
      upThreshold: this.props.threshold || 100,
      touchStart: 0,
      touchSensitivity: this.props.sensitivity || 100,
      scrollPending: false
    };

    this.onScroll = this.onScroll.bind(this);
    // this.onTouchStart = this.onTouchStart.bind(this);
    // this.onTouchEnd = this.onTouchEnd.bind(this);

  }

  componentDidMount() {
    document.addEventListener('wheel', this.onScroll);
    // document.addEventListener('touchstart', this.onTouchStart);
    // document.addEventListener('touchend', this.onTouchEnd);
    // document.addEventListener('keydown', this.checkKey);
    // window.addEventListener('resize', this.onResize);    
    events.pub(this, this.scrollToSlide);    

    //initialize slides    
    this.onResize();
    this.scrollToSlide(0);
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
      return scrollTo.call(this, getBody(), this.state.hSlides[slide], 100, () => {
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
    scrollTo(getBody(), self.state.hSlides[slide], 600, function() {
      self.setState({'activeSlide': slide});
      self.setState({'scrollPending': false});
    });
  }

  onScroll(e) {
    handleScroll(e, this, SCROLL_DIR); 
  }

  render() {
    return (
      <div {...this.props} style={Object.assign({}, this.props.style, {height: '100%'})}>
        {this.props.children}
      </div>
    );
  }
};


module.exports = Slider;


//HELPERS THAT SHOULD BE SHARED
function handleScroll(e, comp, axis) {
	console.log(arguments);
  e.preventDefault();    
  if (comp.state.scrollPending) {
    return;
  }

  const direction = axis === CONSTS.SCROLL_DIRECTIONS.Y ? 'Y' : 'X';
  
  const scrollRight = (e.wheelDelta || -e[`delta${direction}`] || e.detail) < comp.state.downThreshold;
  const scrollLeft = (e.wheelDelta || -e[`delta${direction}`] || e.detail) > comp.state.upThreshold;

  console.log('right', scrollRight);
  console.log('left', scrollLeft);

  if (!scrollRight && !scrollLeft) {
    return;
  }

  let activeSlide = comp.state.activeSlide;

  if (scrollRight) {
    if (activeSlide == comp.state.slidesCount -1) {// prevent down going down
      return comp.setState({'scrollPending': false});
    }

    activeSlide = activeSlide + 1;

  } else if (scrollLeft) {
      if (!activeSlide) {// prevent up going up
        return comp.setState({'scrollPending': false});
      }

      activeSlide = activeSlide - 1;
  } else {
    return comp.setState({'scrollPending': false});
  }

  comp.setState({'scrollPending': true});
    
  scrollTo(getBody(), comp.state.slides[activeSlide], 500, () => {
    comp.setState({'activeSlide': activeSlide});
    comp.setState({'lastActive': scrollRight ? activeSlide-- : activeSlide++});

    setTimeout(() => {
      comp.setState({'scrollPending': false})
    }, (comp.state.upThreshold * 2));
  });
  return comp.setState({'scrollPending': true});
}



function getSlideCount(children) {
  return children.reduce((result, c) => {
    if (Array.isArray(c)) {
      return getSlideCount(c);
    }

    if (!c.type) {
      return result;
    }    

    if (c.type === HSlide) {      
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