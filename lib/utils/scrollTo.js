function scrollTo(element, elementBoundary, to, duration, callback) {
  var start = element[elementBoundary],
    change = to - start,
    currentTime = 0,
    increment = 10,
    domainThresh = duration * .8,
    slowDown = 15;

  animateScroll(callback);

  function animateScroll(callback) {
    currentTime += increment;

    var val = easeInOutQuad(currentTime, start, change, duration);
    element[elementBoundary] = val;

    if (currentTime < duration) {

      if (currentTime > domainThresh) {
        setTimeout(function() {
          animateScroll(callback)
        }, slowDown);
        return;
      }

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
function easeInOutQuad(t, b, c, d) {
	t /= d/2;
	if (t < 1) {
    return c/2*t*t + b;
  }

	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}

export default scrollTo;
