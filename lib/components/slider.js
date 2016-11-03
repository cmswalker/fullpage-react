const React = require('react');
const ReactDOM = require('react-dom');

const CONSTS = require('./consts');
const Slide = require('./slide');
const HSlide = require('./hslide');

const scrollTo = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');

const SCROLL_DIR = CONSTS.SCROLL_DIRECTIONS.X;

/*
GAMEPLAN
access the dom node itself via refs: http://jamesknelson.com/react-js-by-example-interacting-with-the-dom/
now you can add click listeners on the Slider Buttons as well and (maybe even) scroll events on the slider itself vs the document.

A demo is currently running on localhost:8000 of a plain html/css slider.
Also avail here: https://github.com/codepo8/simple-carousel/blob/master/carousel-fancy.html

 */


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
    this.onResize = this.onResize.bind(this);
    // this.onTouchStart = this.onTouchStart.bind(this);
    // this.onTouchEnd = this.onTouchEnd.bind(this);

  }

  componentDidMount() {
    var sliderNode = ReactDOM.findDOMNode(this);
    sliderNode.addEventListener('wheel', this.onScroll);
    window.addEventListener('resize', this.onResize);

    // document.addEventListener('touchstart', this.onTouchStart);
    // document.addEventListener('touchend', this.onTouchEnd);
    // document.addEventListener('keydown', this.checkKey);
    // events.pub(this, this.scrollToSlide);

    //initialize slides
    this.onResize();
    this.scrollToSlide(0);
  }

  onResize() {
    let slides = [];

    for (let i = 0; i < this.state.hSlidesCount; i++) {
      slides.push(window.innerWidth * i);
    }

    this.setState({
      'hSlides': slides,
      'height': window.innerHeight,
      'width': window.innerWidth
    });

    console.log('RESIZED', this.state)

    this.scrollToSlide(this.state.activeSlide, true);
  }

  scrollToSlide(slide, override) {
    if (override) {
      return scrollTo.call(this, getBody(), SCROLL_DIR, this.state.hSlides, 100, () => {
        this.setState({'activeSlide': slide});
        this.setState({'scrollPending': false});
      });
    }

    if (this.state.scrollPending) {
      return;
    }

    if (slide < 0 || slide >= this.state.hSlidesCount) {
      return;
    }

    this.setState({
      'activeSlide': slide,
      'scrollPending': true
    });

    var self = this;
    scrollTo(getBody(), SCROLL_DIR, this.state.hSlides[slide], 600, function() {
      self.setState({'activeSlide': slide});
      self.setState({'scrollPending': false});
    });
  }

  onScroll(e) {
    handleScroll(e, this, SCROLL_DIR);
  }

  render() {
    let activeIdx = this.state.activeSlide;
    return (
      <div style={Object.assign({}, this.props.style, {'overflowX': 'scroll', 'overflowY': 'hidden', height: '100%', width: '100%', whiteSpace: 'nowrap', WebkitScrollbar: 'display: none'})}>
        {this.props.children.map((c, idx) => {
          if (activeIdx === idx) {
            return <div key={idx} style={Object.assign({}, {height: '100%', width: '100%', display: 'inline-block'})}>{c}</div>
          }
          return <div key={idx} style={Object.assign({}, {height: '100%', width: '100%', display: 'inline-block'})}>{c}</div>
        }) }
      </div>
    );
  }
};


module.exports = Slider;


//HELPERS THAT SHOULD BE SHARED
function handleScroll(e, comp, axis) {
  e.preventDefault();
  if (comp.state.scrollPending) {
    return;
  }

  const direction = axis === CONSTS.SCROLL_DIRECTIONS.Y ? 'Y' : 'X';

  const scrollRight = (e.wheelDelta || -e[`delta${direction}`] || e.detail) < comp.state.downThreshold;
  const scrollLeft = (e.wheelDelta || -e[`delta${direction}`] || e.detail) > comp.state.upThreshold;

  if (!scrollRight && !scrollLeft) {
    return;
  }

  if (scrollLeft || scrollRight) {
    console.log('right', scrollRight);
    console.log('left', scrollLeft);
  }

  let activeSlide = comp.state.activeSlide;

  if (scrollRight) {
    if (activeSlide == comp.state.hSlidesCount -1) {// prevent down going down
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

  var sliderNode = ReactDOM.findDOMNode(comp);

  //here instead of doing a scrollTo, we could mock it with a css transition;
  //OR we put the left side of it at a different point?

  scrollTo(sliderNode, SCROLL_DIR, comp.state.hSlides[activeSlide], 500, () => {
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
