# [Fullpage-React](https://cmswalker.github.io/fullpage-react/)

Stateful fullpage.js inspired scrolling for React

100% React Components and vanilla JS. No other Dependencies.

### Demo can be found [here](https://cmswalker.github.io/fullpage-react/) along with the [source code](https://github.com/cmswalker/fullpage-react/blob/master/examples/fullpageReactExample.js)

### [Starter Example](https://github.com/cmswalker/fullpage-react/tree/master/examples)

### On [NPM](https://www.npmjs.com/package/fullpage-react)

#### Compliant with ESModules & UMD
You can either require this module in your own bundler/build chain or use it directly in the browser via a [script](https://raw.githubusercontent.com/cmswalker/fullpage-react/master/FullpageReact.js). If dropped directly into the browser, there will be a global variable named `FullpageReact`.

---

### Basic Setup

```shell
// NPM
npm install fullpage-react --save

// Yarn
yarn add fullpage-react

```

---

###### Component Boilerplate

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

###### Events API

There are two functions located on the `Fullpage` class. These are used for manually changing the vertical and horizontal slides via UI events.

There are also two optional props for `<Fullpage/>` that will send data `onSlideChangeStart` and `onSlideChangeEnd`

An example can be found here [here](https://github.com/cmswalker/fullpage-react/blob/master/examples/fullpageReactExample.js)
