import React from 'react';

import { Fullpage, HorizontalSlider, Slide } from '../lib/index';
const { slideChangers } = Fullpage;

require('./normalize.css');
require('./skeleton.css');
require('./exampleStyles.styl');

const fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 10 is default
  scrollSensitivity: 7,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 10 is default
  touchSensitivity: -3,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true,
  breakpoint: 375
};

const topNavStyle = {
  textAlign: 'center',
  position: 'fixed',
  width: '100%',
  cursor: 'pointer',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  top: '0px'
};

const horizontalNavStyle = {
  position: 'absolute',
  width: '100%',
  top: '50%',
  zIndex: 10
};

const horizontalSliderProps = {
  name: 'horizontalSlider1',
  infinite: true
};

class FullpageReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        Fullpage: 0,
        horizontalSlider1: 0
      }
    };

    this.onSlideChangeStart = this.onSlideChangeStart.bind(this);
    this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);
  }

  onSlideChangeStart(name, props, state, newState) {
    if (!this.horizontalNav) {
      this.horizontalNav = document.getElementById('horizontal-nav');
    }

    if (name === 'horizontalSlider1') {
      scrollNavStart(this.horizontalNav);
    }
  }

  onSlideChangeEnd(name, props, state, newState) {
    if (name === 'horizontalSlider1') {
      scrollNavEnd(this.horizontalNav);
    }

    const oldActive = this.state.active;
    const sliderState = {
      [name]: newState.activeSlide
    };

    const updatedState = Object.assign(oldActive, sliderState);
    this.setState(updatedState);
  }

  componentDidMount() {

  }

  render() {
    const horizontalSlides = [
      <Slide style={{backgroundColor: 'yellow'}}><p>Horizontal 1</p></Slide>,
      <Slide style={{backgroundColor: 'pink'}}><p>Horizontal 2</p></Slide>,
      <Slide style={{backgroundColor: 'green'}}><p>Horizontal 3</p></Slide>
    ];
    horizontalSliderProps.slides = horizontalSlides;

    const horizontalSlider = <HorizontalSlider id='horizontal-slider-1' {...horizontalSliderProps}></HorizontalSlider>;

    const verticalSlides = [
      <Slide style={{backgroundColor: 'blue'}}>
        <p>Slide 1</p>
      </Slide>,
      horizontalSlider,
      <Slide style={{backgroundColor: 'pink'}}><p>Slide 3</p></Slide>
    ];
    fullPageOptions.slides = verticalSlides;

    return (
      <Fullpage {...fullPageOptions}>
      </Fullpage>
    );
  }
}

function scrollNavStart(nav) {
  // make the nav fixed when we start scrolling horizontally
  nav.style.position = 'fixed';
}

function scrollNavEnd(nav) {
  // make the nav absolute when scroll finishes
  nav.style.position = 'absolute';
}

export default FullpageReact;
