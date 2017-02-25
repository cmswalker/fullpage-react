'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ScrollSwipe = require('scroll-swipe');

var Slide = require('./slide');
var Overlay = require('./overlay');

var _require = require('../actions'),
    onScrollAction = _require.onScrollAction;

var utils = require('../utils');
var jumpScroll = utils.jumpScroll,
    handleScroll = utils.handleScroll,
    resize = utils.resize,
    renderUtils = utils.renderUtils;
var defaultClass = renderUtils.defaultClass;

var _require2 = require('../utils/constants'),
    HORIZONTAL = _require2.HORIZONTAL;

var DEFAULTS = {
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
  var comp = horizontalSliders[name];

  if (!_localfp) {
    var _require3 = require('./fullpage'),
        _fp = _require3._fp;

    _localfp = _fp;
  }

  if (!comp) {
    throw new Error('No Horizontal Slider with name: ' + name);
  }

  if (comp.state.scrollPending || to == comp.state.activeSlide) {
    return;
  }

  if (!to && to !== 0 || to >= comp.state.slideCount) {
    to = 'NEXT';
  }

  if (to < 0) {
    to = 'PREV';
  }

  if (to !== 'NEXT' && to !== 'PREV') {
    _localfp.onSlideChangeStart(comp.name, comp.state);
    comp.setState({ scrollPending: true });
    return jumpScroll.call(comp, to, comp.node, _localfp.onSlideChangeEnd.bind(comp, comp.name));
  }

  var intent = to === 'NEXT' ? 1 : 0;
  var data = {
    intent: intent
  };

  var direction = HORIZONTAL;

  comp.onHorizontalScroll.call(comp, data, direction);
}

var HorizontalSlider = function (_React$Component) {
  _inherits(HorizontalSlider, _React$Component);

  function HorizontalSlider(props) {
    _classCallCheck(this, HorizontalSlider);

    var _this = _possibleConstructorReturn(this, (HorizontalSlider.__proto__ || Object.getPrototypeOf(HorizontalSlider)).call(this, props));

    var p = _this.props;

    _this.name = 'HorizontalSlider';

    if (p.infinite && p.resetSlides) {
      throw new Error(_this.name + ' cannot have both infinite and resetSlides as truthy props');
    }

    _this.winProp = 'innerWidth';
    _this.elementBoundary = 'scrollLeft';
    _this.scrollSpeed = p.scrollSpeed || DEFAULTS.scrollSpeed;
    _this.infinite = p.infinite;

    _this.parentOnScrollAction = onScrollAction;

    _this.state = {
      activeSlide: p.activeSlide || 0,
      lastActive: -1,
      scrollSensitivity: p.scrollSensitivity || 10,
      touchSensitivity: p.touchSensitivity || 10,
      scrollPending: false
    };

    if (!horizontalSliders[p.name]) {
      horizontalSliders[p.name] = _this;
    }
    return _this;
  }

  _createClass(HorizontalSlider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var p = this.props;
      this.setState({ activeSlide: states[p.name] || p.activeSlide || 0 });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var node = this.node;
      var s = this.state;

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
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      states[this.props.name] = this.state.activeSlide;
    }
  }, {
    key: 'onScrollAction',
    value: function onScrollAction(data) {
      var ss = this.ss;


      if (data.direction !== HORIZONTAL) {
        return ss.listen();
      }

      this.parentOnScrollAction(this, data);
    }
  }, {
    key: 'onHorizontalScroll',
    value: function onHorizontalScroll(data, direction) {
      //must access the global callback
      if (!_localfp) {
        var _require4 = require('./fullpage'),
            _fp = _require4._fp;

        _localfp = _fp;
      }

      var cb = _localfp.onSlideChangeEnd.bind(this, this.props.name);
      var node = this.node;
      handleScroll.call(this, data, direction, node, cb);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;

      var overlayStyle = { position: 'absolute' };

      if (this.state.scrollPending) {
        overlayStyle.position = 'fixed';
      }

      var attrs = {
        'data-slide': 'Fullpage'
      };

      var horizontalSliderStyle = Object.assign({}, p.style, { height: this.state.height, width: '100%', position: 'relative', overflowX: 'auto', whiteSpace: 'nowrap', padding: '0px', margin: '0 auto', overflow: 'hidden' });

      var horizontalSlideStyle = { overflow: 'hidden', whiteSpace: 'normal', display: 'inline-block', height: window.innerHeight, width: '100%' };

      return React.createElement(
        'div',
        _extends({ ref: function ref(node) {
            return _this2.node = node;
          }, className: defaultClass.call(this) }, attrs, { style: horizontalSliderStyle }),
        (p.children || []).map(function (ch, i) {
          if (!ch) {
            return null;
          }

          if (ch.type.name !== 'Slide' && ch.type.name !== 'Overlay') {
            return null;
          }

          if (ch.type.name === 'Overlay') {
            var oStyle = ch.props.style || {};
            var oClassName = ch.props.className || '';
            return React.createElement(
              Overlay,
              { className: oClassName, key: i, style: Object.assign({}, overlayStyle, oStyle) },
              ch.props.children
            );
          }

          var hSlideProps = ch.props;
          var hSlideClassName = hSlideProps.className || '';
          var slideStyle = hSlideProps.style || {};
          var attrs = {
            'data-slide': 'HorizontalSlider'
          };

          return React.createElement(
            Slide,
            _extends({ key: i, className: hSlideClassName, horizontal: true, style: Object.assign({}, horizontalSlideStyle, slideStyle) }, attrs),
            hSlideProps.children
          );
        })
      );
    }
  }]);

  return HorizontalSlider;
}(React.Component);

HorizontalSlider.propTypes = {
  children: React.PropTypes.node,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
  infinite: React.PropTypes.bool.isRequired,
  onHorizontalChange: React.PropTypes.func
};

module.exports = {
  HorizontalSlider: HorizontalSlider,
  changeHorizontalSlide: changeHorizontalSlide
};