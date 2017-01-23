const React = require('react');

class Slide extends React.Component {
  constructor(props) {
    super(props);
    var p = this.props;
  }
  render() {
    var style = Object.assign({}, this.props.style, {height: '100%'});
    return (
      <div {...this.props} style={style}>
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
