import React from 'react';
import { Fullpage, HorizontalSlider, Slide } from 'fullpage-react';

const { changeFullpageSlide, changeHorizontalSlide } = Fullpage;

require('normalize-css');
require('./styles/skeleton.css');
require('./styles/main.styl');

const fullPageOptions = {
  scrollSensitivity: 7,
  touchSensitivity: -3,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true
};

const topNavStyle = {
  textAlign: 'center',
  position: 'fixed',
  width: '100%',
  cursor: 'pointer',
  zIndex: 10,
  top: '0px',
  className: 'top-nav'
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
    const { active } = this.state;

    const currentActive = active.Fullpage;
    const prevSlide = changeFullpageSlide.bind(null, currentActive - 1);
    const nextSlide = changeFullpageSlide.bind(null, currentActive + 1);
    const goToTop = changeFullpageSlide.bind(null, 0);

    const horizontalSliderName = horizontalSliderProps.name;
    const horizontalActive = this.state.active[horizontalSliderName];

    const prevHorizontalSlide = changeHorizontalSlide.bind(null, horizontalSliderName, horizontalActive - 1);
    const nextHorizontalSlide = changeHorizontalSlide.bind(null, horizontalSliderName, horizontalActive + 1);

    const topNav = (
      <div style={topNavStyle}>
        <button onClick={prevSlide}>Up</button>
        <button onClick={goToTop}>Top</button>
        <button onClick={nextSlide}>Down</button>
      </div>
    );

    const horizontalNav = (
      <div id='horizontal-nav' className='slide' style={horizontalNavStyle}>
        <button style={{position: 'absolute', left: '0px'}} onClick={prevHorizontalSlide}>Left</button>
        <button style={{position: 'absolute', right: '0px'}} onClick={nextHorizontalSlide}>Right</button>
      </div>
    );

    const horizontalSlides = [
      <Slide className="warm-b">
        <div className="sub-title">Horizontal Sliders<br/>(scroll left or right)</div>
      </Slide>,
      <Slide className="pink-b">
        <div className="sub-title">100% React components, no jQuery. <br/> Easy API</div>
      </Slide>,
      <Slide className="coal-b">
        <div className="sub-title">Infinite Scrolling -></div>
      </Slide>
    ];
    horizontalSliderProps.slides = horizontalSlides;

    const horizontalSlider = <HorizontalSlider id='horizontal-slider-1' className='slide ' {...horizontalSliderProps}>{horizontalNav}</HorizontalSlider>;

    const verticalSlides = [
      <Slide className="slide pink-b">
      <div className="arrow-down arrow-down-2 arrow-title-1"></div>
        <div className="arrow-down arrow-down-2 arrow-title-2"></div>
        <div className="arrow-down arrow-down-2 arrow-title-3"></div>
        <div id="title">Fullpage React</div>
      </Slide>,
      horizontalSlider,
      <Slide className="slide orange-b">
        <div className="sub-title">Mobile friendly with tap events<br/>
          <a href="https://github.com/cmswalker/fullpage-react">Github</a><br/>
          <a href="https://www.npmjs.com/package/fullpage-react">NPM</a>
        </div>
      </Slide>
    ];
    fullPageOptions.slides = verticalSlides;

    return (
      <Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions}>
        {topNav}
      </Fullpage>
    );
  }
}

function scrollNavStart(nav) {
  nav.style.position = 'fixed';
}

function scrollNavEnd(nav) {
  nav.style.position = 'absolute';
}

export default FullpageReact
