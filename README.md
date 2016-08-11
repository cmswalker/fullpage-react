#Fullpage-React

Demo can be found [here](https://cmswalker.github.io/fullpage-react/)

A larger example setup can be found [here](https://github.com/cmswalker/fullpage-react/blob/gh-pages/examples/fullpageReactExample.js)

---

####Basic Setup
```
npm install fullpage-react
```
Each component from Fullpage-React requires its own block of options
######Component Option Boilerplate

```
const React = require('react');

const {Fullpage, Slide, TopNav, SideNav} = require('fullpage-react');

let fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 100 is default
  threshold: 100,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 100 is default
  sensitivity: 100
};

let topNavOptions = {
  footer: false, //topNav can double as a footer if true
  align: 'left', //also supports center and right alignment

  //styles to apply to children
  activeStyles: {backgroundColor: 'white'},
  hoverStyles: {backgroundColor: 'yellow'},
  nonActiveStyles: {backgroundColor: 'gray'}
};

// all children are spans by default, for stacked buttons,
// just wrap your nested components/buttons in divs
let sideNavOptions = {
  right: '2%', //left alignment is default
  top: '50%', //top is 50% by default

  //styles to apply to children
  activeStyles: {color: 'white'},
  hoverStyles: {color: 'yellow'},
  nonActiveStyles: {color: 'gray'}
};
```
######Fullpage Component Boilerplate

The Component Itself Allows all content to be placed within Slide components as well as whatever iterators you want for TopNav and SideNav.

*NOTE: In the render method, navCount should equal the same amount of Slides you wish to use in order to ensure proper nav click/hover behavior*

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

  onMouseOver(idx) {
    this.setState({'hover': idx});
  }

  onMouseOut(e) {
    this.setState({'hover': null});
  }

  compareStyles(component, idx) {
    return idx == this.state.active ? component.activeStyles : idx == this.state.hover ? component.hoverStyles : component.nonActiveStyles
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
######Rendering/Customization
Active/Hover state can be applied either functionally like in this demo, or just by passing classNames or Ids to your iterators.

example:
This method works for those that prefer to change user interaction with Nav within react itself.
```
<TopNav className='topNav' {...topNavOptions}>
  {navArr.map((n, idx) => {
    return <span key={idx} ref={idx} style={this.compareStyles(topNavOptions, idx)}
      onMouseOver={() => this.onMouseOver(idx)} onMouseOut={() => this.onMouseOut()}>Slide {idx}</span>
  }, this)}
</TopNav>
```
But this works just fine too, if you'd rather handle it from the DOM/CSS
```
<TopNav className='topNav' {...topNavOptions}>
  {navArr.map((n, idx) => {
    return <span className="topNavButton" key={idx} ref={idx}>Slide {idx}</span>
  }, this)}
</TopNav>

//CSS
.topNavButton:hover {
  color: green;
}
```

Each Component from Fullpage-React contains a class to grab after render by default but these can be overridden.
```
<TopNav className='myCustomTopNav' {...topNavOptions}> //defaults to 'topNav' if none is provided
  {navArr.map((n, idx) => {
    return <span key={idx} ref={idx}>Slide {idx}</span>
  }, this)}
</TopNav>
```

---
####Roadmap
- Implement horizontal sliders
- UI Tests
