const React = require('react');

const {Fullpage, Slide, TopNav, TopNavButton, SideNav, SideNavButton} = require('../index');

//TODO: rename topnav to header and make a real footer;
//make hover styles work again!

let fullPageOptions = {

};

let slideOptions = {

};

let topNavOptions = {

};

let sideNavOptions = {

};


class FullpageReact extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fullpage>
        <TopNav {...topNavOptions}>
          <button ref={0}>slide 0</button>
          <button ref={1}>slide 1</button>
        </TopNav>
        <Slide style={{background: '#61DAFB'}}></Slide>
        <Slide style={{background: '#2B2C28'}}></Slide>
        <Slide style={{background: '#EFCB68'}}></Slide>
        <SideNav {...sideNavOptions}>
          <button ref={0}>slide 0</button>
          <button ref={1}>slide 1</button>
          <button ref={2}>slide 2</button>
        </SideNav>
      </Fullpage>
    );
  }
};

module.exports = FullpageReact;
