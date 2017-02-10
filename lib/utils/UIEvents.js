const noOp = function() {};
const events = require('../events');
module.exports = {
  changeFullpageSlide
}

function changeFullpageSlide(slide, cb) {
  cb = cb || noOp;
  const active = events.fullpageActiveSlide;
  if (active ===slide) {
    return;
  }

  const action = slide > active ? 'Increment' : 'Decrement';

  var funcName = 'fullpage' + action;

  events.fullpageIncrement(slide, cb);


}
