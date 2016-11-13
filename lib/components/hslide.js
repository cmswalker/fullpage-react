const React = require('react');

const CONSTS = require('./consts');
const Slide = require('./slide');

const scrollTo = require('../utils/scrollTo');
const events = require('../utils/events');


const SCROLL_DIR = CONSTS.SCROLL_DIRECTIONS.X;

class HSlide extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
Slide.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

module.exports = HSlide;
