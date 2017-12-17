(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("FullpageReact", ["react"], factory);
	else if(typeof exports === 'object')
		exports["FullpageReact"] = factory(require("react"));
	else
		root["FullpageReact"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var HorizontalSlide = 'HorizontalSlide';
var VerticalSlide = 'VerticalSlide';

var Slide = function Slide(props) {
  var render = props.render,
      className = props.className,
      window = props.window,
      horizontal = props.horizontal,
      horizontalSliderName = props.horizontalSliderName;


  if (!render) {
    return null;
  }

  var children = Array.isArray(props.children) ? props.children : [props.children];
  var innerWidth = window.innerWidth,
      innerHeight = window.innerHeight;

  var style = props.style || {};

  var styles = Object.assign({
    overflow: 'hidden', width: innerWidth, height: innerHeight, position: 'relative'
  }, style);

  var slideClassName = horizontal ? [HorizontalSlide] : [VerticalSlide];
  if (className) {
    slideClassName.push(className);
  }
  slideClassName = slideClassName.join(' ');

  var attrs = {
    'data-slide': horizontal ? HorizontalSlide : VerticalSlide,
    'data-horizontal-slider': horizontalSliderName || null
  };

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    _extends({ className: slideClassName, id: props.id }, attrs, { style: styles }),
    children
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Slide);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slide__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var HorizontalSlider = function (_React$Component) {
  _inherits(HorizontalSlider, _React$Component);

  function HorizontalSlider(props) {
    _classCallCheck(this, HorizontalSlider);

    var _this = _possibleConstructorReturn(this, (HorizontalSlider.__proto__ || Object.getPrototypeOf(HorizontalSlider)).call(this, props));

    _this.name = _this.props.name;
    return _this;
  }

  _createClass(HorizontalSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          activeSlide = _props.activeSlide,
          document = _props.document,
          name = _props.name,
          cache = _props.cache;

      cache(this);

      var nodes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* getNodes */])(document, 'data-horizontal-slider="' + name + '"');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* hideAllButActive */])(activeSlide, nodes);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var p = this.props;
      var name = p.name,
          children = p.children,
          window = p.window;


      if (!name) {
        throw new Error('name is a required prop for HorizontalSlider');
      }

      var elements = p.slides.reduce(function (result, sl) {
        if (!sl) {
          return result;
        }

        if (typeof sl.type !== 'function') {
          result.other.push(sl);
        } else {
          result.slides.push(sl);
        }

        return result;
      }, { slides: [], other: [] });

      var other = elements.other,
          slides = elements.slides;
      var innerWidth = window.innerWidth,
          innerHeight = window.innerHeight;

      var attrs = {
        'data-slide': 'HorizontalSlider',
        'data-name': name
      };

      var className = (p.className || '') + 'HorizontalSlider';
      var overflowX = p.hideScrollBars ? 'hidden' : 'auto';

      var horizontalSliderStyle = Object.assign({}, p.style, { height: window.innerHeight, width: innerWidth, position: 'relative', overflowX: overflowX, whiteSpace: 'nowrap', padding: '0px', margin: '0' });
      var horizontalSlideStyle = { overflow: 'hidden', whiteSpace: 'normal', display: 'inline-block', height: innerHeight, width: innerWidth };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        _extends({ ref: function ref(node) {
            return _this2.node = node;
          }, className: className, id: p.id }, attrs, { style: horizontalSliderStyle }),
        other.map(function (o, i) {
          var p = o.props || {};
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', _extends({ key: i }, p));
        }),
        slides.map(function (s, i) {
          if (!s) {
            return null;
          }

          var sStyle = Object.assign({}, horizontalSlideStyle, slideStyle);
          var hSlideProps = s.props || {};
          var slideStyle = hSlideProps.style || {};

          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_1__slide__["a" /* default */],
            _extends({ render: true, key: i, horizontalSliderName: name, slide: s, id: hSlideProps.id, className: hSlideProps.className || '', window: window, horizontal: true, style: sStyle }, hSlideProps),
            hSlideProps.children
          );
        }),
        children
      );
    }
  }]);

  return HorizontalSlider;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (HorizontalSlider);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return composedPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return showAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hideAllButActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return INTENT_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return detectBrowser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderUtils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scrollTo__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detectOS_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detectOS_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__detectOS_js__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__constants__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__renderUtils__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__scrollTo__["a"]; });





function composedPath(el) {
	var paths = [];

	while (el) {
		paths.push(el);

		if (el.tagName === 'HTML') {
			paths.push(document);
			paths.push(window);
			return paths;
		}

		el = el.parentElement;
	}

	return paths;
}

function getNodes(document, sel) {
	return document.querySelectorAll('[' + sel + ']');
}

