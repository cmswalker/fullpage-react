const React = require('react');
const classNames = require('classnames');

const SideNavButton = require('./sideNavButton');
require('./styles.css');

//TODO: make sure there is margin right or left so the nav doesnt get lost behind the scroll bars
class sideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: this.props.side === 'right' ? 'right' : 'left'
    };

    this.goToSlide = this.goToSlide.bind(this);
  }

  goToSlide(slide) {
    this.props.goToSlide(slide);
  }

  render() {
    let classes = classNames({
      'sidenav': true,
      'sidenav-right': this.state.side === 'right' ? true : false,
      'sidenav-left': this.state.side === 'left' ? true : false
    });

    return (
      <div className={classes}>
        {this.props.slides.map(function(s, idx) {
          return <SideNavButton key={idx} slide={idx} parentCallback={this.goToSlide}>O</SideNavButton>
        }.bind(this))}
      </div>
    );
  }
};

module.exports = sideNav;
