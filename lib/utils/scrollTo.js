function scrollTo(element, elementBoundary, to, duration, callback) {
  const start = element[elementBoundary],
    change = to - start,
    increment = 10;

  let currentTime = 0;
  let globalId = requestAnimationFrame(repeatOften);
  function repeatOften() {
    currentTime += increment;
    let val = easeInOutQuad(currentTime, start, change, duration);
    element[elementBoundary] = val;

    if (currentTime >= duration) {
      cancelAnimationFrame(globalId);
      return callback();
    }
    globalId = requestAnimationFrame(repeatOften);
  }
}

//t = current time
//b = start value
//c = change in value
//d = duration
const easeInOutQuad = (t, b, c, d) => {
  t /= d;
	return -c * t*(t-2) + b;
}

export default scrollTo;
