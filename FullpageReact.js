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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


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
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var HorizontalSlide = 'HorizontalSlide';
var VerticalSlide = 'VerticalSlide';

var Slide = function Slide(_ref) {
  var id = _ref.id,
      render = _ref.render,
      className = _ref.className,
      width = _ref.width,
      height = _ref.height,
      horizontal = _ref.horizontal,
      horizontalSliderName = _ref.horizontalSliderName,
      children = _ref.children,
      style = _ref.style;

  if (!render) {
    return null;
  }

  var slideStyle = style || {};

  var styles = Object.assign({
    overflow: 'hidden', width: width + 'px', height: height + 'px', position: 'relative'
  }, slideStyle);

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
    _extends({ className: slideClassName, id: id }, attrs, { style: styles }),
    children
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Slide);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Slide__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(7);
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
          height = p.height,
          width = p.width,
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


      var attrs = {
        'data-slide': 'HorizontalSlider',
        'data-name': name
      };

      var className = (p.className || '') + 'HorizontalSlider';
      var overflowX = p.hideScrollBars ? 'hidden' : 'auto';

      var horizontalSliderStyle = Object.assign({}, p.style, { height: height + 'px', width: width + 'px', position: 'relative', overflowX: overflowX, whiteSpace: 'nowrap', padding: '0px', margin: '0' });
      var horizontalSlideStyle = { overflow: 'hidden', whiteSpace: 'normal', display: 'inline-block' };

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
            __WEBPACK_IMPORTED_MODULE_1__Slide__["a" /* default */],
            _extends({ render: true, key: i, horizontalSliderName: name, slide: s, id: hSlideProps.id, className: hSlideProps.className || '', height: height, width: width, horizontal: true, style: sStyle }, hSlideProps),
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return composedPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return showAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hideAllButActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return INTENT_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return detectBrowser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderUtils__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scrollTo__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detectOS_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detectOS_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__detectOS_js__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__constants__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__renderUtils__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__scrollTo__["a"]; });





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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(3);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_scroll_swipe__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_scroll_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_scroll_swipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_window_or_global__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_window_or_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_window_or_global__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_fns__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Slide__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__HorizontalSlider__ = __webpack_require__(6);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var noOp = __WEBPACK_IMPORTED_MODULE_4__utils__["c" /* constants */].noOp;
var KEY_IDX = __WEBPACK_IMPORTED_MODULE_4__utils__["d" /* renderUtils */].KEY_IDX;


var _fp = {};
var global = {};

var TIMEOUT = 200;