function hideAllButActive(activeSlide, nodes) {
	Array.prototype.forEach.call(nodes, function (n, i) {
		if (i === activeSlide) {
			n.style.display = 'inline-block';
		} else {
			n.style.display = 'none';
		}
	});
}

function showAll(nodes) {
	Array.prototype.forEach.call(nodes, function (n) {
		n.style.display = 'inline-block';
	});
}

var INTENT_MAP = {
	'VERTICAL': {
		0: 'UP',
		1: 'DOWN'
	},
	'HORIZONTAL': {
		0: 'LEFT',
		1: 'RIGHT'
	}
};

function detectBrowser(userAgentString) {
	if (!userAgentString) {
		return null;
	}

	var browsers = [['edge', /Edge\/([0-9\._]+)/], ['yandexbrowser', /YaBrowser\/([0-9\._]+)/], ['vivaldi', /Vivaldi\/([0-9\.]+)/], ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/], ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/], ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/], ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/], ['fxios', /FxiOS\/([0-9\.]+)/], ['opera', /Opera\/([0-9\.]+)(?:\s|$)/], ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/], ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/], ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ['ie', /MSIE\s(7\.0)/], ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/], ['android', /Android\s([0-9\.]+)/], ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/], ['safari', /Version\/([0-9\._]+).*Safari/]];

	return browsers.map(function (rule) {
		if (rule[1].test(userAgentString)) {
			var match = rule[1].exec(userAgentString);
			var version = match && match[1].split(/[._]/).slice(0, 3);

			if (version && version.length < 3) {
				Array.prototype.push.apply(version, version.length == 1 ? [0, 0] : [0]);
			}

			return {
				name: rule[0],
				version: version.join('.'),
				os: __WEBPACK_IMPORTED_MODULE_3__detectOS_js___default()(userAgentString)
			};
		}
	}).filter(Boolean).shift();
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_scroll_swipe__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_scroll_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_scroll_swipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__slide__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__horizontalSlider__ = __webpack_require__(2);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var constants = __WEBPACK_IMPORTED_MODULE_2__utils_index_js__["c" /* constants */],
    scrollTo = __WEBPACK_IMPORTED_MODULE_2__utils_index_js__["d" /* scrollTo */],
    renderUtils = __WEBPACK_IMPORTED_MODULE_2__utils_index_js__["e" /* renderUtils */],
    INTENT_MAP = __WEBPACK_IMPORTED_MODULE_2__utils_index_js__["f" /* INTENT_MAP */],
    getNodes = __WEBPACK_IMPORTED_MODULE_2__utils_index_js__["a" /* getNodes */],
    showAll = __WEBPACK_IMPORTED_MODULE_2__utils_index_js__["g" /* showAll */],
    hideAllButActive = __WEBPACK_IMPORTED_MODULE_2__utils_index_js__["b" /* hideAllButActive */],
    composedPath = __WEBPACK_IMPORTED_MODULE_2__utils_index_js__["h" /* composedPath */];
var noOp = constants.noOp;
var KEY_IDX = renderUtils.KEY_IDX;


var _fp = {};
var global = {};

function generateState() {
  var activeSlide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return {
    activeSlide: activeSlide,
    lastActive: activeSlide - 1
  };
}

