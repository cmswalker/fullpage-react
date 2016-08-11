const React = require('react');
const Tappable = require('react-tappable');

const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');

let styles = {
  position: 'fixed',
  zIndex: '1',
  cursor: 'pointer',

  //defaults
  top: '50%',
  left: '1%'
};

class sideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: this.props.side === 'right' ? 'right' : 'left',
      currentStyles: styles,
      defaultClass: 'sideNav'
    };

    this.goToSlide = this.goToSlide.bind(this);
    this.updateStyles = this.updateStyles.bind(this);
  }

  updateStyles(styles) {
    this.state.currentStyles = styles;
  }

  goToSlide(slide) {
    events.sub('Fullpage', slide);
  }

  render() {
    if (this.props.top) {
      this.state.currentStyles.top = this.props.top;
    }

    if (this.props.right) {
      this.state.currentStyles.right = this.props.right;
      delete this.state.currentStyles.left;
    } else {
      this.state.currentStyles.left = this.props.left || styles.left;
    }

    return (
      <div className={renderUtils.defaultClass.call(this)} style={this.state.currentStyles}>
        {this.props.children.map((child, idx) => {
          return (
            <Tappable key={idx} onTap={this.goToSlide.bind(this, child.ref)} onClick={this.goToSlide.bind(this, child.ref)}>{child}</Tappable>
          )
        }, this)}
      </div>
    );
  }
};

module.exports = sideNav;