var documentStub = function documentStub() {
  var style = {};
  return {
    querySelectorAll: function querySelectorAll() {
      return [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', null)];
    },
    documentElement: {
      style: style
    },
    body: {
      style: style
    }
  };
};

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

    global.window = __WEBPACK_IMPORTED_MODULE_2_window_or_global___default.a;
    global.document = global.window.document || documentStub();

    if (p.infinite && p.resetSlides) {
      throw new Error('Fullpage Component cannot have both infinite and resetSlides as truthy props');
    }

    var slides = p.slides;


    if (!slides || !slides.length) {
      throw new Error('Please provide slides for Fullpage');
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

    var _p$activeSlide = p.activeSlide,
        activeSlide = _p$activeSlide === undefined ? 0 : _p$activeSlide,
        scrollSensitivity = p.scrollSensitivity,
        touchSensitivity = p.touchSensitivity,
        _p$scrollSpeed = p.scrollSpeed,
        scrollSpeed = _p$scrollSpeed === undefined ? 500 : _p$scrollSpeed;


    _this.name = 'Fullpage';
    _this.scrollSensitivity = scrollSensitivity;
    _this.touchSensitivity = touchSensitivity;
    _this.scrollSpeed = scrollSpeed;

    _this.node = null;
    _this.ss = null;
    _this.verticalRoot = determineVerticalRoot();

    _this.onHorizontalChange = p.onHorizontalChange || noOp;
    _this.onSlideChangeStart = p.onSlideChangeStart || noOp;
    _this.onSlideChangeEnd = p.onSlideChangeEnd || noOp;

    ['onScrollAction', 'onVerticalScroll', 'onHorizontalScroll', 'lockScroll', 'handleScroll', 'checkKey'].forEach(function (f) {
      return _this[f] = _this[f].bind(_this);
    });

    _this.isLocked = false;
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

      this.hideScrollBars();

      this.window = global.window;
      this.document = global.document;

      this.setState({
        window: global.window,
        document: global.document
      }, function () {
        _this2.lockScroll();
      });
    }
  }, {
    key: 'hideScrollBars',
    value: function hideScrollBars() {
      var hideScrollBars = this.props.hideScrollBars;


      if (!hideScrollBars) {
        return;
      }

      var document = global.document;

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  }, {
    key: 'showScrollBars',
    value: function showScrollBars() {
      var document = global.document;

      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }, {
    key: 'lockScroll',
    value: function lockScroll() {
      var node = this.node,
          checkKey = this.checkKey;
      var enableArrowKeys = this.props.enableArrowKeys;


      if (enableArrowKeys) {
        window.addEventListener('keydown', checkKey.bind(this));
      }

      var ss = new __WEBPACK_IMPORTED_MODULE_1_scroll_swipe___default.a({
        target: node,
        scrollSensitivity: this.scrollSensitivity,
        touchSensitivity: this.touchSensitivity,
        scrollPreventDefault: true,
        touchPreventDefault: true,
        scrollCb: this.onScrollAction,
        touchCb: this.onScrollAction
      });
      this.ss = ss;
      this.isLocked = true;
    }
  }, {
    key: 'onScrollAction',
    value: function onScrollAction(_ref) {
      var direction = _ref.direction,
          intent = _ref.intent,
          startEvent = _ref.startEvent;

      var s = this.state;
      var _ss = this.ss,
          ss = _ss === undefined ? ssStub() : _ss;


      if (s.scrollPending) {
        ss.flush();
        return ss.listen();
      }

      var dir = __WEBPACK_IMPORTED_MODULE_4__utils__["e" /* INTENT_MAP */][direction];

      // at this point we are dedicating
      if (direction === 'VERTICAL') {
        return this.onVerticalScroll(dir[intent], startEvent);
      }

      var path = startEvent.path || startEvent.composedPath();

      if (!path) {
        var polyFillPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["f" /* composedPath */])(startEvent.target);
        path = polyFillPath;
      }

      var isHorizontal = path.find(function (p) {
        if (!p.dataset) {
          return false;
        }

        return p.dataset.slide === 'HorizontalSlider';
      });

      if (!isHorizontal) {
        ss.flush();
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
          activeSlide = s.activeSlide;
      var slides = this.props.slides;


      var next = intent === 'DOWN' ? activeSlide + 1 : activeSlide - 1;
      if (next < 0 || next > slides.length - 1) {
        var _ss2 = this.ss,
            ss = _ss2 === undefined ? ssStub() : _ss2;

        ss.flush();
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
      var _ss3 = this.ss,
          ss = _ss3 === undefined ? ssStub() : _ss3;


      var comp = _fp.hSlideCache[name];
      var hp = comp.props;
      var infinite = hp.infinite;


      var nodes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* getNodes */])(this.state.document, 'data-horizontal-slider="' + name + '"');

      var leftVal = activeSlide * innerWidth;
      var to = next * innerWidth;

      var result = this.determineHSlide(comp, activeSlide, next, leftVal, to, nodes);

      if (!result) {
        setTimeout(function () {
          ss.flush();
          ss.listen();
        }, TIMEOUT);
        return;
      }

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


      var len = nodes.length;

      var infStart = activeSlide === 0 && next === -1;
      var infEnd = activeSlide === len - 1 && next === len;

      if (!infinite && !resetSlides && (infStart || infEnd)) {
        return null;
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

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["g" /* showAll */])(nodes);
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
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* hideAllButActive */])(next, nodes);
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

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["h" /* scrollTo */])(node, winProp, to, this.scrollSpeed, function () {
        newState.scrollPending = false;
        _this5.setState(newState, function () {
          cb();
          _this5.onSlideChangeEnd(compName, _this5.props, _this5.state, newState[compName] || newState);
          setTimeout(function () {
            ss.flush();
            ss.listen();
          }, TIMEOUT);
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


      if (this.props.enableArrowKeys) {
        window.removeEventListener('keydown', this.checkKey);
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
          document = s.document,
          activeSlide = s.activeSlide;


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

      // TODO: sub other for children

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_fns__["a" /* WindowSize */], {
        render: function render(_ref2) {
          var width = _ref2.width,
              height = _ref2.height;


          var to = activeSlide * height;
          setTimeout(function () {
            _this6.verticalRoot.scrollTop = to;
          }, 0);

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
                  __WEBPACK_IMPORTED_MODULE_6__HorizontalSlider__["a" /* default */],
                  _extends({ cache: _this6.cacheHslide.bind(_this6), width: width, height: height, window: window, document: document, activeSlide: s[name].activeSlide, hideScrollBars: p.hideScrollBars }, sp, { key: i }),
                  children
                );
              }

              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_5__Slide__["a" /* default */],
                _extends({ render: true, className: sp.className || '', id: sp.id, width: width, height: height, key: i }, sp),
                children
              );
            })
          );
        }
      });
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


      var nodes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* getNodes */])(_fp.state.document, 'data-horizontal-slider="' + name + '"');
      var leftVal = activeSlide * innerWidth;
      var to = next * innerWidth;

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
      var _fp2 = _fp,
          props = _fp2.props,
          state = _fp2.state,
          name = _fp2.name,
          verticalRoot = _fp2.verticalRoot;
      var activeSlide = state.activeSlide,
          window = state.window;


      var eligible = isElibile(idx, props, state);

      if (!eligible) {
        return;
      }

      var newState = {
        activeSlide: idx,
        lastActive: activeSlide
      };

      var to = idx * window.innerHeight;

      _fp.setState({ scrollPending: true }, function () {
        _fp.onSlideChangeStart(name, props, state, newState);
        _fp.handleScroll(verticalRoot, 'scrollTop', to, newState, name);
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

  var document = global.document;


  if (typeof navigator !== 'undefined' && navigator) {
    agent = navigator.userAgent;
  }

  if (!agent) {
    return document.body;
  }

  var browser = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["i" /* detectBrowser */])(agent);

  if (!browser) {
    return document.body;
  }

  // NOTE: various browsers and devTools handle this differently as the userAgent source of truth
  // To get the root scrollable element we have to play around with OS and browser to find the right
  // root to return. If need be we can be specific about version

  var name = browser.name,
      version = browser.version,
      os = browser.os;

  var _version$split = version.split('.'),
      _version$split2 = _slicedToArray(_version$split, 3),
      major = _version$split2[0],
      minor = _version$split2[1],
      patch = _version$split2[2];

  var docElementSet = new Set(['firefox', 'chrome', 'crios' // chrome ios
  ]);

  if (docElementSet.has(name)) {
    return document.documentElement;
  }

  // safari, etc
  return document.body;
}
/* harmony default export */ __webpack_exports__["a"] = (Fullpage);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Fullpage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Slide__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_HorizontalSlider__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Fullpage", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Fullpage__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Slide", function() { return __WEBPACK_IMPORTED_MODULE_1__components_Slide__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalSlider", function() { return __WEBPACK_IMPORTED_MODULE_2__components_HorizontalSlider__["a"]; });






/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d;
  return -c * t * (t - 2) + b;
};

