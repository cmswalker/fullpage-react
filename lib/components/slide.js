const React = require('react');
const Tappable = require('react-tappable');

const utils = require('../utils');
const { INTENT_MAP, resize, getSlideComponents, scrollTo, events, renderUtils, insertChild, removeChild, series } = utils;
const { defaultClass, KEY_IDX, GET_BODY, GET_BROWSER, GET_OS} = renderUtils;

class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'Slide';
  }

  render() {
    var style = Object.assign({height: window.innerHeight, width: window.innerWidth}, this.props.style);
    var attrs = {
      'data-slide': this.props.horizontal ? 'HorizontalSlider' : 'Fullpage'
    };

    return (
      <div className={defaultClass.call(this)} {...attrs} style={style}>
        {this.props.children}
      </div>
    );
  }
}
Slide.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object.isRequired,
  horizontal: React.PropTypes.bool
};

module.exports = Slide;
