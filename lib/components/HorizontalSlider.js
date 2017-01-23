const React = require('react');
const SliderSchema = require('./SliderSchema');
const Slide = require('./slide');

const { resize } = require('../utils/scrollTo');
const renderUtils = require('../utils/renderUtils');

class HorizontalSlider extends React.Component {
  constructor(props) {
    super(props);
    var p = this.props;
    var slideComponents = getSlides(p.children);
    console.log('constructing hori', slideComponents);

    this.state = {
      name: 'HorizontalSlider',
      defaultClass: 'HorizontalSlider',
      originalChilren: [],
      slides: [],
      slideCount: slideComponents.length,
      activeSlide: 0,
      lastActive: -1,
      downThreshold: -Math.abs(p.threshold || 100),
      upThreshold: p.threshold || 100,
      touchStart: 0,
      touchSensitivity: p.sensitivity || 100,
      scrollPending: false
    };
  }

  componentDidMount() {
    const node = this.node;
    resize.call(this, 'innerHeight');
  }

  shouldComponentUpdate(nP, nS) {
    var p = this.props;
    var s = this.state;
    return (s.slides.length !== nS.slides.length) || (s.height !== nS.height);
  }

  render() {
    var s = this.state;
    var p = this.props;
    var style = Object.assign({}, p.style || {}, {'height': '100%', 'width': '100%', 'overflowX': 'scroll', 'whiteSpace': 'nowrap', 'padding': 'none', 'margin': '0 auto'});

    return (
      <div ref={node => this.node = node} className={renderUtils.defaultClass.call(this)} style={{height: '100%'}}>
        <SliderSchema
          slideCount={s.slideCount}
          horizontal={true}
          downThreshold={s.downThreshold}
          upThreshold={s.upThreshold}
          styles={style}>
            {(p.children || []).map((c, i) => {
              return <div key={i} style={{display: 'inline-block', width: '100%'}}>{c}</div>
            })}
        </SliderSchema>
      </div>
    )
  }
}
HorizontalSlider.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

module.exports = HorizontalSlider;


function getSlides(children = []) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.filter(c => {

    if (c.type === Slide) {
      return true;
    }

    return false;
  });
}