/* harmony default export */ __webpack_exports__["a"] = (scrollTo);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var camel2hyphen = __webpack_require__(25);

var isDimension = function (feature) {
  var re = /[height|width]$/;
  return re.test(feature);
};

var obj2mq = function (obj) {
  var mq = '';
  var features = Object.keys(obj);
  features.forEach(function (feature, index) {
    var value = obj[feature];
    feature = camel2hyphen(feature);
    // Add px to dimension features
    if (isDimension(feature) && typeof value === 'number') {
      value = value + 'px';
    }
    if (value === true) {
      mq += feature;
    } else if (value === false) {
      mq += 'not ' + feature;
    } else {
      mq += '(' + feature + ': ' + value + ')';
    }
    if (index < features.length-1) {
      mq += ' and '
    }
  });
  return mq;
};

var json2mq = function (query) {
  var mq = '';
  if (typeof query === 'string') {
    return query;
  }
  // Handling array of media queries
  if (query instanceof Array) {
    query.forEach(function (q, index) {
      mq += obj2mq(q);
      if (index < query.length-1) {
        mq += ', '
      }
    });
    return mq;
  }
  // Handling single media query
  return obj2mq(query);
};

module.exports = json2mq;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(4);
  var warning = __webpack_require__(8);
  var ReactPropTypesSecret = __webpack_require__(5);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(3);
