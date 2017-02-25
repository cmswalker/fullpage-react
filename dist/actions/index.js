'use strict';

var changeSlide = require('./changeSlide');
var onScrollActionMod = require('./onScrollAction');
var isCompActive = onScrollActionMod.isCompActive,
    onScrollAction = onScrollActionMod.onScrollAction;


module.exports = {
  onScrollAction: onScrollAction,
  isCompActive: isCompActive,
  changeSlide: changeSlide
};