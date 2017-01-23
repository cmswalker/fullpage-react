const { GET_BODY } = require('./renderUtils');
const ELEMENT_AXIS = {
	VERTICAL: 'scrollTop',
	HORIZONTAL: 'scrollLeft'
};


exports.scrollTo = scrollTo;
exports.scrollToSlide = scrollToSlide;
exports.forceScroll = forceScroll;
exports.resize = resize;

const increment = 10;

function resize(windowProp) {
  var winProp = window[windowProp];
  var s = this.state;
  var slides = [];

  for (let i = 0; i < s.slideCount; i++) {
    slides.push(winProp * i);
  }

	if (!s.originalChilren.length) {
		this.setState({originalChilren: slides})
	}

  this.setState({
    'slides': slides,
    'height': winProp
  }, () => {
    forceScroll.call(this, GET_BODY(), (s.activeSlide || 0), 'VERTICAL', true);
  });
}

function forceScroll(element, slide, direction, instant) {
  var speed = instant ? 0: 100;
  var s = this.state;

  this.setState({'activeSlide': slide});

  scrollTo.call(this, element, direction, s.slides[slide], speed, () => {
    this.setState({'scrollPending': false});
  });
}

function scrollToSlide(element, slide, direction = 'VERTICAL') {
  var s = this.state;

  if (slide < 0 || slide >= s.slideCount) {
    return;
  }

  if (s.scrollPending) {
    return;
  }

  this.setState({
    'activeSlide': slide,
    'scrollPending': true
  });

  scrollTo(element, direction, s.slides[slide], 600, () => {
    this.setState({'activeSlide': slide});
    // this.setState({'scrollPending': false});
    setTimeout(() => {
      this.setState({'scrollPending': false})
    }, (s.upThreshold * 2));
  });

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

function scrollTo(element, dir, to, duration, callback) {
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
          setTimeout(function() {
            animateScroll(callback)
          }, increment);
      } else {
        return callback();
      }
  }

}
