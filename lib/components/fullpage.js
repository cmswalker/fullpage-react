import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WindowSize } from 'react-fns';
import ScrollSwipe from 'scroll-swipe';

import HS from './HS';

require('./styles.styl');

class Fullpage extends PureComponent {
  constructor(props) {
    super(props);

    this.scrollPending = false;
    [
      'setListeners', 'onScroll', 'delegateScroll',
      'lockScroll', 'unlockScroll', 'verticalScroll',
      'horizontalScroll'
    ].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  componentDidMount() {
    window.__FPR__ = window.__FPR__ || {};
    window.__FPR__.activeVerticalSlide = 0;
    this.window = window;
    this.document = window.document;
    this.setListeners();
  }

  setListeners() {
    this.ss = new ScrollSwipe({
      target: this.document.body,
      scrollCb: this.onScroll,
      touchCb: this.onScroll
    });
  }

  lockScroll() {
    this.scrollPending = true;
  }

  unlockScroll() {
    this.ss.listen();
    this.scrollPending = false;
  }

  onScroll(data) {
    if (this.scrollPending || !data.scrollPending) {
      return;
    }

    this.lockScroll();
    this.delegateScroll(data);
  }

  delegateScroll({ direction, intent, startEvent }) {
    if (direction === 'VERTICAL') {
      return this.verticalScroll(intent);
    }

    let path = startEvent.path || (startEvent.composedPath && startEvent.composedPath());
    if (!path) {
      path = composedPath(startEvent.target);
    }

    const eligible = path.find((p) => {
      return !!(p.dataset && p.dataset.horizontalSlider);
    });

    if (!eligible) {
      // tried to scroll horizontal on vertical slide
      return this.unlockScroll();
    }

    const name = eligible.dataset.horizontalSlider;
    const component = this.window.__FPR__[name];

    return this.horizontalScroll(intent, component);
  }

  verticalScroll(intent) {
    const { activeVerticalSlide } = this.window.__FPR__;
    const { infinite, slides } = this.props;
    const { length } = slides;

    // find the next slide
    let nextSlide = getIntent(intent, length, infinite, activeVerticalSlide);

    if (nextSlide === null) {
      // scroll ineligible, we're done
      return this.unlockScroll();
    }

    // show all the slides w/ css
    const to = (this.height * nextSlide);

    // commit to scroll
    scrollTo(this.ref, 'scrollTop', to, 500, () => {
      // hide all the slides w/ css
      this.window.__FPR__.activeVerticalSlide = nextSlide;
      this.unlockScroll();
    });
  }

  horizontalScroll(intent, component) {
    const { activeHorizontalSlide } = component.state.activeSlide;
    const { infinite, slides } = component.props;
    const { length } = slides;

    // find the next slide
    let nextSlide = getIntent(intent, length, infinite, activeHorizontalSlide);

    if (nextSlide === null) {
      // scroll ineligible, we're done
      return this.unlockScroll();
    }

    // show all the slides w/ css
    const to = (this.width * nextSlide);

    // commit to scroll
    scrollTo(this.ref, 'scrollLeft', to, 500, () => {
      // hide all the slides w/ css
      this.window.__FPR__.activeHorizontalSlide = nextSlide;
      this.unlockScroll();
    });
  }

  render() {
    const { slides } = this.props;

    return (
      <WindowSize
        render={({ width, height }) => {
          this.width = width;
          this.height = height;

          const widthStyle = `${width}px`;
          const heightStyle = `${height}px`;

          const givenStyle = this.props.style || {};

          const fullpageStyle = {
            ...givenStyle,
            width: widthStyle,
            height: heightStyle
          };

          let horizontalCount = -1;

          return (
            <div ref={(ref) => this.ref = ref} className='fullpage-react fullpage-lock' style={fullpageStyle}>
              {slides.map((sl, i) => {
                const givenSlideStyle = sl.props.style || {};
                const slKey = sl.props.key || `vertical-slide-${i}`;

                const verticalSlideStyles = {
                  width: widthStyle,
                  height: heightStyle
                };

                let givenWidth = width;
                let givenHeight = height;

                const combinedStyles = {
                  ...givenSlideStyle,
                  ...verticalSlideStyles
                };

                if (sl.type.name === 'HorizontalSlider') {
                  horizontalCount++;
                  const name = `horizontal-slider-${horizontalCount}`;
                  return <HS slides={sl.props.slides} style={sl.props.style || {}} key={slKey} name={name} render={(p, s) => {
                    const { slides, style } = p;
                    const { activeSlide } = s;

                    return (
                      <div data-horizontal-slider={name} className='fullpage-react-horizontal-slider' style={style}>
                        {slides.map((sl, i) => {
                            const givenSlideStyles = sl.props.style || {};
                            const key = sl.props.key || `horizontal-slide-${i}`;

                            return React.cloneElement(sl, {
                                key,
                                style: {
                                ...givenSlideStyles,
                                width,
                                height
                                }
                            });
                        })}
                      </div>
                    );
                  }}/>
                }

                return React.cloneElement(sl, {
                  key: slKey,
                  style: combinedStyles,
                  width: givenWidth,
                  height: givenHeight
                });
              })}
            </div>
          );
        }
        }
      />
    );
  }
}
Fullpage.propTypes = {
  style: PropTypes.object,
  slides: PropTypes.array.isRequired,
  infinite: PropTypes.bool
};
export default Fullpage;

function scrollTo(element, elementBoundary, to, duration, callback) {
  console.log('scrolling to', arguments);
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
function easeInOutQuad(t, b, c, d) {
  t /= d;
	return -c * t*(t-2) + b;
}

function getIntent(intent, length, infinite, windowState) {
  let nextSlide;

  if (intent) {
    // scroll down
    nextSlide = windowState + 1;
  } else {
    nextSlide = windowState - 1;
  }

  if (length - 1 < nextSlide || nextSlide < 0) {
    // attempt at infinite
    if (!infinite) {
      nextSlide = null;
    }
  }

  return nextSlide;
}

function composedPath(el) {
  const paths = [];

  while (el) {
    paths.push(el);

    if (el.tagName === 'HTML') {
      paths.push(document);
      paths.push(window);
      return paths;
    }

    el = el.parentElement;
  }

  return paths;
}