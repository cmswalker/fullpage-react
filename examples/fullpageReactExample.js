const React = require('react');

const {Fullpage, Slide, TopNav, SideNav} = require('../index');

//TODO:
//RENAME PUB SUB METHODS
//make truthy classes non object/bools
//sensitivity
//renamve topNavOptions to just mainNav
//try not to access refs, try to use SLIDE

let fullPageOptions = {
  sensitivity: null,
  threshold: null
};

let topNavOptions = {
  footer: true,
  align: 'left'
};

let sideNavOptions = {
  //left vs right
  //top
};

class FullpageReact extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fullpage>
        <TopNav {...topNavOptions}>
          <button style={{cursor: 'pointer'}} ref={0}>slide 0</button>
          <button ref={1}>slide 1</button>
          <button ref={2}>slide 2</button>
        </TopNav>
        <Slide style={{backgroundColor: '#61DAFB'}}></Slide>
        <Slide style={{backgroundColor: '#2B2C28'}}></Slide>
        <Slide style={{backgroundColor: '#EFCB68'}}></Slide>
        <SideNav {...sideNavOptions}>
          <button ref={0}>slide 0</button>
          <button ref={1}>slide 1</button>
          <button style={{cursor: 'pointer'}} ref={2}>slide 2</button>
        </SideNav>
      </Fullpage>
    );
  }
};

module.exports = FullpageReact;
