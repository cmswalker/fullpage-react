# Fullpage-React

Demo can be found [here](https://cmswalker.github.io/fullpage-react/)

A larger example setup can be found [here](https://github.com/cmswalker/fullpage-react/blob/master/examples/fullpageReactExample.js)

---

### Basic Setup

#### [NPM](https://www.npmjs.com/package/fullpage-react)

```
npm install fullpage-react --save

```

#### Yarn
```
yarn add fullpage-react
```

All styling can be done via inline or stylesheets.
Each component from Fullpage-React requires its own block of options

###### Built for UMD
You can either require this module in your own bundler/build chain or use it directly in the browser. If dropped directly into the browser, there will be a global variable named `FullpageReact`

---

###### Component Option Boilerplate

```
const { Fullpage, Slide, HorizontalSlider } = require('fullpage-react');

const fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 10 is default
  scrollSensitivity: 7,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 10 is default
  touchSensitivity: 7,
  scrollSpeed: 500,  
  hideScrollBars: true,
  enableArrowKeys: true,
  breakpoint: 375 // Disable FullpageReact and get standard scroll behavior back when this breakpoint (or below) is reached
};

const horizontalSliderProps = {
  name: 'horizontalSlider1', // name is required  
  infinite: true, // enable infinite scrolling  
};

<Fullpage {...fullPageOptions} >
  <Slide> Slide 1 </Slide>

  <HorizontalSlider {...horizontalSliderProps} >
    <Slide> Slide 2.1 </Slide>
    <Slide> Slide 2.2 </Slide>
  </HorizontalSlider>

  <Slide> Slide 3 </Slide>
</Fullpage>

```

###### Event Triggers & Callbacks

The Fullpage Component takes 2 optional event callback functions, each function returns the slide name, whether it's the overally Fullpage slider which is triggered via Vertical slides. Or one of various horizontal sliders you choose to use.

Example [here](https://github.com/cmswalker/fullpage-react/blob/master/examples/fullpageReactExample.js)

```
<Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} >
</Fullpage>
```

There are also 2 functions that are used for non scroll based slide delegation. These each take a slide number or the arguments `NEXT` or `PREV` which will make the slider act accordingly

Example [here](https://github.com/cmswalker/fullpage-react/blob/master/examples/fullpageReactExample.js)

```
const {changeHorizontalSlide, changeFullpageSlide} = require('fullpage-react');

let prevSlide = changeFullpageSlide.bind(null, 'PREV');
let nextSlide = changeFullpageSlide.bind(null, 'NEXT');
let backToTop = changeFullpageSlide.bind(null, 0);

let topNavStyle = {
  textAlign: 'center',
  position: 'fixed',
  width: '100%',
  cursor: 'pointer',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  top: '0px'
};

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

<Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} >
  {topNav}
  <Slide>1</Slide>
  <Slide>2</Slide>
  <Slide>3</Slide>
</Fullpage>

```

######Overlay Component

This component is completely optional, but it provides some styling and helpers in order to provide overlaying nav bars, for example

```
let topNavStyle = {
  textAlign: 'center',
  position: 'fixed',
  width: '100%',
  cursor: 'pointer',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  top: '0px'
};

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

<Fullpage {...fullPageOptions}>

  {topNav}

  <Slide>
    <p>Slide 1</p>
  </Slide>

</Fullpage>
```
