//check issues and make sure all is good!

import React from 'react';
import Tappable from 'react-tappable';

const {Fullpage, Slide, HorizontalSlider, Overlay, changeHorizontalSlide, changeFullpageSlide} = require('fullpage-react');

require('normalize.css');
require('./styles/skeleton.css');
require('./styles/main.styl');

let fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 10 is default
  scrollSensitivity: 2,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 10 is default
  touchSensitivity: 2,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true
};

let topNavStyle = {
  textAlign: 'left',
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
  scrollSensitivity: 2,
  touchSensitivity: 2
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

    let slide1 = changeFullpageSlide.bind(null, 0);
    let slide2 = changeFullpageSlide.bind(null, 1);
    let slide3 = changeFullpageSlide.bind(null, 2);

    let topNav = (
      <Overlay className="top-nav" style={topNavStyle}>
        <Tappable className="topnav-button" onTap={slide1}>
          <button>First Slide</button>
        </Tappable>
        <Tappable className="topnav-button" onTap={slide2}>
          <button>Second Slide</button>
        </Tappable>
        <Tappable className="topnav-button" onTap={slide3}>
          <button>Third Slide</button>
        </Tappable>
      </Overlay>
    );

    let prevHorizontalSlide = changeHorizontalSlide.bind(null, 'horizontalSlider1', 'PREV');
    let nextHorizontalSlide = changeHorizontalSlide.bind(null, 'horizontalSlider1', 'NEXT');

    let horizontalNav = (
      <Overlay style={{top: '50%'}}>
        <div style={horizontalNavStyle}>
          <Tappable style={{position: 'absolute', left: '0px'}}onTap={prevHorizontalSlide}><button>PREV</button></Tappable>
          <Tappable style={{position: 'absolute', right: '0px'}} onTap={nextHorizontalSlide}><button>Next</button></Tappable>
        </div>
      </Overlay>
    );

    return (
      <Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions}>

        {topNav}

        <Slide className="slide ice-b">
          <div className="arrow-down arrow-down-2 arrow-title-1"></div>
          <div className="arrow-down arrow-down-2 arrow-title-2"></div>
          <div className="arrow-down arrow-down-2 arrow-title-3"></div>
          <div id="title">Fullpage React</div>
        </Slide>

        <HorizontalSlider className="slide" {...horizontalSliderProps}>
          <Slide className="warm-b">
            <div className="sub-title">Horizontal Sliders<br/>
             (scroll left or right)</div>
          </Slide>
          <Slide className="ice-b">
            <div className="sub-title">100% React components, no jQuery. <br/> Easy API</div>
          </Slide>
          <Slide style={{backgroundColor: '#2B2C28'}}>
            <div className="sub-title">
              Infinite Scrolling ->
            </div>
          </Slide>
          {horizontalNav}
        </HorizontalSlider>

        <Slide className="slide green">
          <div className="sub-title">
            Mobile friendly with tap events
            <br/>
            <a href="https://github.com/cmswalker/fullpage-react">Github</a>
            <br/>
            <a href="https://www.npmjs.com/package/fullpage-react">NPM</a>
          </div>
        </Slide>
      </Fullpage>
    );
  }
}

module.exports = FullpageReact;
