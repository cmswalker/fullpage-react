const React = require('react');
const SliderSchema = require('./SliderSchema');

const { scrollToSlide, resize } = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');
const { KEY_IDX, GET_BODY, GET_BROWSER, GET_OS} = renderUtils;

var touchArr = [];
var latestTouch
var needsConversion = null;

class Fullpage extends React.Component {
  constructor(props) {
    super(props);

    var p = this.props;
    var slideComponents = renderUtils.getSlides(p.children);

    this.state = {
      name: 'Fullpage',
      defaultClass: 'Fullpage',
      slides: [],
      slideComponents,
      slideCount: slideComponents.length,
      activeSlide: 0,
      lastActive: -1,
      downThreshold: -Math.abs(p.threshold || 100),
      upThreshold: p.threshold || 100,
      touchStart: 0,
      touchSensitivity: p.sensitivity || 100,
      scrollPending: false//TODO: may not need this
    };
  }

  componentDidMount() {
    const node = this.node;
    resize.call(this);
    node.addEventListener('keydown', this.checkKey);
    window.addEventListener('resize', resize.bind(this));
  }

  componentWillUnmount() {
    const node = this.node;
    node.removeEventListener('keydown', this.checkKey);
    window.removeEventListener('resize', resize.bind(this));
  }

  shouldComponentUpdate(nP, nS) {
    return this.state.slides.length !== nS.slides.length;
  }

  componentDidUpdate(pP, pS) {
    var s = this.state;
    events.active = s.activeSlide;
    this.props.active(s.activeSlide);
  }

  checkKey(e) {
    var direction = null;
    e = e || window.event;
    if (KEY_IDX[e.keyCode]) {
      direction = KEY_IDX[e.keyCode];
    } else {
      return false;
    }

    //TODO: can remove this when carousel is implemented
    if (typeof direction !== 'number') {
      return false;
    }

    scrollToSlide(this.state.activeSlide + direction);
  }

  render() {
    var s = this.state;

    if (!s.slides.length) {
      return (
        <div ref={node => this.node = node}>please render a slide</div>
      )
    }

    return (
      <div ref={node => this.node = node} className={renderUtils.defaultClass.call(this)} style={{height: this.state.height}}>
        <SliderSchema
          slideArr={s.slides}
          downThreshold={s.downThreshold}
          upThreshold={s.upThreshold}>
            {this.props.children}
        </SliderSchema>
      </div>
    )
  }

}
Fullpage.propTypes = {
  children: React.PropTypes.node.isRequired,
  threshold: React.PropTypes.number,
  sensitivity: React.PropTypes.number,
  active: React.PropTypes.func
}

module.exports = Fullpage;


// <div ref={node => this.node = node} className={renderUtils.defaultClass.call(this)} style={Object.assign(this.props.style, {height: '100%', width: '100%'})}>
//   <SliderSchema node={this} slideArr={this.state.slides} navElements={this.props.elements} fullpage={true}>{this.props.children}</SliderSchema>
// </div>


//Gameplan
//Schema controls initial slide designation and filtering. It passes data down
//to the top-level Slides
//if one of these is a horizontal Slide, we repeat the process for its children
//and render a different type of wrapper in Render() (the type thats currently in schema)
