'use strict';

var FullpageComp = require('./components/fullpage');
var Fullpage = FullpageComp.Fullpage,
    changeHorizontalSlide = FullpageComp.changeHorizontalSlide,
    changeFullpageSlide = FullpageComp.changeFullpageSlide;

var Overlay = require('./components/overlay');

var Slide = require('./components/slide');

var HorizontalSliderModule = require('./components/horizontalSlider');
var HorizontalSlider = HorizontalSliderModule.HorizontalSlider;


module.exports = {
  Fullpage: Fullpage,
  Slide: Slide,
  HorizontalSlider: HorizontalSlider,
  changeHorizontalSlide: changeHorizontalSlide,
  changeFullpageSlide: changeFullpageSlide,
  Overlay: Overlay
};