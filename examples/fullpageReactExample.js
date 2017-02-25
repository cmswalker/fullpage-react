//check issues and make sure all is good!

import React from 'react';
import Tappable from 'react-tappable';

const {Fullpage, Slide, HorizontalSlider, Overlay, changeHorizontalSlide, changeFullpageSlide} = require('../lib/index');

require('./normalize.css');
require('./skeleton.css');
require('./exampleStyles.styl');

let fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 100 is default
  scrollSensitivity: 2,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 100 is default
  touchSensitivity: 2,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true
};

let topNavStyle = {
  textAlign: 'center',
  position: 'fixed',
  width: '100%',
  cursor: 'pointer',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  top: '0px'
};

let horizontalNavStyle = {
  position: 'relative',
  top: '50%'
};

let horizontalSliderProps = {
  name: 'horizontalSlider1',
  scrollSpeed: 500,
  infinite: true,
  resetSlides: false,
  scrollSensitivity: 2
};

class FullpageReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        Fullpage: 0,
        horizontalSlider1: 0
      },
      previous: {
        Fullpage: 0,
        horizontalSlider1: 0
      }
    };

    this.onSlideChangeStart = this.onSlideChangeStart.bind(this);
    this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);
  }

  onSlideChangeStart(name, state) {
    console.log('slide STARTED for', name, state.activeSlide);
    var sliderState = { previous: {} };
    sliderState.previous[name] = state.activeSlide;
    this.setState(sliderState);
  }

  onSlideChangeEnd(name, state) {
    console.log('slide ENDED for', name, state.activeSlide);
    var sliderState = { active: {} };
    sliderState.active[name] = state.activeSlide;
    this.setState(sliderState);
  }

  render() {

    let prevSlide = changeFullpageSlide.bind(null, 'PREV');
    let nextSlide = changeFullpageSlide.bind(null, 'NEXT');
    let backToTop = changeFullpageSlide.bind(null, 0);

    let topNav = (
      <Overlay style={topNavStyle}>
        <Tappable onTap={prevSlide}>
          <button>Previous Slide</button>
        </Tappable>
        <Tappable onTap={backToTop}>
          <button>Back to Top</button>
        </Tappable>
        <Tappable onTap={nextSlide}>
          <button>Next Slide</button>
        </Tappable>
      </Overlay>
    );

    let prevHorizontalSlide = changeHorizontalSlide.bind(null, 'horizontalSlider1', 'PREV');
    let nextHorizontalSlide = changeHorizontalSlide.bind(null, 'horizontalSlider1', 'NEXT');

    let horizontalNav = (
      <Overlay style={{top: '50%'}}>
        <div style={horizontalNavStyle}>
          <Tappable onTap={prevHorizontalSlide}><button>PREV</button></Tappable>
          <Tappable style={{position: 'absolute', right: '0px'}} onTap={nextHorizontalSlide}><button>Next</button></Tappable>
        </div>
      </Overlay>
    );

    return (
      <Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions}>

        {topNav}

        <Slide className="blue">
          <p>Slide 1</p>
        </Slide>

        <HorizontalSlider {...horizontalSliderProps}>
          <Slide className="red"><p>Slide 2</p><p>Horizontal 1</p></Slide>
          <Slide className="yellow"><p>Slide 2</p><p>Horizontal 2</p></Slide>
          <Slide className="green"><p>Slide 2</p><p>Horizontal 3</p></Slide>

          {horizontalNav}
        </HorizontalSlider>

        <Slide className="dark-blue"><p>Slide 3</p></Slide>
        <Slide className="green"><p>Slide 4</p></Slide>
      </Fullpage>
    );
  }
}

module.exports = FullpageReact;