var invariant = __webpack_require__(4);
var ReactPropTypesSecret = __webpack_require__(5);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(3);
var invariant = __webpack_require__(4);
var warning = __webpack_require__(8);
var assign = __webpack_require__(16);

var ReactPropTypesSecret = __webpack_require__(5);
var checkPropTypes = __webpack_require__(17);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(19)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(18)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Scroll */
/* unused harmony export withScroll */
/* unused harmony export DeviceMotion */
/* unused harmony export withDeviceMotion */
/* unused harmony export DeviceOrientation */
/* unused harmony export withDeviceOrientation */
/* unused harmony export Network */
/* unused harmony export withNetwork */
/* unused harmony export GeoPosition */
/* unused harmony export withGeoPosition */
/* unused harmony export Media */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowSize; });
/* unused harmony export withWindowSize */
/* unused harmony export Locales */
/* unused harmony export withLocales */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var isEmptyChildren = function (children) {
    return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].count(children) === 0;
};

function throttle(func, wait) {
    var timeout = null;
    var callbackArgs = null;
    var context = this;
    var later = function () {
        func.apply(context, callbackArgs);
        timeout = null;
    };
    return function () {
        if (!timeout) {
            callbackArgs = arguments;
            timeout = setTimeout(later, wait);
        }
    };
}

var supportsPassiveListener = false;
var noop = function () { };
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassiveListener = true;
        },
    });
    window.addEventListener('testPassive', noop, opts);
    window.removeEventListener('testPassive', noop, opts);
}
catch (e) { }

var Scroll = (function (_super) {
    __extends(Scroll, _super);
    function Scroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { x: 0, y: 0 };
        _this.handleWindowScroll = throttle(function () {
            _this.setState({ x: window.scrollX, y: window.scrollY });
        }, _this.props.throttle);
        return _this;
    }
    Scroll.prototype.componentDidMount = function () {
        this.handleWindowScroll();
        window.addEventListener('scroll', this.handleWindowScroll, supportsPassiveListener ? { passive: true } : false);
    };
    Scroll.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.handleWindowScroll);
    };
    Scroll.prototype.render = function () {
        var _a = this.props, render = _a.render, component = _a.component, children = _a.children;
        return component
            ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, this.state)
            : render
                ? render(this.state)
                : children
                    ? typeof children === 'function'
                        ? children(this.state)
                        : !isEmptyChildren(children) ? __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(children) : null
                    : null;
    };
    Scroll.defaultProps = {
        throttle: 100,
    };
    return Scroll;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true,
};
var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true,
};
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);
var getOwnPropertyNames = Object.getOwnPropertyNames;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] &&
                !KNOWN_STATICS[key] &&
                (!blacklist || !blacklist[key])) {
                if (propIsEnumerable.call(sourceComponent, key) ||
                    typeof sourceComponent[key] === 'function') {
                    try {
                        targetComponent[key] = sourceComponent[key];
                    }
                    catch (e) { }
                }
            }
        }
        return targetComponent;
    }
    return targetComponent;
}

