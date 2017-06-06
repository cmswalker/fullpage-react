import React from 'react';

const HorizontalSlide = 'HorizontalSlide';
const VerticalSlide = 'VerticalSlide';

const Slide = (props) => {
  const { render, className, window, horizontal, horizontalSliderName } = props;

  if (!render) {
    return null;
  }

  const children = Array.isArray(props.children) ? props.children : [props.children];
  const { innerWidth, innerHeight } = window;
  const style = props.style || {};

  const styles = Object.assign({
    overflow: 'hidden', width: innerWidth, height: innerHeight, position: 'relative'
  }, style);

  let slideClassName = horizontal ? [HorizontalSlide] : [VerticalSlide];
  if (className) {
    slideClassName.push(className);
  }
  slideClassName = slideClassName.join(' ');

  const attrs = {
    'data-slide': horizontal ? HorizontalSlide : VerticalSlide,
    'data-horizontal-slider': horizontalSliderName || null
  };

  return (
    <div className={slideClassName} id={props.id} {...attrs} style={styles}>
      {children}
    </div>
  );
}

export default Slide;
