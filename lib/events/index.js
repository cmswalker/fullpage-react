var cache = {};

function pub(sub, name, action) {
  if (!cache[name]) {
    cache[name] = {};
    cache[name].action = action.bind(sub);
  }
}

function sub(sub, arg, cb) {
  if (events.active == arg) {
    return;
  }

  cache[sub].action(arg);
  events.active = arg;
}

var events = {
  pub,
  sub,
  fullpageIncrement: null,
  fullpageDecrement: null,
  SCROLL_PENDING: false,
  fullpageActiveSlide: 0,
  fullpageSlideCount: 0,
  changeVertical
}

function changeVertical(slide) {
  sub('vertical', slide);
}

module.exports = events;
