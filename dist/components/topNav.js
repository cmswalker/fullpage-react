'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Tappable = require('react-tappable');

var events = require('../utils/events');
var renderUtils = require('../utils/renderUtils');

var TopNav = function (_React$Component) {
  _inherits(TopNav, _React$Component);

  function TopNav(props) {
    _classCallCheck(this, TopNav);

    var _this = _possibleConstructorReturn(this, (TopNav.__proto__ || Object.getPrototypeOf(TopNav)).call(this, props));

    _this.state = {
      defaultClass: _this.props.footer ? 'bottomNav' : 'topNav'
    };
    return _this;
  }

  _createClass(TopNav, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nP, nS) {}
  }, {
    key: 'goToSlide',
    value: function goToSlide(slide) {
      events.sub('Fullpage', slide);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = {
        position: 'fixed',
        width: '100%',
        zIndex: '1',
        cursor: 'pointer',

        //defaults
        textAlign: 'left',
        top: '0'
      };

      if (this.props.footer) {
        styles.bottom = '0';
        delete styles.top;
      }

      if (this.props.align === 'right') {
        styles.textAlign = 'right';
      } else if (this.props.align === 'center') {
        styles.textAlign = 'center';
      }

      return React.createElement(
        'div',
        { className: renderUtils.defaultClass.call(this), style: styles },
        this.props.children.map(function (child, idx) {
          return React.createElement(
            Tappable,
            { key: idx, onTap: _this2.goToSlide.bind(_this2, child.ref), onClick: _this2.goToSlide.bind(_this2, child.ref) },
            child
          );
        }, this)
      );
    }
  }]);

  return TopNav;
}(React.Component);

TopNav.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  footer: React.PropTypes.bool,
  align: React.PropTypes.string
};

module.exports = TopNav;