function withScroll(Component$$1) {
    var S = function (props) {
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Scroll, { render: function (p) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Component$$1, __assign({}, props, p)); } }));
    };
    return hoistNonReactStatics(S, Component$$1);
}

var DeviceMotion = (function (_super) {
    __extends(DeviceMotion, _super);
    function DeviceMotion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            acceleration: {
                x: null,
                y: null,
                z: null,
            },
            accelerationIncludingGravity: {
                x: null,
                y: null,
                z: null,
            },
            rotationRate: {
                alpha: null,
                beta: null,
                gamma: null,
            },
            interval: 0,
        };
        _this.handleDeviceMotion = function (e) {
            _this.setState({
                acceleration: e.acceleration,
                accelerationIncludingGravity: e.accelerationIncludingGravity,
                rotationRate: e.rotationRate,
                interval: e.interval,
            });
        };
        return _this;
    }
    DeviceMotion.prototype.componentDidMount = function () {
        window.addEventListener('devicemotion', this.handleDeviceMotion, true);
    };
    DeviceMotion.prototype.componentWillUnmount = function () {
        window.removeEventListener('devicemotion', this.handleDeviceMotion);
    };
    DeviceMotion.prototype.render = function () {
        var _a = this.props, render = _a.render, component = _a.component, children = _a.children;
        return component
            ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, this.state)
            : render
                ? render(this.state)
                : children
                    ? typeof children === 'function'
                        ? children(this.state)
                        : !isEmptyChildren(children) ? __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(children) : null
                    : null;
    };
    return DeviceMotion;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

function withDeviceMotion(Component$$1) {
    var S = function (props) {
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(DeviceMotion, { render: function (p) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Component$$1, __assign({}, props, p)); } }));
    };
    return hoistNonReactStatics(S, Component$$1);
}

var DeviceOrientation = (function (_super) {
    __extends(DeviceOrientation, _super);
    function DeviceOrientation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            alpha: null,
            beta: null,
            gamma: null,
            absolute: false,
        };
        _this.handleDeviceOrientation = function (e) {
            _this.setState({
                beta: e.beta,
                alpha: e.alpha,
                gamma: e.gamma,
                absolute: e.absolute,
            });
        };
        return _this;
    }
    DeviceOrientation.prototype.componentDidMount = function () {
        window.addEventListener('deviceorientation', this.handleDeviceOrientation, true);
    };
    DeviceOrientation.prototype.componentWillUnmount = function () {
        window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
    };
    DeviceOrientation.prototype.render = function () {
        var _a = this.props, render = _a.render, component = _a.component, children = _a.children;
        return component
            ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, this.state)
            : render
                ? render(this.state)
                : children
                    ? typeof children === 'function'
                        ? children(this.state)
                        : !isEmptyChildren(children) ? __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(children) : null
                    : null;
    };
    return DeviceOrientation;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

function withDeviceOrientation(Component$$1) {
    var S = function (props) {
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(DeviceOrientation, { render: function (p) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Component$$1, __assign({}, props, p)); } }));
    };
    return hoistNonReactStatics(S, Component$$1);
}

var Network = (function (_super) {
    __extends(Network, _super);
    function Network() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { online: false };
        _this.handleOnline = function () {
            _this.setState({ online: true, offlineAt: undefined });
        };
        _this.handleOffline = function () {
            _this.setState({ online: false, offlineAt: new Date() });
        };
        return _this;
    }
    Network.prototype.componentDidMount = function () {
        window.addEventListener('online', this.handleOnline);
        window.addEventListener('offline', this.handleOffline);
    };
    Network.prototype.componentWillUnmount = function () {
        window.removeEventListener('online', this.handleOnline);
        window.removeEventListener('offline', this.handleOffline);
    };
    Network.prototype.render = function () {
        var _a = this.props, render = _a.render, component = _a.component, children = _a.children;
        return component
            ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, this.state)
            : render
                ? render(this.state)
                : children
                    ? typeof children === 'function'
                        ? children(this.state)
                        : !isEmptyChildren(children) ? __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(children) : null
                    : null;
    };
    return Network;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

