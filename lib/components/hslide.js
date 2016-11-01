const React = require('react');

const CONSTS = require('./consts');
const Slide = require('./slide');

const scrollTo = require('../utils/scrollTo');
const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');

const SCROLL_DIR = CONSTS.SCROLL_DIRECTIONS.X;

class HSlide extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div {...this.props} style={Object.assign({}, this.props.style, {display: 'inline-block', height: '100%', width: '100%'})}>
        {this.props.children}
      </div>
    );
  }
};
Slide.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

module.exports = HSlide;