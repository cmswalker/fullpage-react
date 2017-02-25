const React = require('react');

const utils = require('../utils');
const { renderUtils } = utils;
const { defaultClass } = renderUtils;

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'Overlay';
  }

  render() {
    let overlayStyle = {position: 'absolute', width: '100%'};
    let style = Object.assign({}, overlayStyle, this.props.style);

    return (
      <div className={defaultClass.call(this)} style={style}>
        {this.props.children}
      </div>
    );
  }
}
Overlay.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

module.exports = Overlay;
