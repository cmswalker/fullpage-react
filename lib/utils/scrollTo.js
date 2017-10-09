
import { detectBrowser } from './index.js';

function scrollTo(element, elementBoundary, to, duration, callback) {
  const { name, version } = detectBrowser(navigator && navigator.userAgent);
  const [ major ] = version.split('.');
  const newChrome = (name === 'chrome' && Number(major) > 60);
  const start = newChrome ? window.scrollY : element[elementBoundary];
  const change = to - start;
  const increment = 10;

  let currentTime = 0;
  let globalId = requestAnimationFrame(repeatOften);
  function repeatOften() {
    currentTime += increment;
    let val = easeInOutQuad(currentTime, start, change, duration);

    // canary + newer chrome
    if (newChrome) {
      window.scrollTo(0, val);
    } else {
      element[elementBoundary] = val;
    }

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
function easeInOutQuad(t, b, c, d) {
  t /= d;
	return -c * t*(t-2) + b;
}

export default scrollTo;
