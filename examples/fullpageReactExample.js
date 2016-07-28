const React = require('react');

const {Fullpage, Slide, TopNav, SideNav} = require('../index');
require('./exampleStyles.styl');

let fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 100 is default
  threshold: 100,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 200 is default
  sensitivity: 200
};

let topNavOptions = {
  footer: false, //topNav can double as a footer
  align: 'left' //also supports center and right alignment
};

// all children are spans by default, for stacked buttons,
// just wrap your nested components/buttons in divs
let sideNavOptions = {
  right: '2%', //left alignment is default
  top: '50%' //top is 50% by default
};

let activeStyles = {
  color: 'white'
};

class FullpageReact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0
    };

    this.updateActiveState = this.updateActiveState.bind(this);
  }

  updateActiveState(newActive) {
    // this.setState({'active': newActive});
    console.log('need to set state to ', newActive);
    return;
  }

  componentDidUpdate(pP, pS) {
  }

  render() {
    console.log('rendered');
    let activeColor = '';
    let notActiveColor = '';

    let sideNavButtonStyle = {
      color: 'red'
    };

    let topNavButtonStyle = {

    };

    return (
      <Fullpage active={this.updateActiveState}>

        <TopNav {...topNavOptions}>
          <button ref={0}>slide 0</button>
          <button ref={1}>slide 1</button>
          <button ref={2}>slide 2</button>
        </TopNav>

        <Slide style={{backgroundColor: '#61DAFB'}}></Slide>
        <Slide style={{backgroundColor: '#2B2C28'}}></Slide>
        <Slide style={{backgroundColor: '#EFCB68'}}></Slide>

        <SideNav {...sideNavOptions}>
          <div style={sideNavButtonStyle} ref={0}>&#x25CF;</div>
          <div style={sideNavButtonStyle} ref={1}>&#x25CF;</div>
          <div style={sideNavButtonStyle} ref={2}>&#x25CF;</div>
        </SideNav>

      </Fullpage>
    );
  }
};

module.exports = FullpageReact;
