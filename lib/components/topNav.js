const React = require('react');
const Tappable = require('react-tappable');

const events = require('../utils/events');

class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  goToSlide(slide) {
    events.pub('Fullpage', slide);
  }

  render() {
    let styles = {
      position: 'fixed',
      width: '100%',
      zIndex: '1',
      //defaults
      textAlign: 'left',
      top: '0'
    };

    if (this.props.footer) {
      styles.bottom = '0';
    }

    if (this.props.align === 'right') {
      styles.textAlign = 'right';
    } else if (this.props.align === 'center') {
      styles.textAlign = 'center';
    }

    return (
      <span style={styles}>
        {this.props.children.map((child, idx) => {
          return <Tappable key={idx} onTap={this.goToSlide.bind(this, child.ref)} onClick={this.goToSlide.bind(this, child.ref)}>{child}</Tappable>
        }, this)}
      </span>
    );
  }
};

module.exports = TopNav;
