const { GET_BODY } = require('./renderUtils');

const increment = 10;
const ELEMENT_AXIS = {
	VERTICAL: 'scrollTop',
	HORIZONTAL: 'scrollLeft'
};


//t = current time
//b = start value
//c = change in value
//d = duration
function easeInOutQuad(t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b;
  }

  t--;
  return -c/2 * (t*(t-2) - 1) + b;
}

function scrollToElement(element, dir, to, duration, callback) {
  var method = ELEMENT_AXIS[dir];

  if (method === 'scrollTop') {
    element = GET_BODY();
  }

  var start = element[method],
      change = to - start,
      currentTime = 0

  animateScroll(callback);

  function animateScroll(callback) {
    currentTime += increment;
    var val = easeInOutQuad(currentTime, start, change, duration);
    element[method] = val;
    if (currentTime < duration) {
        setTimeout(() => {
          animateScroll(callback)
        }, increment);
    } else {
      return callback();
    }
  }
}

module.exports = scrollToElement;
