const React = require('react');
const SliderSchema = require('./SliderSchema');

const { resize } = require('../utils/scrollTo');
const renderUtils = require('../utils/renderUtils');

class HorizontalSlider extends React.Component {
  constructor(props) {
    super(props);
    var p = this.props;
    var slideComponents = renderUtils.getSlides(p.children);

    this.state = {
      name: 'HorizontalSlider',
      defaultClass: 'HorizontalSlider',
      slides: [],
      slideComponents,
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
    resize.call(this);
  }

  render() {
    var s = this.state;
    var p = this.props;
    var style = Object.assign({}, p.style || {});
    return (
      <div ref={node => this.node = node} className={renderUtils.defaultClass.call(this)} style={Object.assign(style, {height: this.state.height})}>
        <SliderSchema
          slideArr={s.slides}
          downThreshold={s.downThreshold}
          upThreshold={s.upThreshold}
          horizontal={true}>
            {this.props.children}
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
