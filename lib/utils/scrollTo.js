module.exports = scrollTo;

function scrollTo(element, to, duration, callback) {
  var start = element.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 10;

  animateScroll(callback);

  function animateScroll(callback) {
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) {
        setTimeout(function() {
          animateScroll(callback)
        }, increment);
    } else {
      return callback();
    }
  }
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) {
    return c/2*t*t + b;
  }

	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
