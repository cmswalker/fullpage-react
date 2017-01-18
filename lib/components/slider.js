const React = require('react');
const ReactDOM = require('react-dom');

const CONSTS = require('./consts');
const Slide = require('./slide');
const HSlide = require('./hslide');
const SliderSchema = require('./SliderSchema');

const {handleScroll, scrollTo} = require('../utils/scrollTo');
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

class Slider extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props)

    let slideChildren = getSlideCount(this.props.children);
    let name = this.props.className || 'slider';
    let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];

    this.direction = SCROLL_DIR;

    this.state = {
      schema: new SliderSchema(this, children, this.props.elements, true),
      name: name,
      defaultClass: name,
      infinite: this.props.infinite || false,
      reset: !this.props.infinite,
      slides: [],
      slidesCount: slideChildren,
      activeSlide: 0,
      lastActive: -1,
      downThreshold: -Math.abs(this.props.threshold || 100),
      upThreshold: this.props.threshold || 100,
      touchStart: 0,
      touchSensitivity: this.props.sensitivity || 100,
      scrollPending: false,
      order: []
    };

    console.log('state', this.state)

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    // this.onTouchStart = this.onTouchStart.bind(this);
    // this.onTouchEnd = this.onTouchEnd.bind(this);

  }

  goToSlide(slide) {
    events.sub('Fullpage', slide);
  }

  componentDidMount() {
    var sliderNode = this.node;
    sliderNode.addEventListener('wheel', this.onScroll);
    window.addEventListener('resize', this.onResize);

    // document.addEventListener('touchstart', this.onTouchStart);
    // document.addEventListener('touchend', this.onTouchEnd);
    // document.addEventListener('keydown', this.checkKey);
    // events.pub(this, this.scrollToSlide);

    //initialize slides
    if (this.state.order.length) {
      return;
    }
    this.onResize();
  }

  onResize() {
    let slides = [];
    let order = [];

    for (let i = 0; i < this.state.slidesCount; i++) {
      slides.push(window.innerWidth * i);
      order.push(i);
    }

    this.setState({
      'slides': slides,
      'height': window.innerHeight,
      'width': window.innerWidth,
      'order': order
    }, () => {
      this.scrollToSlide(this.state.activeSlide, true);
    });
  }

  scrollToSlide(slide, override) {
    var sliderNode = this.node;

    if (override) {
      //now we force a move to the desired slide;
      return scrollTo.call(this, sliderNode, SCROLL_DIR, this.state.slides[slide], 100, () => {
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

    console.log('lets go to', this.state.slides[slide]);
    scrollTo(sliderNode, SCROLL_DIR, this.state.slides[slide], 600, () => {
      this.setState({'activeSlide': slide});
      this.setState({'scrollPending': false});
    });
  }

  onScroll(e) {
    handleScroll(e, this, SCROLL_DIR);
  }

  render() {
    console.log('ORDER', this.state.order);
    var regularArr = this.state.slides.map((c, idx) => {
      return <div key={idx} style={Object.assign({}, {height: '100%', width: '100%', display: 'inline-block'})}>{this.props.children[this.state.order[idx]]}</div>
    });

    // console.log(this.props.children)


    // console.log('*************************')
    // console.log(this.state.slides);
    // var regularArr = this.state.slides.sort((a, b) => {
    //   console.log('a', a);
    //   console.log('b', b);
    //   console.log('active', this.state.activeSlide);
    // });

    return (
      <div ref={node => this.node = node} style={Object.assign({}, this.props.style, {'overflowX': 'hidden', height: '100%', width: '100%', whiteSpace: 'nowrap', WebkitScrollbar: 'display: none'})}>
        <SliderSchema node={this} navElements={this.props.elements} fullpage={true}>{regularArr}</SliderSchema>
      </div>
    );

    // var regularArr = this.props.children.filter((c, idx) => {
    //   if (idx !== this.state.activeSlide) {
    //     return false;
    //   }
    //   return <div key={idx} style={Object.assign({}, {height: '100%', width: '100%', display: 'inline-block'})}>{c}</div>
    // });
    //
    // console.log('regular', regularArr);
    //
    // return (
    //   <div ref={node => this.node = node} style={Object.assign({}, this.props.style, {'overflowX': 'hidden', height: '100%', width: '100%', whiteSpace: 'nowrap', WebkitScrollbar: 'display: none'})}>
    //     {regularArr}
    //   </div>
    // )
  }
}

module.exports = Slider;

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
