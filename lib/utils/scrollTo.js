const renderUtils = require('../utils/renderUtils');
const { GET_BODY } = renderUtils;

exports.scrollTo = scrollTo;
exports.scrollToSlide = scrollToSlide;
exports.resize = resize;

function resize() {
  var winHeight = window.innerHeight;
  var s = this.state;
  var slides = [];

  for (let i = 0; i < s.slideCount; i++) {
    slides.push(winHeight * i);
  }

  this.setState({
    'slides': slides,
    'height': winHeight
  }, () => {
    scrollToSlide.call(this, s.activeSlide || 0, true);
  });
}

function scrollToSlide(slide, override) {
  var s = this.state;

  if (slide < 0 || slide >= s.slideCount) {
    return;
  }

  if (override) {
    this.setState({'activeSlide': slide});
    return scrollTo.call(this, GET_BODY(), s.slides[slide], 100, () => {
      this.setState({'scrollPending': false});
    });
  }

  if (s.scrollPending) {
    return;
  }

  this.setState({
    'activeSlide': slide,
    'scrollPending': true
  });

  console.log('headed to ', s.slides[slide])

  scrollTo(GET_BODY(), s.slides[slide], 600, () => {
    this.setState({'activeSlide': slide});
    // this.setState({'scrollPending': false});
    setTimeout(() => {
      this.setState({'scrollPending': false})
    }, (s.upThreshold * 2));
  });

}

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