var Fullpage = function (_React$Component) {
  _inherits(Fullpage, _React$Component);

  function Fullpage(props) {
    _classCallCheck(this, Fullpage);

    var _this = _possibleConstructorReturn(this, (Fullpage.__proto__ || Object.getPrototypeOf(Fullpage)).call(this, props));

    var p = _this.props;

    if (p.infinite && p.resetSlides) {
      throw new Error('Fullpage Component cannot have both infinite and resetSlides as truthy props');
    }

    var slides = p.slides,
        window = p.window;


    if (!slides || !slides.length) {
      throw new Error('Please provide slides for Fullpage');
    }

    if (window) {
      global.window = window;
      global.document = global.window.document;
    }

    var horizontalMap = {};
    // generate state for horizontals;
    var horizontals = slides.reduce(function (result, s, i) {
      var name = s.props.name;


      if (s.props.slides && name) {
        result[name] = generateState(0);
        horizontalMap[i] = name;
      }

      return result;
    }, {});
    horizontals.horizontalMap = horizontalMap;

    _this.name = 'Fullpage';
    var activeSlide = p.activeSlide || 0;
    _this.scrollSensitivity = p.scrollSensitivity || 10;
    _this.touchSensitivity = p.touchSensitivity || 10;

    _this.scrollSpeed = p.scrollSpeed || 500;

    _this.node = null;
    _this.ss = null;
    _this.verticalRoot = determineVerticalRoot();

    _this.onHorizontalChange = p.onHorizontalChange || noOp;
    _this.onSlideChangeStart = p.onSlideChangeStart || noOp;
    _this.onSlideChangeEnd = p.onSlideChangeEnd || noOp;

    _this.onScrollAction = _this.onScrollAction.bind(_this);
    _this.onVerticalScroll = _this.onVerticalScroll.bind(_this);
    _this.onHorizontalScroll = _this.onHorizontalScroll.bind(_this);
    _this.resize = _this.resize.bind(_this);
    _this.isLocked = false;
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.hSlideCache = {};
    _this.cacheHslide = function (slide) {
      _this.hSlideCache[slide.name] = slide;
    };

    _fp = _this;

    _this.state = Object.assign({
      scrollPending: false,
      window: null,
      document: null
    }, horizontals, generateState(activeSlide));
    return _this;
  }

  _createClass(Fullpage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!global.window) {
        global.window = window || this.props.window || null;
        global.document = global.window ? global.window.document : null;
      }

      if (!global.window) {
        throw new Error('Window is not available at componentDidMount, please provide a stub and pass window into props when available');
      }

      this.setState({
        window: global.window,
        document: global.document
      }, function () {
        _this2.init.call(_this2);
      });
    }
  }, {
    key: 'init',
    value: function init() {
      var window = this.state.window;

      window.addEventListener('resize', this.resize.bind(this, window));
      this.resize(window);
    }
  }, {
    key: 'hideScrollBars',
    value: function hideScrollBars() {
      var hideScrollBars = this.props.hideScrollBars;
      var document = this.state.document;


      if (hideScrollBars && !this.isWithinBreakpoint.call(this)) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      }
    }
  }, {
    key: 'showScrollBars',
    value: function showScrollBars() {
      var document = this.state.document;

      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }, {
    key: 'lockScroll',
    value: function lockScroll() {
      var node = this.node;
      var enableArrowKeys = this.props.enableArrowKeys;


      if (enableArrowKeys) {
        window.addEventListener('keydown', this.checkKey.bind(this));
      }

      var ss = new __WEBPACK_IMPORTED_MODULE_1_scroll_swipe___default.a({
        target: node,
        scrollSensitivity: this.scrollSensitivity * 3,
        touchSensitivity: this.touchSensitivity * 3,
        scrollPreventDefault: true,
        touchPreventDefault: true,
        scrollCb: this.onScrollAction,
        touchCb: this.onScrollAction
      });
      this.ss = ss;
      this.isLocked = true;
    }
  }, {
    key: 'unlockScroll',
    value: function unlockScroll() {
      var enableArrowKeys = this.props.enableArrowKeys;

      var ss = this.ss || ssStub();
      ss.killAll();
      this.ss = null;

      if (enableArrowKeys) {
        window.removeEventListener('keydown', this.checkKey.bind(this));
      }
      this.isLocked = false;
    }
  }, {
    key: 'isWithinBreakpoint',
    value: function isWithinBreakpoint() {
      var breakpoint = this.props.breakpoint;


      if (!breakpoint) {
        return false;
      }

      var innerWidth = this.state.window.innerWidth || Infinity;
      return breakpoint && breakpoint >= innerWidth;
    }
  }, {
    key: 'resize',
    value: function resize(window) {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });

      var within = this.isWithinBreakpoint.call(this);

      if (within && this.isLocked) {
        this.unlockScroll.call(this);
        return;
      }

      if (!within && !this.isLocked) {
        this.lockScroll.call(this);
      }
    }
  }, {
    key: 'onScrollAction',
    value: function onScrollAction(_ref) {
      var direction = _ref.direction,
          intent = _ref.intent,
          startEvent = _ref.startEvent;

      var s = this.state;
      var ss = this.ss || ssStub();

      if (s.scrollPending) {
        return ss.listen();
      }

      var dir = INTENT_MAP[direction];

      // at this point we are dedicating
      if (direction === 'VERTICAL') {
        return this.onVerticalScroll(dir[intent], startEvent);
      }

      var path = startEvent.path || startEvent.composedPath();

      if (!path) {
        var polyFillPath = composedPath(startEvent.target);
        path = polyFillPath;
      }

      var isHorizontal = path.find(function (p) {
        if (!p.dataset) {
          return false;
        }

        return p.dataset.slide === 'HorizontalSlider';
      });

      if (!isHorizontal) {
        return ss.listen();
      }

      this.onHorizontalScroll(dir[intent], isHorizontal);
    }
  }, {
    key: 'onVerticalScroll',
    value: function onVerticalScroll(intent) {
      var _this3 = this;

      var s = this.state;
      var window = s.window,
          document = s.document,
          activeSlide = s.activeSlide;
      var slides = this.props.slides;


      var next = intent === 'DOWN' ? activeSlide + 1 : activeSlide - 1;
      if (next < 0 || next > slides.length - 1) {
        var ss = this.ss || ssStub();
        return ss.listen();
      }

      var to = next * window.innerHeight;
      var newState = {
        activeSlide: next,
        lastActive: activeSlide
      };

      this.setState({ scrollPending: true }, function () {
        _this3.handleScroll(_this3.verticalRoot, 'scrollTop', to, newState, _this3.name);
      });
    }
  }, {
    key: 'onHorizontalScroll',
    value: function onHorizontalScroll(intent, node) {
      var name = node.dataset.name;
      var activeSlide = this.state[name].activeSlide;

      var next = intent === 'RIGHT' ? activeSlide + 1 : activeSlide - 1;
      var innerWidth = this.state.window.innerWidth;


      var comp = _fp.hSlideCache[name];
      var hp = comp.props;
      var infinite = hp.infinite;


      var nodes = getNodes(this.state.document, 'data-horizontal-slider="' + name + '"');

      var leftVal = activeSlide * innerWidth;
      var to = next * innerWidth;

      var result = this.determineHSlide(comp, activeSlide, next, leftVal, to, nodes);

      leftVal = result.leftVal;
      next = result.next;
      to = result.to;

      var newState = _defineProperty({}, name, {
        activeSlide: next,
        lastActive: activeSlide
      });

      this.handleHorizontal(name, node, nodes, leftVal, to, next, newState, infinite);
    }
  }, {
    key: 'determineHSlide',
    value: function determineHSlide(comp, activeSlide, next, leftVal, to, nodes) {
      var hp = comp.props;
      var infinite = hp.infinite,
          resetSlides = hp.resetSlides;
      var innerWidth = this.state.window.innerWidth;

      var ss = this.ss || ssStub();

      var len = nodes.length;

      var infStart = activeSlide === 0 && next === -1;
      var infEnd = activeSlide === len - 1 && next === len;

      if (!infinite && !resetSlides && (infStart || infEnd)) {
        return ss.listen();
      }

      if (infinite && infStart) {
        // simulate last <- 0
        next = len - 1;
        lastToFirst(nodes);
        leftVal = innerWidth;
        to = 0;
      } else if (infinite && infEnd) {
        // simulate last -> 0
        next = 0;
        lastToFirst(nodes);
        leftVal = 0;
        to = innerWidth;
      }

      var result = { next: next, leftVal: leftVal, to: to };
      return result;
    }
  }, {
    key: 'handleHorizontal',
    value: function handleHorizontal(name, node, nodes, leftVal, to, next, newState, infinite) {
      var _this4 = this;

      showAll(nodes);
      node.scrollLeft = leftVal;

      //show, reset window
      //scroll
      //hide

      this.setState({ scrollPending: true }, function () {
        _this4.handleScroll(node, 'scrollLeft', to, newState, name, function () {
          if (infinite) {
            firstToLast(nodes);
            node.scrollLeft = innerWidth * next;
          }
          hideAllButActive(next, nodes);
        });
      });
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(node, winProp, to, newState, compName) {
      var _this5 = this;

      var cb = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : noOp;

      var ss = this.ss || ssStub();
      ss.flush();
      this.onSlideChangeStart(compName, this.props, this.state, newState[compName] || newState);

      scrollTo(node, winProp, to, this.scrollSpeed, function () {
        newState.scrollPending = false;
        _this5.setState(newState, function () {
          cb();
          _this5.onSlideChangeEnd(compName, _this5.props, _this5.state, newState[compName] || newState);
          setTimeout(function () {
            ss.flush();
            ss.listen();
          }, 200);
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var ss = this.ss || ssStub();
      ss.killAll();
      this.ss = null;

      var window = this.state.window;


      window.removeEventListener('resize', this.resize.bind(this));
      if (this.props.enableArrowKeys) {
        window.removeEventListener('keydown', this.checkKey.bind(this));
      }
    }
  }, {
    key: 'checkKey',
    value: function checkKey(e) {
      var direction = KEY_IDX[e.keyCode];
      if (!direction) {
        return;
      }

      var intent = direction === 'UP' || direction === 'LEFT' ? -1 : 1;
      var context = direction === 'UP' || direction === 'DOWN' ? 'VERTICAL' : 'HORIZONTAL';

      if (context === 'VERTICAL') {
        Fullpage.changeFullpageSlide(this.state.activeSlide + intent);
        return;
      }

      var horizontalName = this.state.horizontalMap[this.state.activeSlide];
      if (!horizontalName) {
        return;
      }

      var activeSlide = this.state[horizontalName].activeSlide;

      Fullpage.changeHorizontalSlide(horizontalName, activeSlide + intent);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var s = this.state;
      var p = this.props;
      var window = s.window,
          document = s.document;


      var children = p.children || null;

      if (!window) {
        return children;
      }

      var elements = p.slides.reduce(function (result, sl) {
        if (!sl) {
          return result;
        }

        if (typeof sl.type !== 'function') {
          result.other.push(sl);
        } else {
          result.slides.push(sl);
        }

        return result;
      }, { slides: [], other: [] });

      var other = elements.other,
          slides = elements.slides;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { ref: function ref(node) {
            return _this6.node = node;
          }, className: 'Fullpage' },
        children,
        other.map(function (o, i) {
          var op = o.props || {};
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', _extends({ key: i }, op));
        }),
        slides.map(function (sl, i) {
          var sp = sl.props || {};
          var children = sp.children;

          if (sp.slides) {
            var name = sp.name;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4__horizontalSlider__["a" /* default */],
              _extends({ cache: _this6.cacheHslide.bind(_this6), window: window, document: document, activeSlide: s[name].activeSlide, hideScrollBars: p.hideScrollBars }, sp, { key: i }),
              children
            );
          }

          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3__slide__["a" /* default */],
            _extends({ render: true, className: sp.className || '', id: sp.id, window: window, document: document, key: i }, sp),
            children
          );
        })
      );
    }
  }], [{
    key: 'changeHorizontalSlide',
    value: function changeHorizontalSlide(name, next) {
      next = +next;

      var comp = _fp.hSlideCache[name];
      if (!comp) {
        throw Error('cannt find HorizontalSlider by name', name);
      }

      var node = comp.node,
          props = comp.props;
      var infinite = props.infinite;

      var eligible = isElibile(next, props, _fp.state);

      if (!eligible) {
        return;
      }

      var activeSlide = _fp.state[name].activeSlide;


      var nodes = getNodes(_fp.state.document, 'data-horizontal-slider="' + name + '"');
      var leftVal = activeSlide * innerWidth;
      var to = next * innerWidth;

      // TODO: NOW IMPLEMENT THIS ON BUTTON CLICKS DOWN LOW
      var result = _fp.determineHSlide.call(_fp, comp, activeSlide, next, leftVal, to, nodes);

      leftVal = result.leftVal;
      next = result.next;
      to = result.to;

      var newState = _defineProperty({}, name, {
        activeSlide: next,
        lastActive: activeSlide
      });

      _fp.handleHorizontal.call(_fp, name, node, nodes, leftVal, to, next, newState, infinite);
    }
  }, {
    key: 'changeFullpageSlide',
    value: function changeFullpageSlide(idx) {
      var t = _fp;
      var props = t.props,
          state = t.state;
      var activeSlide = state.activeSlide,
          window = state.window,
          document = state.document;


      var eligible = isElibile(idx, props, state);

      if (!eligible) {
        return;
      }

      var newState = {
        activeSlide: idx,
        lastActive: activeSlide
      };

      var to = idx * window.innerHeight;

      t.setState({ scrollPending: true }, function () {
        t.handleScroll(t.verticalRoot, 'scrollTop', to, newState, t.name);
      });
    }
  }]);

  return Fullpage;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

