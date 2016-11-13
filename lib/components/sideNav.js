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

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: this.props.right ? 'right' : 'left',
      currentStyles: styles,
      defaultClass: 'sideNav'
    };

    this.goToSlide = this.goToSlide.bind(this);
    this.updateStyles = this.updateStyles.bind(this);
  }

  updateStyles(styles) {
    this.setState({currentStyles: styles});
  }

  goToSlide(slide) {
    events.sub('Fullpage', slide);
  }

  componentWillMount() {
    if (this.props.top) {
      this.setState((prevState, props) => {
        let styles = prevState.currentStyles;
        styles.top = props.top;

        return {
          currentStyles: styles
        }
      });
    }

    if (this.props.right) {
      this.setState((prevState, props) => {
        let styles = prevState.currentStyles;
        styles.right = props.right;
        delete styles.left;

        return {
          currentStyles: styles
        }
      });

    } else {
      this.setState((prevState, props) => {
        let styles = prevState.currentStyles;
        styles.left = props.left;

        return {
          currentStyles: styles
        }
      });
    }
  }

  render() {
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
}
SideNav.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  top: React.PropTypes.string,
  left: React.PropTypes.string,
  right: React.PropTypes.string
};

module.exports = SideNav;
