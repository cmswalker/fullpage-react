import React from 'react';
import { Fullpage, Slide, HorizontalSlider } from '../FullpageReact';
import renderer from 'react-test-renderer';

const fullPageOptions = {
	scrollSensitivity: 7,
	touchSensitivity: -3,
	scrollSpeed: 500,
	resetSlides: true,
	hideScrollBars: true,
	enableArrowKeys: true
};

const createNodeMock = () => {
  return {
    addEventListener: () => {}
  };
};

const killWindow = () => {
  global.__window__ = global.window;
  global.window = undefined;
  window = global.window;
};

const restoreWindow = (copy) => {
  global.window = global.__window__;
  window = global.window;
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
      const tree = component.toJSON();
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
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('with SSR', () => {
    beforeEach(() => {
      const verticalSlides = [<Slide style={{ backgroundColor: 'blue' }}>
          <p>1</p>
        </Slide>, <Slide style={{ backgroundColor: 'pink' }}>
          <p>2</p>
        </Slide>];
      fullPageOptions.slides = verticalSlides;

      killWindow();
    });

    afterEach(() => {
      restoreWindow();
    })

    it('should mount via SSR', () => {
      const component = renderer.create(
        <Fullpage {...fullPageOptions} />,
        { createNodeMock }
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should unmount via SSR', () => {
      const component = renderer.create(
        <Fullpage {...fullPageOptions} />,
        { createNodeMock }
      );

      component.unmount();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    })
  });

});
