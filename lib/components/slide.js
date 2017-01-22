const React = require('react');
const Tappable = require('react-tappable');

const noOp = function() {};

class Slide extends React.Component {
  constructor(props) {
    super(props);
    var p = this.props;
  }
  render() {
    return (
      <div {...this.props} style={Object.assign({}, this.props.style, {height: '100%'})}>
        {this.props.children}
      </div>
    );
  }
}
Slide.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

module.exports = Slide;
