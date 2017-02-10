const React = require('react');
const SliderSchema = require('./SliderSchema');
const scrollToElement = require('../utils/scrollToElement');
const renderUtils = require('../utils/renderUtils');
const events = require('../events');
const noOp = function () {};

const DEFAULTS = {
  speed: 600,
  upThreshold: 100,
  downThreshold: 100,
  activeSlide: 0,
  sensitivity: 100
}

var states = {};

function getSlides(children = []) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.filter(c => {
    if (c.type.name === 'Slide') {
      return true;
    }

    return false;
  });
}

const changeSlide = (state = { activeSlide: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { activeSlide: state.activeSlide + 1 };
    case 'DECREMENT':
      return { activeSlide: state.activeSlide - 1 };
    case 'HEAD':
      return {activeSlide: 0};
    case 'TAIL':
      return {activeSlide: state.slideComponents.length - 1};
    default:
      return state;
  }
}

class HorizontalSlider extends React.Component {
  constructor(props) {
    super(props);
    var p = this.props;

    this.onHorizontalChange = p.onHorizontalChange || noOp;

    this.state = {
      name: 'HorizontalSlider',
      defaultClass: 'HorizontalSlider',
      slideComponents: getSlides(p.children),
      activeSlide: p.activeSlide || 0,
      speed: p.speed || DEFAULTS.speed,
      lastActive: -1,
      downThreshold: -Math.abs(p.threshold || DEFAULTS.downThreshold),
      upThreshold: p.threshold || DEFAULTS.upThreshold,
      touchStart: 0,
      touchSensitivity: p.sensitivity || 100
    };
  }

  // shouldComponentUpdate(nP, nS) {
  //   return true;
  // }

  componentWillUnmount() {
    console.log('unmounthing', this.props.name);
    states[this.props.name] = this.state.activeSlide;
  }

  componentWillMount() {
    console.log('mounting', this.props.name);
    this.setState({activeSlide: states[this.props.name] || 0});
  }

  dispatch(action) {
    this.setState({lastActive: this.state.activeSlide});
    this.setState(prevState => changeSlide(prevState, action), () => {
      events.SCROLL_PENDING = false;
      this.onHorizontalChange(this.props.name, this.state.activeSlide);
    });
  }

  increment(destination, cb) {
    cb = cb || noOp;

    scrollToElement(this.node, 'HORIZONTAL', destination, this.state.speed, () => {
      this.dispatch({ type: 'INCREMENT' });
      cb();
    });
  }

  resetHead(destination, cb) {
    cb = cb || noOp;
    scrollToElement(this.node, 'HORIZONTAL', destination, this.state.speed, () => {
      this.dispatch({ type: 'HEAD' });
      cb();
    });
  }

  resetTail(destination, cb) {
    cb = cb || noOp;
    this.node.scrollLeft = destination;
    scrollToElement(this.node, 'HORIZONTAL', 0, this.state.speed, () => {
      this.dispatch({ type: 'TAIL' });
      cb();
    });
  }

  decrement(destination, cb) {
    cb = cb || noOp;
    this.node.scrollLeft = destination;
    scrollToElement(this.node, 'HORIZONTAL', 0, this.state.speed, () => {
      this.dispatch({ type: 'DECREMENT' });
      cb();
    });
  }

  render() {
    var s = this.state;
    var p = this.props;
    var horizontalStyle = Object.assign({}, p.style || {}, {'height': s.height || window.innerHeight, 'width': '100%', 'overflowX': 'scroll', 'whiteSpace': 'nowrap', 'padding': 'none', 'margin': '0 auto'});

    return (
      <div ref={node => this.node = node} className={renderUtils.defaultClass.call(this)} style={horizontalStyle}>
        <SliderSchema
          name={p.name}
          horizontal={true}
          downThreshold={s.downThreshold}
          upThreshold={s.upThreshold}
          activeSlide={s.activeSlide}
          fullpageIncrement={events.fullpageIncrement}
          fullpageDecrement={events.fullpageDecrement}
          horizontalIncrement={this.increment.bind(this)}
          horizontalDecrement={this.decrement.bind(this)}
          horizontalResetHead={this.resetHead.bind(this)}
          horizontalResetTail={this.resetTail.bind(this)}
          slideComponents={s.slideComponents}
          slideCount={s.slideComponents.length}
        >
          {p.children}
        </SliderSchema>
      </div>
    )
  }
}
HorizontalSlider.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  name: React.PropTypes.string.isRequired
};

module.exports = HorizontalSlider;
