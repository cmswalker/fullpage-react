const React = require('react');

class Slide extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div {...this.props} style={Object.assign({}, this.props.style, {height: '100%'})}>
        {this.props.children}
      </div>
    );
  }
};
Slide.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

module.exports = Slide;
