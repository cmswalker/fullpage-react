'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Slide = require('./slide');

var scrollTo = require('../utils/scrollTo');
var events = require('../utils/events');
var renderUtils = require('../utils/renderUtils');
var KEY_IDX = renderUtils.KEY_IDX;
var GET_BODY = renderUtils.GET_BODY;


var touchArr = [];
var latestTouch;

var Fullpage = function (_React$Component) {
  _inherits(Fullpage, _React$Component);

  function Fullpage(props) {
    _classCallCheck(this, Fullpage);

    var _this = _possibleConstructorReturn(this, (Fullpage.__proto__ || Object.getPrototypeOf(Fullpage)).call(this, props));

    var slideChildren = getSlideCount(_this.props.children);

    _this.state = {
      name: 'Fullpage',
      defaultClass: 'Fullpage',
      slides: [],
      slidesCount: slideChildren,
      activeSlide: 0,
      lastActive: -1,
      downThreshold: -Math.abs(_this.props.threshold || 100),
      upThreshold: _this.props.threshold || 100,
      touchStart: 0,
      touchSensitivity: _this.props.sensitivity || 100,
      scrollPending: false
    };

    _this.onScroll = _this.onScroll.bind(_this);
    _this.onTouchStart = _this.onTouchStart.bind(_this);
    _this.onTouchEnd = _this.onTouchEnd.bind(_this);
    _this.checkKey = _this.checkKey.bind(_this);
    _this.onResize = _this.onResize.bind(_this);
    return _this;
  }

  _createClass(Fullpage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('wheel', this.onScroll);
      document.addEventListener('touchmove', this.onTouchStart);
      document.addEventListener('touchend', this.onTouchEnd);
      document.addEventListener('keydown', this.checkKey);
      window.addEventListener('resize', this.onResize);
      events.pub(this, this.scrollToSlide);

      //initialize slides
      this.onResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('wheel', this.onScroll);
      document.removeEventListener('touchmove', this.onTouchStart);
      document.removeEventListener('touchend', this.onTouchEnd);
      document.removeEventListener('keydown', this.checkKey);
      window.removeEventListener('resize', this.onResize);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nP, nS) {
      return true;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(pP, pS) {
      events.active = this.state.activeSlide;
      this.props.active(this.state.activeSlide);
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
    key: 'onResize',
    value: function onResize() {
      var slides = [];

      for (var i = 0; i < this.state.slidesCount; i++) {
        slides.push(window.innerHeight * i);
      }

      this.setState({
        'slides': slides,
        'height': window.innerHeight
      });

      this.scrollToSlide(this.state.activeSlide, true);
    }
  }, {
    key: 'scrollToSlide',
    value: function scrollToSlide(slide, override) {
      var _this2 = this;

      if (override) {
        return scrollTo.call(this, GET_BODY(), this.state.slides[slide], 100, function () {
          _this2.setState({ 'activeSlide': slide });
          _this2.setState({ 'scrollPending': false });
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

      scrollTo(GET_BODY(), this.state.slides[slide], 600, function () {
        _this2.setState({ 'activeSlide': slide });
        _this2.setState({ 'scrollPending': false });
      });
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      e.preventDefault();
      var t = e.touches[0].clientY;
      latestTouch = t;
      touchArr.push(t);

      if (touchArr.length > 10) {
        this.setState({ 'touchStart': touchArr[0] });
        touchArr = [];
        return;
      }
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(e) {
      var touchEnd = e.changedTouches[0].clientY;
      var touchStart = this.state.touchStart;
      var sensitivity = this.state.touchSensitivity;

      //prevent standard taps creating false positives;
      if (latestTouch !== touchEnd) {
        return;
      }

      if (!touchStart || touchStart > touchEnd + Math.abs(sensitivity / 2)) {

        if (this.state.activeSlide == this.state.slidesCount - 1) {
          // prevent down going down
          return;
        }

        return this.scrollToSlide(this.state.activeSlide + 1);
      }

      if (this.state.activeSlide == 0) {
        // prevent up going up
        return;
      }

      this.scrollToSlide(this.state.activeSlide - 1);
    }
  }, {
    key: 'onArrowClick',
    value: function onArrowClick() {
      this.scrollToSlide(this.state.activeSlide + 1);
    }
  }, {
    key: 'onScroll',
    value: function onScroll(e) {
      var _this3 = this;

      e.preventDefault();
      if (this.state.scrollPending) {
        return;
      }

      var one = e.wheelDelta;
      var two = e.deltaY;
      var three = e.detail;

      var scrollDown = (e.wheelDelta || -e.deltaY || e.detail) < this.state.downThreshold;
      var scrollUp = (e.wheelDelta || -e.deltaY || e.detail) > this.state.upThreshold;

      if (!scrollDown && !scrollUp) {
        return this.setState({ 'scrollPending': false });
      }

      var activeSlide = this.state.activeSlide;

      if (scrollDown) {
        if (activeSlide == this.state.slidesCount - 1) {
          // prevent down going down
          return this.setState({ 'scrollPending': false });
        }

        activeSlide = activeSlide + 1;
      } else if (scrollUp) {
        if (!activeSlide) {
          // prevent up going up
          return this.setState({ 'scrollPending': false });
        }

        activeSlide = activeSlide - 1;
      }

      this.setState({ 'scrollPending': true });

      scrollTo(GET_BODY(), this.state.slides[activeSlide], 500, function () {
        _this3.setState({ 'activeSlide': activeSlide });
        _this3.setState({ 'lastActive': scrollDown ? activeSlide-- : activeSlide++ });

        setTimeout(function () {
          _this3.setState({ 'scrollPending': false });
        }, _this3.state.upThreshold * 2);
      });
      return this.setState({ 'scrollPending': true });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: renderUtils.defaultClass.call(this), style: { height: this.state.height } },
        this.props.children
      );
    }
  }]);

  return Fullpage;
}(React.Component);

Fullpage.propTypes = {
  children: React.PropTypes.node.isRequired,
  threshold: React.PropTypes.number,
  sensitivity: React.PropTypes.number,
  active: React.PropTypes.func
};

function getSlideCount(children) {
  return children.reduce(function (result, c) {
    if (Array.isArray(c)) {
      return getSlideCount(c);
    }

    if (!c.type) {
      return result;
    }

    if (c.type === Slide) {
      return result = result + 1;
    }

    return result;
  }, 0);
}

module.exports = Fullpage;