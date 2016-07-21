const React = require('react');
const classNames = require('classnames');

const TopNavButton = require('./topNavButton');
require('./styles.css');

class topNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: this.props.side === 'right' ? 'right' : this.props.side === 'left' ? 'left' : 'center'
    };

    this.goToSlide = this.goToSlide.bind(this);
  }

  goToSlide(slide) {
    this.props.goToSlide(slide);
  }

  render() {
    let classes = classNames({
      'topnav': true,
      'topnav-right': this.state.side === 'right' ? true : false,
      'topnav-left': this.state.side === 'left' ? true : false,
      'topnav-center': this.state.side === 'center' ? true : false
    });

    return (
      <div className={classes}>
        {this.props.slides.map(function(s, idx) {
          return <TopNavButton key={idx} slide={idx} parentCallback={this.goToSlide}>O</TopNavButton>
        }.bind(this))}
      </div>
    );
  }
};

module.exports = topNav;
