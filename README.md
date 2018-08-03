# **[Fullpage-React](https://cmswalker.github.io/fullpage-react/)**

Stateful fullpage.js inspired scrolling for React

## **This package is no longer maintained, and has been moved under the official [fullpage.js](https://github.com/alvarotrigo/fullpage.js/) project! Please use the official [react-fullpage](https://github.com/alvarotrigo/react-fullpage) package!**

---

### Demo can be found [here](https://cmswalker.github.io/fullpage-react/) along with the [source code](https://github.com/cmswalker/fullpage-react/blob/master/examples/fullpageReactExample.js)

### [Starter Example](https://github.com/cmswalker/fullpage-react/tree/master/examples)

### Basic Setup

```sh
// NPM
npm i fullpage-react --save

// Yarn
yarn add fullpage-react
```

#### Component Boilerplate

```jsx
import { Fullpage, Slide, HorizontalSlider } from 'fullpage-react';

const fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 10 is default
  scrollSensitivity: 7,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 10 is default
  touchSensitivity: 7,
  scrollSpeed: 500,
  hideScrollBars: true,
  enableArrowKeys: true
};

const horizontalSliderProps = {
  name: 'horizontalSlider1', // name is required
  infinite: true, // enable infinite scrolling
};

const horizontalSlides = [
  <Slide> Slide 2.1 </Slide>,
  <Slide> Slide 2.2 </Slide>
];
horizontalSliderProps.slides = horizontalSlides;

const slides = [
  <Slide> Slide 1 </Slide>,
  <HorizontalSlider {...horizontalSliderProps}></HorizontalSlider>,
  <Slide> Slide 3 </Slide>
];
fullPageOptions.slides = slides;

<Fullpage {...fullPageOptions} />

```

#### Events API

There are two functions located on the `Fullpage` class. These are used for manually changing the vertical and horizontal slides via UI events.

There are also two optional props for `<Fullpage/>` that will send data `onSlideChangeStart` and `onSlideChangeEnd`

Sliding can be cancelled in the event that you want the user to stay fixed on a slide for some reason. If the function passed to `onSlideChangeStart` returns `true`, sliding can be cancellabe until it returns falsy.

An example can be found here [here](https://github.com/cmswalker/fullpage-react/blob/master/examples/fullpageReactExample.js)
