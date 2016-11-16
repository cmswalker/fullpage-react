exports.scrollTo = scrollTo;
exports.handleScroll = handleScroll;

const CONSTS = require('../components/consts');
const ELEMENT_AXIS = CONSTS.ELEMENT_AXIS;

function scrollTo(element, dir, to, duration, callback) {
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
  }
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


function handleScroll(e, comp, axis) {
  e.preventDefault();

  if (comp.state.scrollPending) {
    return;
  }

  //this should work to differntiate between hori and vert. if Y is ever truthy we know they want vertical.
  //There is some leakage in that vertial reads can come though during horizontal transitions and that is why we need to
  //put the scroll pending check of this component above the vertical check.
  //May just require an additional timeout so it doesnt automatically go for a vertical scroll after it frees up

  const direction = axis === CONSTS.SCROLL_DIRECTIONS.Y ? 'Y' : 'X';
  const notDirection = axis === CONSTS.SCROLL_DIRECTIONS.Y ? 'X' : 'Y';

  if (Math.abs(e[`delta${notDirection}`])) {
    return;
  }

  const scrollRight = (e.wheelDelta || -e[`delta${direction}`] || e.detail) < (comp.state.downThreshold);
  const scrollLeft = (e.wheelDelta || -e[`delta${direction}`] || e.detail) > comp.state.upThreshold;

  if (!scrollRight && !scrollLeft) {
    return;
  }

  const SCROLL_DIR = CONSTS.SCROLL_DIRECTIONS[direction];

  let activeSlide = comp.state.activeSlide;

  comp.setState({'scrollPending': true});

  if (scrollRight) {

    if (activeSlide == comp.state.slidesCount -1) {// prevent right going right/down doing down

      if (comp.state.reset || comp.state.infinite) {
        return resetSlides(comp, 1);
      }

      return;
    }

    activeSlide = activeSlide + 1;

  } else if (scrollLeft) {

      if (!activeSlide) {// prevent left going left/up going up

        if (comp.state.reset || comp.state.infinite) {
          return resetSlides(comp, -1);
        }

        return;
      }

      activeSlide = activeSlide - 1;
  } else {
    return comp.setState({'scrollPending': false});
  }

  var sliderNode = comp.node;

  scrollTo(sliderNode, SCROLL_DIR, comp.state.slides[activeSlide], 500, () => {
    comp.setState({'activeSlide': activeSlide});
    comp.setState({'lastActive': scrollRight ? activeSlide-- : activeSlide++});

    setTimeout(() => {
      comp.setState({'scrollPending': false})
    }, (comp.state.upThreshold * 2));
  });
  return comp.setState({'scrollPending': true});
}

function resetSlides(comp, direction) {
  //direction is either -1 or 1 depending on how we need to reset
  if (!direction) {
    return;
  }

  let beginning = direction === -1 ? true : false;
  let slide = 0;

  let infinite = comp.state.infinite;
  let reset = !!infinite;

  if (infinite) {
    //we need to shuffle our slides array
    let slides = comp.state.slides;

    if (beginning) {
      slide = slides.length;
      // shuffle(slides, 0);
    } else {
      // shuffle(slides, 1);
    }

    comp.setState({'scrollPending': false}, () => comp.scrollToSlide(slide, true));
  }


}

function shuffle(arr, idx) {
  if (idx === 0) {
    let last = arr.pop();
    arr.unshift(last);
    console.log(arr)
    return;
  }

  let first = arr.shift();
  arr.push(first);
}
