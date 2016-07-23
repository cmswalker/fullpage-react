const React = require('react');
const classNames = require('classnames');

const events = require('../utils/events');
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
    events.pub('Fullpage', slide);
  }

  render() {
    let classes = classNames({
      'sidenav': true,
      'sidenav-right': this.state.side === 'right' ? true : false,
      'sidenav-left': this.state.side === 'left' ? true : false
    });

    return (
      <div className={classes}>
        {this.props.children.map((child, idx) => {
          return (
            <span key={idx} onClick={this.goToSlide.bind(this, child.ref)}>{child}</span>
          )
        }, this)}
      </div>
    );
  }
};

module.exports = sideNav;
