const React = require('react');
const classNames = require('classnames');

require('./styles.css');

class TopNavButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };

    this.goToSlide = this.goToSlide.bind(this);
    this.mouseOver = this.mouseOver.bind(this, true);
    this.mouseLeave = this.mouseOver.bind(this, false);
  }

  goToSlide(e) {
    this.props.parentCallback(this.props.slide);
  }

  mouseOver(e, bool) {
    this.setState({'hover': bool});
  }

  render() {
    let classes = classNames({
      'sidenav-button': true,
      'hover': this.state.hover
    });
    return (
      <span className={classes} onClick={this.goToSlide} onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave} aria-hidden="true">
       {this.props.children}
      </span>
    );
  }
};

module.exports = TopNavButton;
