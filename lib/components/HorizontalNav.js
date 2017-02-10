const React = require('react');

class HorizontalNav extends React.Component {
  constructor(props) {
    super(props);
    var p = this.props;
  }
  render() {
    var style = Object.assign({}, this.props.style);
    return (
      <div className="HorizontalNav" {...this.props} style={style}>
        {this.props.children}
      </div>
    );
  }
}
HorizontalNav.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

module.exports = HorizontalNav;
