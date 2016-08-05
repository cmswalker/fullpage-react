'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Tappable = require('react-tappable');

var events = require('../utils/events');

var sideNav = function (_React$Component) {
  _inherits(sideNav, _React$Component);

  function sideNav(props) {
    _classCallCheck(this, sideNav);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(sideNav).call(this, props));

    _this.state = {
      side: _this.props.side === 'right' ? 'right' : 'left'
    };

    _this.goToSlide = _this.goToSlide.bind(_this);
    return _this;
  }

  _createClass(sideNav, [{
    key: 'goToSlide',
    value: function goToSlide(slide) {
      events.pub('Fullpage', slide);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = {
        position: 'fixed',
        zIndex: '1',
        cursor: 'pointer',

        //defaults
        top: '50%',
        left: '1%'
      };

      if (this.props.top) {
        styles.top = this.props.top;
      }

      if (this.props.right) {
        styles.right = this.props.right;
        delete styles.left;
      } else {
        styles.left = this.props.left || styles.left;
      }

      return React.createElement(
        'div',
        { style: styles },
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

  return sideNav;
}(React.Component);

;

module.exports = sideNav;