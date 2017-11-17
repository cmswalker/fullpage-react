import React from 'react';
import { Fullpage, Slide, HorizontalSlider } from '../lib';
import renderer from 'react-test-renderer';

const fullPageOptions = {
	scrollSensitivity: 7,
	touchSensitivity: -3,
	scrollSpeed: 500,
	resetSlides: true,
	hideScrollBars: true,
	enableArrowKeys: true,
	breakpoint: 375
};

function createNodeMock(element) {
  return {
    addEventListener: () => {}
  };
}

describe('FullpageReact', () => {

  describe('with Slides', () => {
    beforeEach(() => {
      const verticalSlides = [
        <Slide style={{backgroundColor: 'blue'}}><p>1</p></Slide>,
        <Slide style={{backgroundColor: 'pink'}}><p>2</p></Slide>
      ];
      fullPageOptions.slides = verticalSlides;
    });

    it('should support vertical slides', () => {
      const component = renderer.create(
        <Fullpage {...fullPageOptions}/>,
        {createNodeMock}
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('with HorizontalSlides', () => {
    beforeEach(() => {
      const horizontalSliderProps = {};
      const horizontalSlides = [
        <Slide style={{backgroundColor: 'red'}}><p>Horizontal 1</p></Slide>,
        <Slide style={{backgroundColor: 'yellow'}}><p>Horizontal 2</p></Slide>,
        <Slide style={{backgroundColor: 'green'}}><p>Horizontal 3</p></Slide>
      ];
      horizontalSliderProps.slides = horizontalSlides;

      const verticalSlides = [
        <Slide style={{backgroundColor: 'blue'}}><p>1</p></Slide>,
        <HorizontalSlider {...horizontalSliderProps} infinite={true} name={'horizontal1'}/>
      ];
      fullPageOptions.slides = verticalSlides;
    });

    it('should support horizontal slides', () => {
      const component = renderer.create(
        <Fullpage {...fullPageOptions}/>,
        {createNodeMock}
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});
