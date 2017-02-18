const React = require('react');
const ScrollSwipe = require('scroll-swipe');

const Slide = require('./slide');

const { changeSlide, display } = require('../actions');
const utils = require('../utils');
const { handleScroll, swap, removeAllButActive, applyVisibiltyToAll, INTENT_MAP, resize, getSlideComponents, scrollTo, events, renderUtils, insertChild, removeChild, series } = utils;
const { defaultClass, KEY_IDX, GET_BODY, GET_BROWSER, GET_OS} = renderUtils;

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const VERTICAL = 'VERTICAL';
const HORIZONTAL = 'HORIZONTAL';
const I_BLOCK = 'inline-block';

const DEFAULTS = {
  speed: 600,
  upThreshold: 100,
  downThreshold: 100,
  activeSlide: 0,
  sensitivity: 100
};

var states = {};
var horizontalSliders = {};

const noOp = () => {};

function changeHorizontalSlide(name, to) {
  const comp = horizontalSliders[name];

  if (comp.state.scrollPending) {
    return;
  }

  if (to !== 'NEXT' && to !== 'PREV') {
    return;
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
    this.winProp = 'innerWidth';
    this.elementBoundary = 'scrollLeft';
    this.slideStyleProp = I_BLOCK;
    this.scrollSpeed = p.scrollSpeed || 500;

    this.parentOnScrollAction = p.onScrollAction || noOp;

    var slideComponents = getSlideComponents(p.children, false);

    this.state = {
      slideComponents,
      slideCount: slideComponents.length,
      activeSlide: p.activeSlide || 0,
      lastActive: -1,
      scrollSensitivity: p.scrollSensitivity || 100,
      touchSensitivity: p.touchSensitivity || 100,
      scrollPending: false
    };

    if (!horizontalSliders[this.name]) {
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
      scrollCb: this.onScrollAction.bind(null, this),
      touchCb: this.onTouchAction.bind(this)
    });
    this.ss = ss;

    window.addEventListener('resize', resize.bind(this));

    //override the threshold for windows firefox
    // const b = GET_BROWSER();
    // const os = GET_OS();
    //
    // if (b === 'Firefox' && os === 'WINDOWS') {
    //   needsConversion = true;
    // }
    // if (b === 'Firefox' && os === 'OSX') {
    //   needsConversionOSX = true;
    // }

    //initialize slides
    resize.call(this);
  }

  componentWillUnmount() {
    states[this.props.name] = this.state.activeSlide;
  }

  onScrollAction(comp, data) {
    const { props, state, ss } = comp;

    if (data.direction !== HORIZONTAL) {
      return ss.listen();
    }

    comp.parentOnScrollAction(comp, data);
  }

  onHorizontalScroll(data, direction) {

    var cb = this.props.onHorizontalChange.bind(null, this.props.name);
    var node = this.node;
    handleScroll.call(this, data, direction, node, cb);
    return;



    //
    //
    // const s = this.state;
    // const p = this.props;
    // const { node, ss } = this;
    // const { infinite } = p;
    //
    // const intent = INTENT_MAP[direction][data.intent];
    //
    // const scrollRight = intent === 'RIGHT';
    // const scrollLeft = intent === 'LEFT';
    //
    // //windows firefox produces very low wheel activity so we have to multiply it
    // // if (needsConversion) {
    // //   meas = meas * 3;
    // // }
    // //
    // // if (needsConversionOSX) {
    // //   meas = meas * 40;
    // //
    //
    // let activeSlide = s.activeSlide;
    //
    // if (scrollRight) {
    //   if (activeSlide === s.slideCount -1 && !infinite) {// prevent down going down
    //     ss.listen();
    //     return this.setState({scrollPending: false});
    //   }
    //
    //   activeSlide = activeSlide + 1;
    //
    // } else {
    //   if (activeSlide === 0 && !infinite) {// prevent up going up
    //     ss.listen();
    //     return this.setState({scrollPending: false});
    //   }
    //
    //   activeSlide = activeSlide - 1;
    // }
    //
    // this.setState({scrollPending: true});
    //
    // const scrollDestination = scrollRight ? window[this.winProp] : 0;
    // var action = scrollRight ? INCREMENT : DECREMENT;
    // var difference = 1;
    //
    // if (infinite) {
    //   if (action === INCREMENT) {
    //     if (!s.slideComponentsConst[activeSlide]) {
    //       activeSlide = 0;
    //       action = 'HEAD';
    //     }
    //   } else {
    //     if (!s.slideComponents[activeSlide]) {
    //       activeSlide = s.slideComponentsConst.length -1;
    //       action = 'TAIL'
    //     }
    //   }
    // }
    //
    // this.infiniteFlow(activeSlide, action, scrollDestination);
  }

  infiniteFlow(activeSlide, action, scrollDestination) {

    const s = this.state;
    const p = this.props;
    const { ss, node } = this;

    //here we will always eval off of the slideComponentsConst;
    series([
      (done) => {
        applyVisibiltyToAll.call(this, () => {
          // node[this.elementBoundary] = window[this.winProp];
          done();
        });
      },
      (done) => {
        scrollTo(node, this.elementBoundary, scrollDestination, 500, () => {
          done();
        });
      },
      (done) => {

        //now we set the non-actives to invisible and re-calc
        removeAllButActive.call(this, activeSlide, () => {
          done();
        });
      }
    ], () => {
      const newState = changeSlide(this.state, {type: action}, 1);
      this.setState(newState);

      setTimeout(() => {

        this.setState({scrollPending: false}, () => {
          p.onHorizontalChange(p.name, this.state);
          ss.listen();
        });

      }, (s.scrollSensitivity * 4));
    });
  }

  onTouchAction() {

  }

  render() {
    const p = this.props;
    const s = this.state;
    let attrs = {
      'data-slide': 'Fullpage'
    };

    var style = Object.assign({height: window.innerHeight, width: window.innerWidth}, p.style || {});

    return (
      <div {...attrs} ref={node => this.node = node} className={defaultClass.call(this)} style={style}>
        {(p.children || []).filter((c, i) => {
            return c.type.name !== 'Slide';
        })}

        {s.slideComponents.map((c, i) => {
          if (c.type.name === 'Slide') {
            let props = c.props;
            let hSlideStyle = props.style || {};
            return <Slide key={i} {...props} style={Object.assign(hSlideStyle, {height: '100%'})}>{props.children}</Slide>
          }

          return null;

        })}
      </div>
    );
  }
}
HorizontalSlider.propTypes = {
  children: React.PropTypes.node,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object.isRequired,
  infinite: React.PropTypes.bool.isRequired,
  onHorizontalChange: React.PropTypes.func
};

module.exports = {
  HorizontalSlider,
  changeHorizontalSlide
}
