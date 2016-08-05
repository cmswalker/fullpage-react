#Fullpage-React

Demo can be found [here](https://cmswalker.github.io/fullpage-react/)

A larger example setup can be found [here](https://github.com/cmswalker/fullpage-react/blob/gh-pages/examples/fullpageReactExample.js)

---

####Basic Setup
```
npm install fullpage-react
```
Each component from Fullpage-React should get its own block of options
######Component Options

```
const React = require('react');

const {Fullpage, Slide, TopNav, SideNav} = require('../index');

let fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile  
  threshold: 100, //default

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile
  sensitivity: 100 // default
};

let topNavOptions = {
  footer: false, //topNav can double as a footer if true
  align: 'left', //also supports center and right alignment
};

// all children are spans by default, for stacked buttons:
// just wrap your nested components/buttons in divs
let sideNavOptions = {
  right: '2%', //left alignment is default
  top: '50%', //top is 50% by default
};
```
######Fullpage Component

The Component Itself Allows all content to be placed within Slide components as well as whatever iterators you want for TopNav and SideNav.

*NOTE: In the render method, navCount should equal the same amount of Slides you choose to use in order to ensure proper nav click/hover behavior*

```
class FullpageReact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {active: 0};

    this.updateActiveState = this.updateActiveState.bind(this);
  }

  updateActiveState(newActive) {
    this.setState({'active': newActive});
  }

  shouldComponentUpdate(nP, nS) {
    //ensure hoverStyles and activeStyles update
    return nS.active != this.state.active;
  }

  render() {
    let navCount = 3;
    let navArr = [];
    for (let i = 0; i < navCount; i++) {
      navArr.push(i);
    }

    return (
      <Fullpage active={this.updateActiveState}>

        <TopNav {...topNavOptions}>
          {navArr.map((n, idx) => {
            return <span key={idx} ref={idx}>Slide {idx}</span>
          }, this)}
        </TopNav>

        <Slide style={{backgroundColor: '#61DAFB'}}>
          <div id="title">Fullpage React</div>
        </Slide>
        <Slide style={{backgroundColor: '#2B2C28'}}></Slide>
        <Slide style={{backgroundColor: '#EFCB68'}}></Slide>

        <SideNav {...sideNavOptions}>
          {navArr.map((n, idx) => {
            return <div key={idx} ref={idx}>&#x25CF;</div>
          }, this)}
        </SideNav>

      </Fullpage>
    );
  }
};

module.exports = FullpageReact;
```

---
####Roadmap
- Implement horizontal sliders
- UI Tests
