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
  align: 'left', //also supports center and right alignment
  //styles to apply to children
  activeStyles: {backgroundColor: 'white'},
  nonActiveStyles: {backgroundColor: 'gray'}
};

// all children are spans by default, for stacked buttons,
// just wrap your nested components/buttons in divs
let sideNavOptions = {
  right: '2%', //left alignment is default
  top: '50%', //top is 50% by default

  //styles to apply to children
  activeStyles: {color: 'white'},
  nonActiveStyles: {color: 'gray'}
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
    this.setState({'active': newActive});
  }

  shouldComponentUpdate(nP, nS) {
    return nS.active != this.state.active;
  }

  componentWillUpdate() {

  }

  render() {
    let navCount = 3;
    let navArr = [];
    for (let i = 0; i < 3; i++) {
      navArr.push(i);
    }

    return (
      <Fullpage active={this.updateActiveState}>

        <TopNav {...topNavOptions}>
          {navArr.map((n, idx) => {
            return <span key={idx} ref={idx} style={idx == this.state.active ? topNavOptions.activeStyles : topNavOptions.nonActiveStyles}>Slide {idx}</span>
          }, this)}
        </TopNav>

        <Slide style={{backgroundColor: '#61DAFB'}}></Slide>
        <Slide style={{backgroundColor: '#2B2C28'}}></Slide>
        <Slide style={{backgroundColor: '#EFCB68'}}></Slide>

        <SideNav {...sideNavOptions}>
          {navArr.map((n, idx) => {
            return <div key={idx} ref={idx} style={idx == this.state.active ? sideNavOptions.activeStyles : sideNavOptions.nonActiveStyles}>&#x25CF;</div>
          }, this)}
        </SideNav>

      </Fullpage>
    );
  }
};

module.exports = FullpageReact;
