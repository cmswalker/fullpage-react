import React from 'react'

import Slide from './slide'
import { getNodes, hideAllButActive } from '../utils';

class HorizontalSlider extends React.Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
  }

  componentDidMount() {
    const { activeSlide, document, name, cache } = this.props;
    cache(this);

    const nodes = getNodes(document, `data-horizontal-slider="${name}"`);
    hideAllButActive(activeSlide, nodes);
  }

  render() {
    const p = this.props;
    const { name, children, window } = p;

    if (!name) {
      throw new Error('name is a required prop for HorizontalSlider');
    }

    const elements = p.slides.reduce((result, sl) => {
      if (!sl) {
        return result;
      }

      if (typeof sl.type !== 'function') {
        result.other.push(sl);
      } else {
        result.slides.push(sl);
      }

      return result;
    }, { slides: [], other: [] });

    const { other, slides } = elements;

    const { innerWidth, innerHeight } = window;
    const attrs = {
      'data-slide': 'HorizontalSlider',
      'data-name': name
    };

    const className = (p.className || '') + 'HorizontalSlider';
    const overflowX = p.hideScrollBars ? 'hidden' : 'auto';

    const horizontalSliderStyle = Object.assign({}, p.style,
      {height: window.innerHeight, width: innerWidth, position: 'relative', overflowX, whiteSpace: 'nowrap', padding: '0px', margin: '0'});
    const horizontalSlideStyle = {overflow: 'hidden', whiteSpace: 'normal', display: 'inline-block', height: innerHeight, width: innerWidth};

    return (
      <div ref={node => this.node = node} className={className} id={p.id} {...attrs} style={horizontalSliderStyle}>
        {other.map((o, i) => {
          const p = o.props || {};
          return <div key={i} {...p}></div>
        })}
        {slides.map((s, i) => {
          if (!s) {
            return null;
          }

          let sStyle = Object.assign({}, horizontalSlideStyle, slideStyle);
          const hSlideProps = s.props || {};
          const slideStyle = hSlideProps.style || {};

          return <Slide render={true} key={i} horizontalSliderName={name} slide={s} id={hSlideProps.id} className={hSlideProps.className || ''} window={window} horizontal={true} style={sStyle} {...hSlideProps}>{hSlideProps.children}</Slide>
        })}

        {children}
      </div>
    );
  }
}

export default HorizontalSlider;
