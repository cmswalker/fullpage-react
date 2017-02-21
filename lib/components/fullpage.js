const React = require('react');
const ScrollSwipe = require('scroll-swipe');

const { handleScroll, resize, scrollTo, renderUtils } = require('../utils');
const { defaultClass, KEY_IDX, GET_BODY} = renderUtils;

const { onScrollAction } = require('../actions');
const { noOp, VERTICAL } = require('../utils/constants');

const HorizontalSliderModule = require('./HorizontalSlider');
const { changeHorizontalSlide } = HorizontalSliderModule;

var _fp = {};

function changeFullpageSlide(to) {
  const comp = _fp;

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

  const direction = VERTICAL;

  comp.onVerticalScroll.call(comp, data, direction);
}

class Fullpage extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'Fullpage';

    const p = this.props;
    if (p.infinite && p.resetSlides) {
      throw new Error(`${this.name} cannot have both infinite and resetSlides as truthy props`);
    }

    this.infinite  = false;
    this.ss = null;
    this.winProp = 'innerHeight';
    this.elementBoundary = 'scrollTop';
    this.scrollSpeed = p.scrollSpeed || 500;

    this.onHorizontalChange = p.onHorizontalChange || noOp;
    this.onSlideChangeStart = p.onSlideChangeStart || noOp;
    this.onSlideChangeEnd = p.onSlideChangeEnd || noOp;

    this.state = {
      activeSlide: p.activeSlide || 0,
      lastActive: -1,
      scrollSensitivity: p.scrollSensitivity || 100,
      touchSensitivity: p.touchSensitivity || 100,
      scrollPending: false
    };

    if (!Object.keys(_fp).length) {
      _fp = this;
      module.exports._fp = _fp;
    }
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
      scrollCb: onScrollAction.bind(null, this),
      touchCb: this.onTouchAction.bind(this)
    });
    this.ss = ss;

    // document.addEventListener('keydown', this.checkKey);
    window.addEventListener('resize', resize.bind(this));

    resize.call(this);

    //hide scrollbars
    if (this.props.hideScrollBars) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    this.ss.killAll();
    this.ss = null;

    document.removeEventListener('keydown', this.checkKey);
    window.removeEventListener('resize', resize.bind(this));
  }

  checkKey(e) {
    let direction = null;
    e = e || window.event;
    if (KEY_IDX[e.keyCode]) {
      direction = KEY_IDX[e.keyCode];
    } else {
      return false;
    }

    //can remove this when carousel is implemented
    if (typeof direction !== 'number') {
      return false;
    }

    this.scrollToSlide(this.state.activeSlide + direction);
  }

  onTouchAction(data) {

  }

  onVerticalScroll(data, direction) {
    handleScroll.call(this, data, direction, GET_BODY(), this.props.onSlideChangeEnd.bind(this, this.name));
  }

  render() {
    var p = this.props;
    var s = this.state;

    console.log('rendering fullpage');

    return (
      <div ref={node => this.node = node} className={defaultClass.call(this)} style={{height: s.height}}>
        {(p.children || []).map((c) => {
          if (!c) {
            return false;
          }

          if (c.type.name === 'Slide') {
            return c;
          }

          if (c.type.name === 'HorizontalSlider') {
            return c;
          }

          return null;
        })}

        {(p.children || []).filter((c) => {
          if (!c) {
            return true;
          }

          if (c.type.name === 'Slide' || c.type.name === 'HorizontalSlider') {
            return false
          }

          return true;
        })}
      </div>
    );
  }
}

Fullpage.propTypes = {
  children: React.PropTypes.node,
  touchSensitivity: React.PropTypes.number,
  scrollSensitivity: React.PropTypes.number,
  activeSlide: React.PropTypes.number,
  onSlideChangeStart: React.PropTypes.func.isRequired,
  onSlideChangeEnd: React.PropTypes.func.isRequired,
  hideScrollBars: React.PropTypes.bool,
  infinite: React.PropTypes.bool,
  resetSlides: React.PropTypes.bool
};

module.exports = {
  Fullpage,
  _fp,
  changeHorizontalSlide,
  changeFullpageSlide
};
