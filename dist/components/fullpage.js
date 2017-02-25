'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ScrollSwipe = require('scroll-swipe');

var _require = require('../utils'),
    jumpScroll = _require.jumpScroll,
    handleScroll = _require.handleScroll,
    resize = _require.resize,
    renderUtils = _require.renderUtils;

var defaultClass = renderUtils.defaultClass,
    KEY_IDX = renderUtils.KEY_IDX,
    GET_BODY = renderUtils.GET_BODY;

var _require2 = require('../actions'),
    onScrollAction = _require2.onScrollAction;

var _require3 = require('../utils/constants'),
    noOp = _require3.noOp,
    VERTICAL = _require3.VERTICAL;

var HorizontalSliderModule = require('./HorizontalSlider');
var changeHorizontalSlide = HorizontalSliderModule.changeHorizontalSlide;


var _fp = {};

function changeFullpageSlide(to) {
  var comp = _fp;

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
    comp.onSlideChangeStart(comp.name, comp.state);
    comp.setState({ scrollPending: true });
    return jumpScroll.call(comp, to, GET_BODY(), comp.props.onSlideChangeEnd.bind(comp, comp.name));
  }

  var intent = to === 'NEXT' ? 1 : 0;
  var data = {
    intent: intent
  };

  var direction = VERTICAL;

  comp.onVerticalScroll.call(comp, data, direction);
}

var Fullpage = function (_React$Component) {
  _inherits(Fullpage, _React$Component);

  function Fullpage(props) {
    _classCallCheck(this, Fullpage);

    var _this = _possibleConstructorReturn(this, (Fullpage.__proto__ || Object.getPrototypeOf(Fullpage)).call(this, props));

    _this.name = 'Fullpage';

    var p = _this.props;
    if (p.infinite && p.resetSlides) {
      throw new Error(_this.name + ' cannot have both infinite and resetSlides as truthy props');
    }

    _this.infinite = false;
    _this.ss = null;
    _this.winProp = 'innerHeight';
    _this.elementBoundary = 'scrollTop';
    _this.scrollSpeed = p.scrollSpeed || 500;

    _this.onHorizontalChange = p.onHorizontalChange || noOp;
    _this.onSlideChangeStart = p.onSlideChangeStart || noOp;
    _this.onSlideChangeEnd = p.onSlideChangeEnd || noOp;

    _this.state = {
      activeSlide: p.activeSlide || 0,
      lastActive: -1,
      scrollSensitivity: p.scrollSensitivity || 10,
      touchSensitivity: p.touchSensitivity || 10,
      scrollPending: false
    };

    if (!Object.keys(_fp).length) {
      _fp = _this;
      module.exports._fp = _fp;
    }
    return _this;
  }

  _createClass(Fullpage, [{
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
        scrollCb: onScrollAction.bind(null, this),
        touchCb: onScrollAction.bind(null, this)
      });
      this.ss = ss;

      // document.addEventListener('keydown', this.checkKey);
      window.addEventListener('resize', resize.bind(this));

      resize.call(this);

      //hide scrollbars
      if (this.props.hideScrollBars) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.ss.killAll();
      this.ss = null;

      document.removeEventListener('keydown', this.checkKey);
      window.removeEventListener('resize', resize.bind(this));
    }
  }, {
    key: 'checkKey',
    value: function checkKey(e) {
      var direction = null;
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
  }, {
    key: 'onVerticalScroll',
    value: function onVerticalScroll(data, direction) {
      handleScroll.call(this, data, direction, GET_BODY(), this.props.onSlideChangeEnd.bind(this, this.name));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;

      return React.createElement(
        'div',
        { ref: function ref(node) {
            return _this2.node = node;
          }, className: defaultClass.call(this) },
        (p.children || []).map(function (c) {
          if (!c) {
            return false;
          }

          return c;
        })
      );
    }
  }]);

  return Fullpage;
}(React.Component);

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
  Fullpage: Fullpage,
  _fp: _fp,
  changeHorizontalSlide: changeHorizontalSlide,
  changeFullpageSlide: changeFullpageSlide
};