'use strict';

var changeSlide = function changeSlide() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { activeSlide: 0 };
  var action = arguments[1];
  var difference = arguments[2];

  switch (action.type) {
    case 'INCREMENT':
      return {
        activeSlide: state.activeSlide + difference,
        lastActive: state.activeSlide
      };
    case 'DECREMENT':
      return {
        activeSlide: state.activeSlide - difference,
        lastActive: state.activeSlide
      };
    case 'HEAD':
      return {
        lastActive: state.activeSlide,
        activeSlide: 0
      };
    case 'TAIL':
      return {
        lastActive: state.activeSlide,
        activeSlide: state.slideComponentsConst.length - 1
      };
    default:
      return state;
  }
};
module.exports = changeSlide;