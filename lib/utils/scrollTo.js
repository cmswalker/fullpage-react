exports.scrollTo = scrollTo;
exports.handleScroll = handleScroll;

const CONSTS = require('../components/consts');
const ELEMENT_AXIS = CONSTS.ELEMENT_AXIS;
const React = require('react');

//scroll vars
const increment = 10;

function scrollTo(element, dir, to, duration, callback) {
  var method = ELEMENT_AXIS[dir];
  var start = element[method],
      change = to - start,
      currentTime = 0

  animateScroll(callback);

  function animateScroll(callback){
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element[method] = val;
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
function easeInOutQuad(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}

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
    if (activeSlide == comp.state.slidesCount - 1) {// prevent right going right/down doing down

      if (comp.state.reset) {
        activeSlide = 0;
      } else if (comp.state.infinite) {
        resetSlides(comp, -1, activeSlide);
      }

    } else {
      activeSlide = activeSlide + 1;
    }

  } else if (scrollLeft) {

      if (!activeSlide) {// prevent left going left/up going up

        if (comp.state.reset) {
          activeSlide = 0;
        } else if (comp.state.infinite) {
          resetSlides(comp, 1, activeSlide);
        }

      } else {
        activeSlide = activeSlide - 1;
      }


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

function resetSlides(comp, direction, activeSlide) {
  console.log('dir', comp.direction)
  //direction is either -1 or 1 depending on how we need to reset
  if (!direction) {
    return;
  }

  let beginning = direction === -1 ? true : false;
  let slide = 0;

  //we need to shuffle our slides array
  let order = comp.state.order;

  if (beginning) {
    //beginning means we need to simulate 4 going to 1
    //first we set the active slide to 0, then shuffle the array;
    //[0,1,2,3] => [1,2,3,0]
    // console.log('activeSlide', activeSlide)
    // slide = activeSlide - 1;
    // slide = activeSlide + 1;
    slide = 1;
    console.log('going first');
    //so here, what we have to do is make our current slide index 0; then put the next cyclen in front of it
    //ex: make the array [4,1,2,3]; then just scroll to 1

    shuffleFirst(order);
    comp.setState({'scrollPending': true, 'order': order, 'activeSlide': 1}, () => {
      //then we set our current scroll position to 0 of the comp element;
      var sliderNode = comp.node;
      scrollTo(sliderNode, 0, comp.direction, 0, () => {
        console.log('finished reset');
        comp.scrollToSlide(slide);
      });
    });





    // slide = activeSlide + 1;
  } else {
    shuffleLast(order);
    slide = activeSlide - 1;
  }

  // console.log('i should scroll to ', slide);
  // console.log('slides after shuffle', slides);

  //instead we should shuffle the react DOM elements, then just reset the left side to 0;

  // comp.setState({'scrollPending': true, 'order': order}, () => {
  //   //then we set our current scroll position to 0 of the comp element;
  //   var sliderNode = comp.node;
  //
  //   comp.scrollToSlide(slide, true);
  // });



}


//make first appear as last
function shuffleFirst(arr) {
  // [1,2,3,4] => [4,1,2,3];
  let last = arr.pop();
  arr.unshift(last);
  //need to now make the dom repaint
}

function shuffleFirst2(arr) {
  //[1,2,3,4]
}

//make last appear as first
function shuffleLast(arr) {
  let last = arr.pop();
  arr.unshift(last);
}
