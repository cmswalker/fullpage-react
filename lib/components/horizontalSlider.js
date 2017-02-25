const React = require('react');
const ScrollSwipe = require('scroll-swipe');

const Slide = require('./slide');
const Overlay = require('./overlay');

const { onScrollAction } = require('../actions');
const utils = require('../utils');
const { jumpScroll, handleScroll, resize, renderUtils } = utils;
const { defaultClass } = renderUtils;
const { HORIZONTAL } = require('../utils/constants');

const DEFAULTS = {
  scrollSpeed: 500,
  upThreshold: 100,
  downThreshold: 100,
  activeSlide: 0,
  sensitivity: 100
};

var _localfp = null;
var states = {};
var horizontalSliders = {};

function changeHorizontalSlide(name, to) {
  const comp = horizontalSliders[name];

  if (!_localfp) {
    const { _fp } = require('./fullpage');
    _localfp = _fp;
  }

  if (!comp) {
    throw new Error(`No Horizontal Slider with name: ${name}`);
  }

  if (comp.state.scrollPending || to == comp.state.activeSlide) {
    return;
  }

  if ( (!to && to !== 0) || to >= comp.state.slideCount) {
    to = 'NEXT';
  }

  if (to < 0) {
    to = 'PREV';
  }

  if (to !== 'NEXT' && to !== 'PREV') {
    _localfp.onSlideChangeStart(comp.name, comp.state);
    comp.setState({scrollPending: true});
    return jumpScroll.call(comp, to, comp.node, _localfp.onSlideChangeEnd.bind(comp, comp.name));
  }

  const intent = to === 'NEXT' ? 1 : 0;
  const data = {
    intent
  };

  const direction = HORIZONTAL;

  comp.onHorizontalScroll.call(comp, data, direction);
}

class HorizontalSlider extends React.Component {
  constructor(props) {
    super(props);

    const p = this.props;

    this.name = 'HorizontalSlider';

    if (p.infinite && p.resetSlides) {
      throw new Error(`${this.name} cannot have both infinite and resetSlides as truthy props`);
    }

    this.winProp = 'innerWidth';
    this.elementBoundary = 'scrollLeft';
    this.scrollSpeed = p.scrollSpeed || DEFAULTS.scrollSpeed;
    this.infinite = p.infinite;

    this.parentOnScrollAction = onScrollAction;

    this.state = {
      activeSlide: p.activeSlide || 0,
      lastActive: -1,
      scrollSensitivity: p.scrollSensitivity || 10,
      touchSensitivity: p.touchSensitivity || 10,
      scrollPending: false
    };

    if (!horizontalSliders[p.name]) {
      horizontalSliders[p.name] = this;
    }
  }

  componentWillMount() {
    const p = this.props;
    this.setState({activeSlide: states[p.name] || p.activeSlide || 0});
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
      scrollCb: this.onScrollAction.bind(this),
      touchCb: this.onScrollAction.bind(this)
    });
    this.ss = ss;

    window.addEventListener('resize', resize.bind(this));

    //initialize slides
    resize.call(this);
  }

  componentWillUnmount() {
    states[this.props.name] = this.state.activeSlide;
  }

  onScrollAction(data) {
    const { ss } = this;

    if (data.direction !== HORIZONTAL) {
      return ss.listen();
    }

    this.parentOnScrollAction(this, data);
  }

  onHorizontalScroll(data, direction) {
    //must access the global callback
    if (!_localfp) {
      const { _fp } = require('./fullpage');
      _localfp = _fp;
    }

    var cb = _localfp.onSlideChangeEnd.bind(this, this.props.name);
    var node = this.node;
    handleScroll.call(this, data, direction, node, cb);
  }

  render() {
    const p = this.props;

    let overlayStyle = {position: 'absolute'};

    if (this.state.scrollPending) {
      overlayStyle.position = 'fixed';
    }

    let attrs = {
      'data-slide': 'Fullpage'
    };

    const horizontalSliderStyle = Object.assign({}, p.style,
      {height: this.state.height, width: '100%', position: 'relative', overflowX: 'auto', whiteSpace: 'nowrap', padding: '0px', margin: '0 auto', overflow: 'hidden'});

    const horizontalSlideStyle = {overflow: 'hidden', whiteSpace: 'normal', display: 'inline-block', height: window.innerHeight, width: '100%'};

    return (
      <div ref={node => this.node = node} className={defaultClass.call(this)} {...attrs} style={horizontalSliderStyle}>

        {(p.children || []).map((ch, i) => {
          if (!ch) {
            return null;
          }

          if (ch.type.name !== 'Slide' && ch.type.name !== 'Overlay') {
            return null;
          }

          if (ch.type.name === 'Overlay') {
            let oStyle = ch.props.style || {};
            let oClassName = ch.props.className || '';
            return (
              <Overlay className={oClassName} key={i} style={Object.assign({}, overlayStyle, oStyle)}>{ch.props.children}</Overlay>
            );
          }

          let hSlideProps = ch.props;
          let hSlideClassName = hSlideProps.className || '';
          let slideStyle = hSlideProps.style || {};
          let attrs = {
            'data-slide': 'HorizontalSlider'
          };

          return <Slide key={i} className={hSlideClassName} horizontal={true} style={Object.assign({}, horizontalSlideStyle, slideStyle)} {...attrs}>{hSlideProps.children}</Slide>
        })}

      </div>

    );
  }
}
HorizontalSlider.propTypes = {
  children: React.PropTypes.node,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
  infinite: React.PropTypes.bool.isRequired,
  onHorizontalChange: React.PropTypes.func
};

module.exports = {
  HorizontalSlider,
  changeHorizontalSlide
}