function swap(nodes, o, i) {
  nodes[o || i].parentNode.insertBefore(nodes[i], nodes[o]);
  return nodes;
}

function lastToFirst(nodes) {
  swap(nodes, 0, nodes.length - 1);
}

function firstToLast(nodes) {
  swap(nodes, null, nodes.length - 1);
}

function isElibile(idx, props, state) {
  var slides = props.slides;
  var activeSlide = state.activeSlide;


  if (state.scrollPending) {
    return false;
  }

  if (props.infinite) {
    return true;
  }

  if (idx > slides.length - 1 || idx < 0) {
    return false;
  }

  if (idx == activeSlide) {
    return false;
  }

  return true;
}

function ssStub() {
  return {
    flush: noOp,
    killAll: noOp,
    listen: noOp
  };
}

function determineVerticalRoot() {
  var agent = void 0;

  if (typeof navigator !== 'undefined' && navigator) {
    agent = navigator.userAgent;
  }

  if (!agent) {
    return document.body;
  }

  var browser = __WEBPACK_IMPORTED_MODULE_2__utils_index_js__["i" /* detectBrowser */](agent);

  if (!browser) {
    return document.body;
  }

  var name = browser.name,
      version = browser.version,
      os = browser.os;

  var _version$split = version.split('.'),
      _version$split2 = _slicedToArray(_version$split, 3),
      major = _version$split2[0],
      minor = _version$split2[1],
      patch = _version$split2[2];

  var docElementSet = new Set(['firefox', 'chrome']);

  if (docElementSet.has(name)) {
    return document.documentElement;
  }

  // safari, etc
  return document.body;
}
/* harmony default export */ __webpack_exports__["a"] = (Fullpage);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_fullpage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_slide__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_horizontalSlider__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Fullpage", function() { return __WEBPACK_IMPORTED_MODULE_0__components_fullpage__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Slide", function() { return __WEBPACK_IMPORTED_MODULE_1__components_slide__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalSlider", function() { return __WEBPACK_IMPORTED_MODULE_2__components_horizontalSlider__["a"]; });






/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INCREMENT", function() { return INCREMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECREMENT", function() { return DECREMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERTICAL", function() { return VERTICAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HORIZONTAL", function() { return HORIZONTAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I_BLOCK", function() { return I_BLOCK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEAD", function() { return HEAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TAIL", function() { return TAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLOCK", function() { return BLOCK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NONE", function() { return NONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noOp", function() { return noOp; });
var INCREMENT = 'INCREMENT';
var DECREMENT = 'DECREMENT';
var VERTICAL = 'VERTICAL';
var HORIZONTAL = 'HORIZONTAL';
var HEAD = 'HEAD';
var TAIL = 'TAIL';
var I_BLOCK = 'inline-block';
var BLOCK = 'block';
var NONE = 'none';
var noOp = function noOp() {};



/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function detectOS(userAgentString) {
    var operatingSystems = [{
        name: 'iOS',
        rule: /iP(hone|od|ad)/
    }, {
        name: 'Android OS',
        rule: /Android/
    }, {
        name: 'BlackBerry OS',
        rule: /BlackBerry|BB10/
    }, {
        name: 'Windows Mobile',
        rule: /IEMobile/
    }, {
        name: 'Amazon OS',
        rule: /Kindle/
    }, {
        name: 'Windows 3.11',
        rule: /Win16/
    }, {
        name: 'Windows 95',
        rule: /(Windows 95)|(Win95)|(Windows_95)/
    }, {
        name: 'Windows 98',
        rule: /(Windows 98)|(Win98)/
    }, {
        name: 'Windows 2000',
        rule: /(Windows NT 5.0)|(Windows 2000)/
    }, {
        name: 'Windows XP',
        rule: /(Windows NT 5.1)|(Windows XP)/
    }, {
        name: 'Windows Server 2003',
        rule: /(Windows NT 5.2)/
    }, {
        name: 'Windows Vista',
        rule: /(Windows NT 6.0)/
    }, {
        name: 'Windows 7',
        rule: /(Windows NT 6.1)/
    }, {
        name: 'Windows 8',
        rule: /(Windows NT 6.2)/
    }, {
        name: 'Windows 8.1',
        rule: /(Windows NT 6.3)/
    }, {
        name: 'Windows 10',
        rule: /(Windows NT 10.0)/
    }, {
        name: 'Windows ME',
        rule: /Windows ME/
    }, {
        name: 'Open BSD',
        rule: /OpenBSD/
    }, {
        name: 'Sun OS',
        rule: /SunOS/
    }, {
        name: 'Linux',
        rule: /(Linux)|(X11)/
    }, {
        name: 'Mac OS',
        rule: /(Mac_PowerPC)|(Macintosh)/
    }, {
        name: 'QNX',
        rule: /QNX/
    }, {
        name: 'BeOS',
        rule: /BeOS/
    }, {
        name: 'OS/2',
        rule: /OS\/2/
    }, {
        name: 'Search Bot',
        rule: /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/
    }];

    var detected = operatingSystems.filter(function (os) {
        if (userAgentString.match(os.rule)) {
            return true;
        }
    });

    return detected && detected[0] ? detected[0].name : null;
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_IDX", function() { return KEY_IDX; });
var KEY_IDX = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN'
};



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function scrollTo(element, elementBoundary, to, duration, callback) {
  var start = element[elementBoundary],
      change = to - start,
      increment = 10;

  var currentTime = 0;
  var globalId = requestAnimationFrame(repeatOften);
  function repeatOften() {
    currentTime += increment;
    var val = easeInOutQuad(currentTime, start, change, duration);
    element[elementBoundary] = val;

    if (currentTime >= duration) {
      cancelAnimationFrame(globalId);
      return callback();
    }
    globalId = requestAnimationFrame(repeatOften);
  }
}

//t = current time
//b = start value
//c = change in value
//d = duration
function easeInOutQuad(t, b, c, d) {
  t /= d;
  return -c * t * (t - 2) + b;
}

/* harmony default export */ __webpack_exports__["a"] = (scrollTo);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ScrollSwipe = factory();
  }
}(this, function() {
'use strict';

var VERTICAL = 'VERTICAL';
var HORIZONTAL = 'HORIZONTAL';

var noOp = function noOp() {};

var acceptedParams = {
  target: true,
  scrollSensitivity: true,
  touchSensitivity: true,
  scrollCb: true,
  touchCb: true,
  scrollPreventDefault: true,
  touchPreventDefault: true
};

if (true) {
  module.exports = ScrollSwipe;
}

function ScrollSwipe(opts) {
  var _this = this;

  Object.keys(opts).forEach(function (key) {
    if (acceptedParams[key]) {
      _this[key] = opts[key];
      return;
    }

    throw new Error('unknown options for ScrollSwipe: ' + key);
  });

  if (!opts.target) {
    throw new Error('must provide DOM target element to ScrollSwipe');
  }

  if (!this.scrollSensitivity || this.scrollSensitivity < 0) {
    this.scrollSensitivity = 0;
  }

  if (!this.touchSensitivity || this.touchSensitivity < 0) {
    this.touchSensitivity = 0;
  }

  this.startTouchEvent = null;
  this.latestTouchEvent = null;
  this.latestTouch = null;

  this.startScrollEvent = null;
  this.latestScrollEvent = null;
  this.latestScroll = null;

  this.intent = 0;
  this.currentDirection = VERTICAL;
  this.touchArr = [];
  this.xArr = [];
  this.yArr = [];
  this.touchArrX = [];
  this.touchArrY = [];

  this.scrollPending = false;

  if (this.target.style) {
    this.target.style.touchAction = 'none';
  }

  //these should only init if true
  if (this.scrollCb) {
    this.initScroll();
  }

  if (this.touchCb) {
    this.initTouch();
  }

  return this;
}

ScrollSwipe.prototype.listen = function listen() {
  this.flush();
  this.scrollPending = false;
  return this;
};

ScrollSwipe.prototype.onWheel = function onWheel(e) {
  var _this2 = this;

  if (this.scrollPreventDefault) {
    e.preventDefault();
  }

  if (this.scrollPending) {
    return;
  }

  this.startScrollEvent = e;

  var x = e.deltaX;
  var y = e.deltaY;

  this.addXScroll(x);
  this.addYScroll(y);

  this.scrollFulfilled(function (fulfilled, direction, intent) {
    if (!fulfilled) {
      return;
    }

    _this2.latestScrollEvent = e;

    var result = {
      startEvent: e,
      lastEvent: _this2.latestScrollEvent,
      scrollPending: _this2.scrollPending,
      direction: direction,
      intent: intent
    };

    _this2.scrollCb(result);
  });
};

ScrollSwipe.prototype.initScroll = function initScroll() {
  this.newOnWheel = this.onWheel.bind(this);
  this.target.addEventListener('wheel', this.newOnWheel, false);
  return this;
};

ScrollSwipe.prototype.touchMove = function touchMove(e) {
  if (this.touchPreventDefault) {
    e.preventDefault();
  }

  var changedTouches = e.changedTouches[0];
  var x = changedTouches.clientX;
  var y = changedTouches.clientY;

  this.startTouchEvent = e;
  this.addXTouch(x);
  this.addYTouch(y);
};

ScrollSwipe.prototype.touchEnd = function touchEnd(e) {
  var _this3 = this;

  this.touchFulfilled(e, function (fulfilled, direction, intent) {
    if (!fulfilled) {
      return;
    }

    var result = {
      startEvent: _this3.startTouchEvent,
      lastEvent: _this3.latestTouchEvent,
      scrollPending: _this3.scrollPending,
      direction: direction,
      intent: intent
    };

    _this3.touchCb(result);
  });
};

ScrollSwipe.prototype.initTouch = function initTouch() {
  this.newTouchMove = this.touchMove.bind(this);
  this.newTouchEnd = this.touchEnd.bind(this);
  this.target.addEventListener('touchmove', this.newTouchMove, false);
  this.target.addEventListener('touchend', this.newTouchEnd, false);
  return this;
};

//touch events
ScrollSwipe.prototype.touchFulfilled = function touchFulfilled(e, cb) {
  if (!e) {
    throw new Error('must provide event to touchFulfilled');
  }

  if (!cb) {
    throw new Error('must provide callback to touchFulfilled');
  }

  var touchSensitivity = this.touchSensitivity,
      touchArrX = this.touchArrX,
      touchArrY = this.touchArrY;


  var bool = touchArrX.length > touchSensitivity && touchArrY.length > touchSensitivity;

  if (!bool) {
    return cb(false, null);
  }

  var changedTouches = e.changedTouches[0];

  var xStart = touchArrX[0];
  var yStart = touchArrY[0];

  var xEnd = changedTouches.clientX;
  var yEnd = changedTouches.clientY;

  var xIntent = xStart < xEnd ? 0 : 1;
  var yIntent = yStart < yEnd ? 0 : 1;

  var direction = VERTICAL;

  //determine vertical or horizontal based on the greatest difference
  if (Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd)) {
    direction = HORIZONTAL;
  }

  var intent = direction === VERTICAL ? yIntent : xIntent;

  swap.call(this, intent, direction);
  this.resetTouches();
  this.scrollPending = true;
  this.latestTouchEvent = e;

  cb(this.scrollPending, this.currentDirection, this.currentIntent);
  return this;
};

ScrollSwipe.prototype.getTouch = function getTouch(idx) {
  return this.touchArr[idx];
};

ScrollSwipe.prototype.addXTouch = function addTouch(touch) {
  if (this.pending()) {
    return this;
  }

  this.latestTouch = touch;
  this.touchArrX.push(touch);
  return this;
};

ScrollSwipe.prototype.addYTouch = function addTouch(touch) {
  if (this.pending()) {
    return this;
  }

  this.latestTouch = touch;
  this.touchArrY.push(touch);
  return this;
};

ScrollSwipe.prototype.resetTouches = function resetTouches() {
  this.touchArrX = [];
  this.touchArrY = [];
  return this;
};

//wheel events
ScrollSwipe.prototype.addXScroll = function addXScroll(s) {
  if (this.pending()) {
    return this;
  }

  this.latestScroll = s;
  this.xArr.push(s);
  return this;
};

ScrollSwipe.prototype.addYScroll = function addYScroll(s) {
  if (this.pending()) {
    return this;
  }

  this.latestScroll = s;
  this.yArr.push(s);
  return this;
};

ScrollSwipe.prototype.getDirection = function getDirection() {
  return this.currentDirection;
};

ScrollSwipe.prototype.resetScroll = function resetScroll() {
  this.xArr = [];
  this.yArr = [];
  return this;
};

ScrollSwipe.prototype.flush = function flush() {
  this.resetScroll();
  this.resetTouches();
  return this;
};

ScrollSwipe.prototype.scrollFulfilled = function scrollFulfilled(cb) {
  if (!cb) {
    throw new Error('must provide callback to scrollFulfilled');
  }

  var xArr = this.xArr,
      yArr = this.yArr,
      scrollSensitivity = this.scrollSensitivity;


  var bool = xArr.length > scrollSensitivity && yArr.length > scrollSensitivity;

  var _evalScrollDirection = this.evalScrollDirection(),
      direction = _evalScrollDirection.direction,
      intent = _evalScrollDirection.intent;

  if (bool) {
    swap.call(this, intent, direction);
    this.resetScroll();
    this.scrollPending = true;
  }

  cb(this.scrollPending, this.currentDirection, this.currentIntent);
  return this;
};

ScrollSwipe.prototype.evalScrollDirection = function evalScrollDirection() {
  var _getSums = this.getSums(),
      x = _getSums.x,
      y = _getSums.y,
      xIntent = _getSums.xIntent,
      yIntent = _getSums.yIntent;

  var direction = x > y ? HORIZONTAL : VERTICAL;
  var base = direction === VERTICAL ? yIntent : xIntent;

  var intent = 0;

  if (base > 0) {
    intent = 1;
  }

  return { direction: direction, intent: intent };
};

ScrollSwipe.prototype.getSums = function getSums() {
  var xArr = this.xArr,
      yArr = this.yArr;


  var xIntent = 0;
  var yIntent = 0;

  var x = xArr.reduce(function (result, curr) {
    xIntent = xIntent + curr;
    return result += Math.abs(curr);
  }, 0);

  var y = yArr.reduce(function (result, curr) {
    yIntent = yIntent + curr;
    return result += Math.abs(curr);
  }, 0);

  return { x: x, y: y, xIntent: xIntent, yIntent: yIntent };
};

ScrollSwipe.prototype.getScrollDirection = function getScrollDirection() {
  return this.currentDirection;
};

ScrollSwipe.prototype.pending = function pending() {
  return this.scrollPending;
};

ScrollSwipe.prototype.killScroll = function killScroll() {
  this.target.removeEventListener('wheel', this.newOnWheel, false);
  return this;
};

ScrollSwipe.prototype.killTouch = function killTouch() {
  this.target.removeEventListener('touchmove', this.newTouchMove, false);
  this.target.removeEventListener('touchend', this.newTouchEnd, false);
  return this;
};

ScrollSwipe.prototype.killAll = function teardown() {
  this.killScroll().killTouch();
  return this;
};

function swap(intent, direction) {
  this.previousIntent = this.currentIntent;
  this.currentIntent = intent;
  this.previousDirection = this.currentDirection;
  this.currentDirection = direction;
}
return ScrollSwipe;
}));


/***/ })
/******/ ]);
});
//# sourceMappingURL=FullpageReact.js.map