const renderUtils = require('../utils/renderUtils');
const { GET_BODY } = renderUtils;

exports.scrollTo = scrollTo;
exports.scrollToSlide = scrollToSlide;
exports.forceScroll = forceScroll;
exports.resize = resize;

const increment = 10;

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
    forceScroll.call(this, s.activeSlide || 0, true);
  });
}

function forceScroll(slide, instant) {
  var speed = instant ? 0: 100;
  var s = this.state;

  this.setState({'activeSlide': slide});
  scrollTo.call(this, GET_BODY(), s.slides[slide], speed, () => {
    this.setState({'scrollPending': false});
  });
}

function scrollToSlide(slide, direction) {
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

  scrollTo(GET_BODY(), s.slides[slide], 600, () => {
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
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) {
    return c/2*t*t + b;
  }

	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};











































function scrollTo(element, dir, to, duration, callback) {
  var method = ELEMENT_AXIS[dir];
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

// function handleScroll(e, comp, axis) {
//   e.preventDefault();
//
//   var s = comp.state;
//
//   if (s.scrollPending) {
//     return;
//   }
//
//   var meas = needsConversion ? -e.deltaY : (e.wheelDelta || -e.deltaY || e.detail);
//   //windows firefox produces very low wheel activity so we have to multiply it
//   if (needsConversion) {
//     meas = meas * 3;
//   }
//
//   const scrollDown =  meas < s.downThreshold;
//   const scrollUp = !scrollDown && ( meas > s.upThreshold );
//
//   if (!scrollDown && !scrollUp) {
//     return comp.setState({'scrollPending': false});
//   }
//
//   var x = e.deltaX;
//   var y = e.deltaY;
//
//   xArr.push(x);
//   yArr.push(y);
//
//   if (xArr.length < 2 && yArr.length < 2) {
//     return;
//   }
//
//   const xSet = new Set(xArr);
//   const ySet = new Set(yArr);
//   const xSize = xSet.size;
//   const ySize = ySet.size;
//
//   globalDir = xSize > ySize ? 'HORIZONTAL' : 'VERTICAL';
//
//   xArr = [];
//   yArr = [];
//
//   let activeSlide = s.activeSlide;
//
//   if (scrollDown) {
//     if (activeSlide == s.slideCount -1) {// prevent down going down
//       return comp.setState({'scrollPending': false});
//     }
//
//     activeSlide = activeSlide + 1;
//
//   } else if (scrollUp) {
//       if (!activeSlide) {// prevent up going up
//         return comp.setState({'scrollPending': false});
//       }
//
//       activeSlide = activeSlide - 1;
//   }
//
//   comp.setState({'scrollPending': true});
//
//   let direction = s.strictDirection || globalDir; //may need to use comp for regular sliders
//   console.log(direction);
//
//   scrollTo(GET_BODY(), direction, s.slides[activeSlide], 500, () => {
//     comp.setState({'activeSlide': activeSlide});
//     comp.setState({'lastActive': scrollDown ? activeSlide-- : activeSlide++});
//
//     setTimeout(() => {
//       comp.setState({'scrollPending': false})
//     }, (s.upThreshold * 2));
//   });
//
//   comp.setState({'scrollPending': true});
//
//   return;
// }
