import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Fullpage, HorizontalSlider, Slide } from '../lib/index';

require('./normalize.css');
require('./skeleton.css');
require('./exampleStyles.styl');

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/"/>
      <Route path="/fp1" component={FullpageReact1}/>
      <Route path="/fp2" component={FullpageReact2}/>
      <div style={{position: 'fixed', top: 0}}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/fp1">FP1</Link></li>
          <li><Link to="/fp2">FP2</Link></li>
        </ul>
      </div>
    </div>
  </Router>
);

const fullPage1Options = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 0 is default
  scrollSensitivity: 2,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 0 is default
  touchSensitivity: 2,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true,

  // optional, set the initial vertical slide
  activeSlide: 0
};

const fullPage2Options = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 0 is default
  scrollSensitivity: 2,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 0 is default
  touchSensitivity: 2,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true,

  // optional, set the initial vertical slide
  activeSlide: 0
};

const horizontalSlider1Props = {
  name: 'horizontalSlider1',
  infinite: true
};

const horizontalSlider2Props = {
  name: 'horizontalSlider2'
};

class FullpageReact1 extends React.Component {
  render() {

    const horizontalSlides = [
      <Slide style={{backgroundColor: 'black'}}/>,
      <Slide style={{backgroundColor: 'yellow'}}/>
    ];
    horizontalSlider1Props.slides = horizontalSlides;

    const verticalSlides = [
      <HorizontalSlider id='horizontal-slider-1' {...horizontalSlider1Props} />,
      <Slide style={{backgroundColor: 'blue'}}/>,
      <Slide style={{backgroundColor: 'pink'}}/>
    ];
    fullPage1Options.slides = verticalSlides;

    return (
      <Fullpage {...fullPage1Options}/>
    );
  }
}

class FullpageReact2 extends React.Component {
  render() {
    const horizontalSlides = [
      <Slide style={{backgroundColor: 'green'}}/>,
      <Slide style={{backgroundColor: 'yellow'}}/>
    ];
    horizontalSlider2Props.slides = horizontalSlides;

    const verticalSlides = [
      <Slide style={{backgroundColor: 'red'}}/>,
      <HorizontalSlider id='horizontal-slider-2' {...horizontalSlider2Props} />,
      <Slide style={{backgroundColor: 'yellow'}}/>
    ];
    fullPage2Options.slides = verticalSlides;

    return (
      <Fullpage {...fullPage2Options}></Fullpage>
    );
  }
}

export default BasicExample;
