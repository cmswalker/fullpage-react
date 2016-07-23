const React = require('react');
const classNames = require('classnames');

const events = require('../utils/events');

require('./styles.css');

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: this.props.side === 'right' ? 'right' : this.props.side === 'left' ? 'left' : 'center'
    };

    this.goToSlide = this.goToSlide.bind(this);
  }

  goToSlide(slide) {
    events.pub('Fullpage', slide);
  }

  render(props) {
    let classes = classNames({
      'topnav': true,
      'topnav-right': this.state.side === 'right' ? true : false,
      'topnav-left': this.state.side === 'left' ? true : false,
      'topnav-center': this.state.side === 'center' ? true : false
    });

    return (
      <div className={classes}>
        {this.props.children.map((child, idx) => {
          console.log(child);
          return (
            <span key={idx} onClick={this.goToSlide.bind(this, child.ref)}>{child}</span>
          )
        }, this)}
      </div>
    );
  }
};

module.exports = TopNav;
