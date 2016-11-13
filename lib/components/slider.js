const React = require('react');
const ReactDOM = require('react-dom');

const CONSTS = require('./consts');
const Slide = require('./slide');
const HSlide = require('./hslide');

const scrollTo = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');
const {GET_BODY} = renderUtils;

const SCROLL_DIR = CONSTS.SCROLL_DIRECTIONS.X;

/*
GAMEPLAN
access the dom node itself via refs: http://jamesknelson.com/react-js-by-example-interacting-with-the-dom/
now you can add click listeners on the Slider Buttons as well and (maybe even) scroll events on the slider itself vs the document.

A demo is currently running on localhost:8000 of a plain html/css slider.
Also avail here: https://github.com/codepo8/simple-carousel/blob/master/carousel-fancy.html

 */

class Slider extends React.Component {
  constructor(props) {
    super(props);

    let slideChildren = getSlideCount(this.props.children);

    this.state = {
      name: 'Slider',
      defaultClass: 'Slider',
      infinite: this.props.infinite || false,
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

    this.scrollToSlide(this.state.activeSlide, true);
  }

  scrollToSlide(slide, override) {
    if (override) {
      //now we force a move to the desired slide;
      console.log('finally', slide);
      console.log('this', this);
      return scrollTo.call(this, GET_BODY(), SCROLL_DIR, this.state.hSlides[slide], 100, () => {
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
    scrollTo(GET_BODY(), SCROLL_DIR, this.state.hSlides[slide], 600, function() {
      self.setState({'activeSlide': slide});
      self.setState({'scrollPending': false});
    });
  }

  onScroll(e) {
    handleScroll(e, this, SCROLL_DIR);
  }

  render() {
    var backwardsArr = [];
    for (var i = this.props.children.length -1; i >= 0; i--) {
      backwardsArr.push(<div key={i}>{this.props.children[i]}</div>);
    }

    var regularArr = this.props.children.map((c, idx) => {
      return <div key={idx} style={Object.assign({}, {height: '100%', width: '100%', display: 'inline-block'})}>{c}</div>
    });

    console.log('back', backwardsArr);
    console.log('forwars', regularArr);

    return (
      <div style={Object.assign({}, this.props.style, {'overflowX': 'scroll', 'overflowY': 'hidden', height: '100%', width: '100%', whiteSpace: 'nowrap', WebkitScrollbar: 'display: none'})}>

        {backwardsArr}

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

  // if (scrollLeft || scrollRight) {
  //   console.log('right', scrollRight);
  //   console.log('left', scrollLeft);
  // }

  let activeSlide = comp.state.activeSlide;

  if (scrollRight) {
    if (activeSlide == comp.state.hSlidesCount -1) {// prevent right going right
      return resetSlides(comp, 1);
    }

    activeSlide = activeSlide + 1;

  } else if (scrollLeft) {
      if (!activeSlide) {// prevent left going left
        return resetSlides(comp, -1);
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

function resetSlides(comp, direction) {
  //direction is either -1 or 1 depending on how we need to reset
  comp.setState({'scrollPending': false});
  if (!direction) {
    return;
  }

  let beginning = direction === -1 ? true : false;
  let slide = 0;

  let infinite = comp.state.infinite;
  console.log('inf', infinite);
  let reset = !!infinite;

  if (infinite) {
    //we need to shuffle our slides array
    let slides = comp.state.hSlides || comp.state.slides;
    if (beginning) {
      slide = slides.length - 1;
      shuffle(slides, 0);
    } else {
      shuffle(slides, 1);
    }

    if (comp.state.hSlides) {
      comp.setState({'hSlides': slides}, () => comp.scrollToSlide(slide, true));
    } else {
      comp.setState({'slides': slides}, () => comp.scrollToSlide(slide, true));
    }
  }
}

function shuffle(arr, idx) {
  if (idx === 0) {
    let last = arr.pop();
    arr.unshift(last);
    return;
  }

  let first = arr.shift();
  arr.push(first);
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
