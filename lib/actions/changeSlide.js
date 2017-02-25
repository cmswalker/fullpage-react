const changeSlide = (state = { activeSlide: 0 }, action, difference) => {
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
}
module.exports = changeSlide;
