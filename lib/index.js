const FullpageComp = require('./components/fullpage');
const { Fullpage, changeHorizontalSlide, changeFullpageSlide } = FullpageComp;

const Slide = require('./components/slide');

const HorizontalSliderModule = require('./components/HorizontalSlider');
const { HorizontalSlider } = HorizontalSliderModule;

module.exports = {
  Fullpage,
  Slide,
  HorizontalSlider,
  changeHorizontalSlide,
  changeFullpageSlide
};
