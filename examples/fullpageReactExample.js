const React = require('react');
const {Fullpage, Slide, TopNav, SideNav} = require('../index');

let fullPageOptions = {

};

let slideOptions = {

};

let topNavOptions = {
  bottom: false
};

let sideNavOptions = {
  side: 'right'
};

class FullpageExample extends React.Component {
  render() {
    return (
      <div>
        <TopNav {...topNavOptions}></TopNav>
        <Fullpage>
          <Slide style={{background: '#61DAFB'}}>
            #1
          </Slide>
          <Slide style={{background: '#2B2C28'}}>
            #2
          </Slide>
          <Slide style={{background: '#EFCB68'}}>
            #3
          </Slide>
        </Fullpage>
        <SideNav {...sideNavOptions}>
        </SideNav>
      </div>
    );
  }
};

module.exports = FullpageExample;
