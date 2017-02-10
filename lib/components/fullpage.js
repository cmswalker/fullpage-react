
const React = require('react');
const SliderSchema = require('./SliderSchema');
// const {onAnySlideChange, onVerticalSlideChange, dispatch, wipe} = require('../events');
const scrollToElement = require('../utils/scrollToElement');
const renderUtils = require('../utils/renderUtils');
const UIEvents = require('../utils/UIEvents');

const { KEY_IDX, GET_BODY, GET_BROWSER, GET_OS} = renderUtils;
const events = require('../events');
const noOp = function() {};

const DEFAULTS = {
  speed: 600,
  upThreshold: 100,
  downThreshold: 100,
  activeSlide: 0,
  sensitivity: 100
}

var touchArr = [];
var latestTouch
var needsConversion = null;


const changeSlide = (state = { activeSlide: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { activeSlide: state.activeSlide + 1 };
    case 'DECREMENT':
      return { activeSlide: state.activeSlide - 1 };
    default:
      return state;
  }
}

const changeSlideJump = (state = { activeSlide: 0 }, action, difference) => {
  switch (action.type) {
    case 'INCREMENT':
      return { activeSlide: state.activeSlide + difference };
    case 'DECREMENT':
      return { activeSlide: state.activeSlide - difference };
    default:
      return state;
  }
}

class Fullpage extends React.Component {
  constructor(props) {
    super(props);

    var p = this.props;
    this.onVerticalSlideChange = p.onVerticalSlideChange || noOp;

    var slideComponents = getSlides(p.children);
    events.fullpageSlideCount = slideComponents.length;

    //TODO: change these to jumps
    events.fullpageIncrement = this.increment;
    events.fullpageDecrement = this.decrement;

    this.state = {
      name: 'Fullpage',
      defaultClass: 'Fullpage',
      slideComponents,
      activeSlide: p.activeSlide || DEFAULTS.activeSlide,
      speed: p.speed || DEFAULTS.speed,
      lastActive: -1,
      downThreshold: -Math.abs(p.threshold || DEFAULTS.downThreshold),
      upThreshold: p.threshold || DEFAULTS.upThreshold,
      touchStart: 0,
      touchSensitivity: p.sensitivity || DEFAULTS.sensitivity
    };
  }

  dispatch(action) {
    this.setState({lastActive: this.state.activeSlide});
    this.setState(prevState => changeSlide(prevState, action), () => {
      var slide = this.state.activeSlide;
      events.fullpageActiveSlide = slide;
      this.onVerticalSlideChange(slide);
      setTimeout(() => {
        events.SCROLL_PENDING = false;
      }, (this.state.upThreshold * 2));
    });
  }

  dispatchJump(action, difference) {
    this.setState({lastActive: this.state.activeSlide});
    this.setState(prevState => changeSlideJump(prevState, action, difference), () => {
      var slide = this.state.activeSlide;
      events.fullpageActiveSlide = slide;
      this.onVerticalSlideChange(slide);
      setTimeout(() => {
        events.SCROLL_PENDING = false;
      }, (this.state.upThreshold * 2));
    });
  }

  increment(destination, cb) {
    cb = cb || noOp;
    scrollToElement(GET_BODY(), 'VERTICAL', destination, this.state.speed, () => {
      this.dispatch({ type: 'INCREMENT' });
      cb();
    });
  }

  incrementJump(destination, slide, cb) {
    cb = cb || noOp;
    scrollToElement(GET_BODY(), 'VERTICAL', destination, this.state.speed, () => {
      this.dispatchJump({ type: 'INCREMENT' }, slide);
      cb();
    });
  }

  decrementJump(destination, slide, cb) {
    cb = cb || noOp;
    GET_BODY().scrollTop = destination;
    scrollToElement(GET_BODY(), 'VERTICAL', 0, this.state.speed, () => {
      this.dispatchJump({ type: 'DECREMENT' }, slide);
      cb();
    });
  }

  decrement(destination, cb) {
    cb = cb || noOp;
    GET_BODY().scrollTop = destination;
    scrollToElement(GET_BODY(), 'VERTICAL', 0, this.state.speed, () => {
      this.dispatch({ type: 'DECREMENT' });
      cb();
    });
  }

  render() {
    var s = this.state;
    var p = this.props;
    return (
      <div className={renderUtils.defaultClass.call(this)} style={{height: '100%'}}>
        <SliderSchema
          name={s.name}
          downThreshold={s.downThreshold}
          upThreshold={s.upThreshold}
          fullpageIncrement={this.increment.bind(this)}
          fullpageIncrementJump={this.incrementJump.bind(this)}
          fullpageDecrement={this.decrement.bind(this)}
          fullpageDecrementJump={this.decrementJump.bind(this)}
          activeSlide={s.activeSlide}
          slideComponents={s.slideComponents}
          slideCount={s.slideComponents.length}
          horizontal={false}
        >
          {p.children}
        </SliderSchema>
      </div>
    )
  }

}
Fullpage.propTypes = {
  children: React.PropTypes.node.isRequired,
  threshold: React.PropTypes.number,
  sensitivity: React.PropTypes.number
}

module.exports = Fullpage;

function getSlides(children = []) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.filter(c => {
    if (!c) {
      return false;
    }

    if (c.type.name === 'Slide' || c.type.name === 'HorizontalSlider') {
      return true;
    }

    return false;
  });
}

//TODO: What do they need? A GOTO function that works on fullpage changes, and a GOTO function that works on horizontal changes and registers a unique name per hslider (as it is required)
//TODO: When pushing/popping children it needs to be the difference in the slides;
//TODO: Dispatch should be replaced w dispatch jump