function withNetwork(Component$$1) {
    var S = function (props) {
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Network, { render: function (p) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Component$$1, __assign({}, props, p)); } }));
    };
    return hoistNonReactStatics(S, Component$$1);
}

var GeoPosition = (function (_super) {
    __extends(GeoPosition, _super);
    function GeoPosition() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isLoading: true,
        };
        _this.requestGeo = function () {
            _this.setState({ isLoading: true });
            _this.geoId = navigator.geolocation.watchPosition(function (position) {
                return _this.setState({
                    isLoading: false,
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    error: undefined,
                });
            }, function (error) { return _this.setState({ error: error, isLoading: false }); });
        };
        return _this;
    }
    GeoPosition.prototype.componentDidMount = function () {
        this.requestGeo();
    };
    GeoPosition.prototype.componentWillUnmount = function () {
        navigator.geolocation.clearWatch(this.geoId);
    };
    GeoPosition.prototype.render = function () {
        var _a = this.props, render = _a.render, component = _a.component, children = _a.children;
        return component
            ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, this.state)
            : render
                ? render(this.state)
                : children
                    ? typeof children === 'function'
                        ? children(this.state)
                        : !isEmptyChildren(children) ? __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(children) : null
                    : null;
    };
    return GeoPosition;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

function withGeoPosition(Component$$1) {
    var S = function (props) {
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(GeoPosition, { render: function (p) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Component$$1, __assign({}, props, p)); } }));
    };
    return hoistNonReactStatics(S, Component$$1);
}

var M = __webpack_require__(23);
var Media = M;

var WindowSize = (function (_super) {
    __extends(WindowSize, _super);
    function WindowSize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { width: 0, height: 0 };
        _this.handleWindowSize = throttle(function () {
            _this.setState({ width: window.innerWidth, height: window.innerHeight });
        }, _this.props.throttle);
        return _this;
    }
    WindowSize.prototype.componentDidMount = function () {
        this.handleWindowSize();
        window.addEventListener('resize', this.handleWindowSize);
    };
    WindowSize.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.handleWindowSize);
    };
    WindowSize.prototype.render = function () {
        var _a = this.props, render = _a.render, component = _a.component, children = _a.children;
        return component
            ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, this.state)
            : render
                ? render(this.state)
                : children
                    ? typeof children === 'function'
                        ? children(this.state)
                        : !isEmptyChildren(children) ? __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(children) : null
                    : null;
    };
    WindowSize.defaultProps = {
        throttle: 100,
    };
    return WindowSize;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

function withWindowSize(Component$$1) {
    var S = function (props) {
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(WindowSize, { render: function (p) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Component$$1, __assign({}, props, p)); } }));
    };
    return hoistNonReactStatics(S, Component$$1);
}

var Locales = (function (_super) {
    __extends(Locales, _super);
    function Locales() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { locale: _this.preferredLocales() };
        _this.handleLanguageChange = function () {
            _this.setState({
                locale: _this.preferredLocales(),
            });
        };
        return _this;
    }
    Locales.prototype.preferredLocales = function () {
        if (navigator.languages && navigator.languages.length > 0) {
            return Intl.getCanonicalLocales(navigator.languages)[0];
        }
        return Intl.getCanonicalLocales([navigator.language])[0];
    };
    Locales.prototype.componentDidMount = function () {
        window.addEventListener('languagechange', this.handleLanguageChange);
    };
    Locales.prototype.componentWillUnmount = function () {
        window.removeEventListener('languagechange', this.handleLanguageChange);
    };
    Locales.prototype.render = function () {
        var _a = this.props, render = _a.render, component = _a.component, children = _a.children;
        return component
            ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(component, this.state)
            : render
                ? render(this.state)
                : children
                    ? typeof children === 'function'
                        ? children(this.state)
                        : !isEmptyChildren(children) ? __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(children) : null
                    : null;
    };
    return Locales;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

function withLocales(Component$$1) {
    var S = function (props) {
        return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Locales, { render: function (p) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(Component$$1, __assign({}, props, p)); } }));
    };
    return hoistNonReactStatics(S, Component$$1);
}


