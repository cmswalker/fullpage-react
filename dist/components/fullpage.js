'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var TopNav = require('./topNav');
var SideNav = require('./sideNav');
var Slide = require('./slide');

var scrollTo = require('../utils/scrollTo');
var events = require('../utils/events');
var renderUtils = require('../utils/renderUtils');

var BROWSER = null;
var ELEMENT_BROWSERS = null;
var BODY = null;

var getBody = function getBody() {
  if (!BODY) {
    BROWSER = renderUtils.browser();
    ELEMENT_BROWSERS = renderUtils.elementBrowsers;
    BODY = !!~ELEMENT_BROWSERS.indexOf(BROWSER) ? document.documentElement : document.body;
  }

  return BODY;
};

var Fullpage = function (_React$Component) {
  _inherits(Fullpage, _React$Component);

  function Fullpage(props) {
    _classCallCheck(this, Fullpage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Fullpage).call(this, props));

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
    return _this;
  }

  _createClass(Fullpage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('wheel', this.onScroll.bind(this));
      document.addEventListener('touchstart', this.onTouchStart.bind(this));
      document.addEventListener('touchend', this.onTouchEnd.bind(this));
      window.addEventListener('resize', this.onResize.bind(this));
      events.pub(this, this.scrollToSlide);

      //initialize slides    
      this.onResize();
      this.scrollToSlide(0);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('wheel', this.onScroll);
      document.removeEventListener('touchstart', this.onTouchStart);
      document.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('resize', this.onResize);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nP, nS) {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(pP, pS) {
      events.active = this.state.activeSlide;
      this.props.active(this.state.activeSlide);
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
      if (override) {
        var self = this;
        return scrollTo.call(this, getBody(), self.state.slides[slide], 100, function () {
          self.setState({ 'activeSlide': slide });
          self.setState({ 'scrollPending': false });
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

      var self = this;
      scrollTo(getBody(), self.state.slides[slide], 600, function () {
        self.setState({ 'activeSlide': slide });
        self.setState({ 'scrollPending': false });
      });
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      this.setState({ 'touchStart': e.touches[0].clientY });
      e.preventDefault();
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(e) {
      var touchEnd = e.changedTouches[0].clientY;

      if (this.state.touchStart > touchEnd + Math.abs(this.state.touchSensitivity)) {

        if (this.state.activeSlide == this.state.slidesCount - 1) {
          // prevent down going down
          return;
        }

        return this.scrollToSlide(this.state.activeSlide + 1);
      } else {

        if (this.state.activeSlide == 0) {
          // prevent up going up
          return;
        }

        this.scrollToSlide(this.state.activeSlide - 1);
      }
    }
  }, {
    key: 'onArrowClick',
    value: function onArrowClick() {
      this.scrollToSlide(this.state.activeSlide + 1);
    }
  }, {
    key: 'onScroll',
    value: function onScroll(e) {
      e.preventDefault();
      if (this.state.scrollPending) {
        return;
      }

      var scrollDown = (e.wheelDelta || -e.deltaY || e.detail) < this.state.downThreshold;
      var scrollUp = (e.wheelDelta || -e.deltaY || e.detail) > this.state.upThreshold;

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
      } else {
        return this.setState({ 'scrollPending': false });
      }

      this.setState({ 'scrollPending': true });

      var self = this;
      scrollTo(getBody(), self.state.slides[activeSlide], 500, function () {
        self.setState({ 'activeSlide': activeSlide });
        self.setState({ 'lastActive': scrollDown ? activeSlide-- : activeSlide++ });

        setTimeout(function () {
          self.setState({ 'scrollPending': false });
        }, self.state.upThreshold * 2);
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

;
Fullpage.propTypes = {
  children: React.PropTypes.node.isRequired
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