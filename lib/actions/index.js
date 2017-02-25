const changeSlide = require('./changeSlide');
const onScrollActionMod = require('./onScrollAction');
const { isCompActive, onScrollAction } = onScrollActionMod;

module.exports = {
  onScrollAction,
  isCompActive,
  changeSlide
};
