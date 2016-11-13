'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Tappable = require('react-tappable');

var events = require('../utils/events');
var renderUtils = require('../utils/renderUtils');

var styles = {
  position: 'fixed',
  zIndex: '1',
  cursor: 'pointer',

  //defaults
  top: '50%',
  left: '1%'
};

var SideNav = function (_React$Component) {
  _inherits(SideNav, _React$Component);

  function SideNav(props) {
    _classCallCheck(this, SideNav);

    var _this = _possibleConstructorReturn(this, (SideNav.__proto__ || Object.getPrototypeOf(SideNav)).call(this, props));

    _this.state = {
      side: _this.props.right ? 'right' : 'left',
      currentStyles: styles,
      defaultClass: 'sideNav'
    };

    _this.goToSlide = _this.goToSlide.bind(_this);
    _this.updateStyles = _this.updateStyles.bind(_this);
    return _this;
  }

  _createClass(SideNav, [{
    key: 'updateStyles',
    value: function updateStyles(styles) {
      this.setState({ currentStyles: styles });
    }
  }, {
    key: 'goToSlide',
    value: function goToSlide(slide) {
      events.sub('Fullpage', slide);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.top) {
        this.setState(function (prevState, props) {
          var styles = prevState.currentStyles;
          styles.top = props.top;

          return {
            currentStyles: styles
          };
        });
      }

      if (this.props.right) {
        this.setState(function (prevState, props) {
          var styles = prevState.currentStyles;
          styles.right = props.right;
          delete styles.left;

          return {
            currentStyles: styles
          };
        });
      } else {
        this.setState(function (prevState, props) {
          var styles = prevState.currentStyles;
          styles.left = props.left;

          return {
            currentStyles: styles
          };
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: renderUtils.defaultClass.call(this), style: this.state.currentStyles },
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

  return SideNav;
}(React.Component);

SideNav.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  top: React.PropTypes.string,
  left: React.PropTypes.string,
  right: React.PropTypes.string
};

module.exports = SideNav;