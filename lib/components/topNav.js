const React = require('react');
require('./styles.css');

class topNav extends React.Component {
  constructor(props) {
    super(props);
    console.log('TOPNAV', this);
  }
  render() {
    return (
      <div id="topnav">
        <span href="#page1" className="topnav-icons" aria-hidden="true"></span>
        <span href="#page2" className="topnav-icons" aria-hidden="true"></span>
        <span href="#page3" className="topnav-icons" aria-hidden="true"></span>
      </div>
    );
  }
};

module.exports = topNav;