//# sourceMappingURL=index.es6.js.map


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(20);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _json2mq = __webpack_require__(15);

var _json2mq2 = _interopRequireDefault(_json2mq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Conditionally renders based on whether or not a media query matches.
 */
var Media = function (_React$Component) {
  _inherits(Media, _React$Component);

  function Media() {
    var _temp, _this, _ret;

    _classCallCheck(this, Media);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      matches: _this.props.defaultMatches
    }, _this.updateMatches = function () {
      return _this.setState({ matches: _this.mediaQueryList.matches });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Media.prototype.componentWillMount = function componentWillMount() {
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;

    var query = this.props.query;


    if (typeof query !== 'string') query = (0, _json2mq2.default)(query);

    this.mediaQueryList = window.matchMedia(query);
    this.mediaQueryList.addListener(this.updateMatches);
    this.updateMatches();
  };

  Media.prototype.componentWillUnmount = function componentWillUnmount() {
    this.mediaQueryList.removeListener(this.updateMatches);
  };

  Media.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        render = _props.render;
    var matches = this.state.matches;


    return render ? matches ? render() : null : children ? typeof children === 'function' ? children(matches) : !Array.isArray(children) || children.length ? // Preact defaults to empty children array
    matches ? _react2.default.Children.only(children) : null : null : null;
  };

  return Media;
}(_react2.default.Component);

Media.propTypes = {
  defaultMatches: _propTypes2.default.bool,
  query: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.object.isRequired)]).isRequired,
  render: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
};
Media.defaultProps = {
  defaultMatches: true
};
exports.default = Media;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Media = __webpack_require__(22);

var _Media2 = _interopRequireDefault(_Media);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Remove in the next major release.
_Media2.default.Media = _Media2.default; /* eslint-env node */


module.exports = _Media2.default;

/***/ }),
/* 24 */
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

    _this2.lockout();
    _this2.latestScrollEvent = e;

    var result = {
      startEvent: e,
      lastEvent: _this2.latestScrollEvent,
      scrollPending: _this2.scrollPending,
      direction: direction,
      intent: intent
    };

    _this2.scrollCb(result);
    _this2.undoLockout();
  });
};

ScrollSwipe.prototype.initScroll = function initScroll() {
  this.newOnWheel = this.onWheel.bind(this);

  if (this.target && this.target.addEventListener) {
    this.target.addEventListener('wheel', this.newOnWheel, false);
  }

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

  if (this.target && this.target.addEventListener) {
    this.target.addEventListener('touchmove', this.newTouchMove, false);
    this.target.addEventListener('touchend', this.newTouchEnd, false);
  }

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

ScrollSwipe.prototype.lockout = function lockout() {
  this.originalAddXTouch = this.addXTouch;
  this.originalAddYTouch = this.addYTouch;

  this.originalAddXScroll = this.addXScroll;
  this.originalAddYScroll = this.addYScroll;

  this.addXScroll = function () {};
  this.addYScroll = function () {};
  this.addXTouch = function () {};
  this.addYTouch = function () {};

  return this;
};

ScrollSwipe.prototype.undoLockout = function undoLockout() {
  this.addXScroll = this.originalAddXScroll;
  this.addYScroll = this.originalAddYScroll;
  this.addXTouch = this.originalAddXTouch;
  this.addYTouch = this.originalAddYTouch;

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
  if (this.target && this.target.removeEventListener) {
    this.target.removeEventListener('wheel', this.newOnWheel, false);
  }

  return this;
};

ScrollSwipe.prototype.killTouch = function killTouch() {
  if (this.target && this.target.removeEventListener) {
    this.target.removeEventListener('touchmove', this.newTouchMove, false);
    this.target.removeEventListener('touchend', this.newTouchEnd, false);
  }

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


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var camel2hyphen = function (str) {
  return str
          .replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
          })
          .toLowerCase();
};

module.exports = camel2hyphen;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
module.exports = (typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global) ||
  this

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=FullpageReact.js.map