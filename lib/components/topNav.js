const React = require('react');
const Tappable = require('react-tappable');

const events = require('../utils/events');
const renderUtils = require('../utils/renderUtils');

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultClass: this.props.footer ? 'bottomNav' : 'topNav'
    }
  }

  goToSlide(slide) {
    events.pub('Fullpage', slide);
  }

  render() {
    let styles = {
      position: 'fixed',
      width: '100%',
      zIndex: '1',
      cursor: 'pointer',

      //defaults
      textAlign: 'left',
      top: '0'
    };

    if (this.props.footer) {
      styles.bottom = '0';
      delete styles.top;
    }

    if (this.props.align === 'right') {
      styles.textAlign = 'right';
    } else if (this.props.align === 'center') {
      styles.textAlign = 'center';
    }

    return (
      <div className={renderUtils.defaultClass.call(this)} style={styles}>
        {this.props.children.map((child, idx) => {
          return <Tappable key={idx} onTap={this.goToSlide.bind(this, child.ref)} onClick={this.goToSlide.bind(this, child.ref)}>{child}</Tappable>
        }, this)}
      </div>
    );
  }
};

module.exports = TopNav;
