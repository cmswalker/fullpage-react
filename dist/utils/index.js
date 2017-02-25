'use strict';

var renderUtils = require('./renderUtils');
var scrollTo = require('./scrollTo');
var series = require('./series');

var _require = require('../actions'),
    changeSlide = _require.changeSlide;

var _require2 = require('./constants'),
    noOp = _require2.noOp,
    NONE = _require2.NONE,
    BLOCK = _require2.BLOCK,
    I_BLOCK = _require2.I_BLOCK,
    HEAD = _require2.HEAD,
    TAIL = _require2.TAIL,
    INCREMENT = _require2.INCREMENT,
    DECREMENT = _require2.DECREMENT;

function getSlideComponents() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var considerHorizontals = arguments[1];

  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.filter(function (c) {
    if (!c || !c.type) {
      return false;
    }

    if (c.type.name === 'Slide') {
      return true;
    }

    if (considerHorizontals && c.type.name === 'HorizontalSlider') {
      return true;
    }

    return false;
  });
}

function resize() {
  var s = this.state;
  var p = this.props;

  var considerHorizontals = this.name === 'Fullpage' ? true : false;
  var validComponents = getSlideComponents(p.children, considerHorizontals);

  this.setState({
    slideComponentsConst: validComponents,
    slideCount: validComponents.length,
    width: window.innerWidth,
    height: window.innerHeight
  }, removeAllButActive.bind(this, s.activeSlide));
}

function jumpScroll(activeSlide, scrollElement, cb) {
  var _this = this;

  cb = cb || noOp;

  var windowVal = this.state.activeSlide;
  var scrollDestination = window[this.winProp] * activeSlide;

  applyVisibiltyToAll.call(this);
  scrollElement[this.elementBoundary] = window[this.winProp] * windowVal;

  scrollTo(scrollElement, this.elementBoundary, scrollDestination, this.scrollSpeed, function () {
    removeAllButActive.call(_this, activeSlide);
    var newState = { activeSlide: activeSlide, scrollPending: false };
    _this.setState(newState, function () {
      cb(_this.state);
    });
  });
}

function removeAllButActive(activeSlide) {
  var arr = document.querySelectorAll('[data-slide=' + this.name + ']');
  arr = Array.prototype.slice.call(arr);
  arr.forEach(function (elem, i) {
    if (i !== activeSlide) {
      elem.style.display = NONE;
    }
  });
}

function applyVisibiltyToAll() {
  var styleProp = this.name === 'HorizontalSlider' ? I_BLOCK : BLOCK;

  var arr = document.querySelectorAll('[data-slide=' + this.name + ']');
  arr = Array.prototype.slice.call(arr);

  arr.forEach(function (elem) {
    elem.style.display = styleProp;
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

function handleScroll(data, direction, scrollElement, callback) {
  var _this2 = this;

  var s = this.state;
  var p = this.props;
  var resetSlides = p.resetSlides;
  var infinite = this.infinite,
      ss = this.ss;


  var intent = INTENT_MAP[direction][data.intent];

  var scrollUp = intent === 'UP' || intent === 'LEFT';
  var scrollDown = intent === 'DOWN' || intent === 'RIGHT';

  //windows firefox produces very low wheel activity so we have t\\o multiply it
  // if (needsConversion) {
  //   meas = meas * 3;
  // }
  //
  // if (needsConversionOSX) {
  //   meas = meas * 40;

  var activeSlide = s.activeSlide;

  if (scrollDown) {
    if (activeSlide === s.slideCount - 1 && !infinite && !resetSlides) {
      // prevent down going down
      ss.listen();
      return this.setState({ scrollPending: false });
    }

    activeSlide = activeSlide + 1;
  } else {
    if (activeSlide === 0 && !infinite && !resetSlides) {
      // prevent up going up
      ss.listen();
      return this.setState({ scrollPending: false });
    }

    activeSlide = activeSlide - 1;
  }

  this.setState({ scrollPending: true });

  var action = scrollDown ? INCREMENT : DECREMENT;

  if (resetSlides || infinite) {
    //reset flow
    if (action === INCREMENT) {
      if (!s.slideComponentsConst[activeSlide]) {
        activeSlide = 0;
        action = HEAD;
      }
    } else {
      if (!s.slideComponentsConst[activeSlide]) {
        activeSlide = s.slideComponentsConst.length - 1;
        action = TAIL;
      }
    }
  }

  var scrollDestination = window[this.winProp] * activeSlide;
  var c = void 0;
  var next = void 0;
  var last = void 0;
  var windowVal = s.activeSlide;

  var swap = infinite && (action === HEAD || action === TAIL);

  if (swap) {
    var arr = document.querySelectorAll('[data-slide=' + this.name + ']');
    arr = Array.prototype.slice.call(arr);

    for (var i = 0; i < arr.length; i++) {
      if (c) {
        break;
      }

      if (i === s.activeSlide) {
        c = arr[i];
        if (action === HEAD) {
          last = arr[0];
          next = arr[1] || c;
        } else {
          last = arr[arr.length - 1];
          next = arr[i + 1] || c;
        }
      }
    }

    if (action === HEAD) {
      windowVal = 0;
      scrollDestination = window[this.winProp];
    } else {
      //set it at the footer;
      windowVal = 1;
      scrollDestination = 0;
    }
  }

  if (swap) {
    if (action === HEAD) {
      swapElements(c, last);
      swapElements(last, next);
    } else {
      swapElements(last, next);
      swapElements(c, last);
    }
  }

  series([function (done) {
    applyVisibiltyToAll.call(_this2);
    scrollElement[_this2.elementBoundary] = window[_this2.winProp] * windowVal;

    scrollTo(scrollElement, _this2.elementBoundary, scrollDestination, _this2.scrollSpeed, function () {
      if (swap) {
        if (action === HEAD) {
          swapElements(last, next);
          swapElements(c, last);
        } else {
          swapElements(c, last);
          swapElements(last, next);
        }
      }

      done();
    });
  }, function (done) {
    removeAllButActive.call(_this2, activeSlide);
    done();
  }], function () {
    var newState = changeSlide(_this2.state, { type: action }, 1);

    _this2.setState(newState, function () {
      callback(_this2.state);
    });

    setTimeout(function () {
      _this2.setState({ scrollPending: false }, function () {
        ss.listen();
      });
    }, 700);
  });
}

module.exports = {
  removeAllButActive: removeAllButActive,
  series: series,
  INTENT_MAP: INTENT_MAP,
  handleScroll: handleScroll,
  applyVisibiltyToAll: applyVisibiltyToAll,
  resize: resize,
  getSlideComponents: getSlideComponents,
  renderUtils: renderUtils,
  scrollTo: scrollTo,
  jumpScroll: jumpScroll
};

function swapElements(obj1, obj2) {
  // save the location of obj2
  var parent2 = obj2.parentNode;
  var next2 = obj2.nextSibling;
  // special case for obj1 is the next sibling of obj2
  if (next2 === obj1) {
    // just put obj1 before obj2
    parent2.insertBefore(obj1, obj2);
  } else {
    // insert obj2 right before obj1
    obj1.parentNode.insertBefore(obj2, obj1);

    // now insert obj1 where obj2 was
    if (next2) {
      // if there was an element after obj2, then insert obj1 right before that
      parent2.insertBefore(obj1, next2);
    } else {
      // otherwise, just append as last child
      parent2.appendChild(obj1);
    }
  }
}