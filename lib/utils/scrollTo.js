module.exports = scrollTo;

const CONSTS = require('../components/consts');
const ELEMENT_AXIS = CONSTS.ELEMENT_AXIS;

function scrollTo(element, dir, to, duration, callback) {
  console.log('scrollTo ARGS', arguments);
  var start = element[ELEMENT_AXIS[dir]],
      change = to - start,
      currentTime = 0,
      increment = 10;

  animateScroll(callback);

  function animateScroll(callback){
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      element[ELEMENT_AXIS[dir]] = val;
      if(currentTime < duration) {
          setTimeout(function() {
            animateScroll(callback)
          }, increment);
      } else {
        return callback();
      }
  };
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
