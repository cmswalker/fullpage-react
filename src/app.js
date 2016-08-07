const React = require('react');

const {Fullpage, Slide, TopNav, SideNav} = require('fullpage-react');
require('normalize.css');
require('./styles/main.styl');

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

class FullpageReact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      hover: null
    };

    this.updateActiveState = this.updateActiveState.bind(this);
  }

  updateActiveState(newActive) {
    this.setState({'active': newActive});
  }

  shouldComponentUpdate(nP, nS) {
    //ensure hoverStyles and activeStyles update
    return nS.active != this.state.active || nS.hover != this.state.hover;
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
            return <span key={idx} ref={idx} style={this.compareStyles(topNavOptions, idx)}
              onMouseOver={() => this.onMouseOver(idx)} onMouseOut={() => this.onMouseOut(idx)}>Slide {idx}</span>
          }, this)}
        </TopNav>

        <Slide id="slide1" className="slide" style={{backgroundColor: '#61DAFB'}}>
          <div className="arrow-up arrow-up-2 arrow-title-1"></div>
          <div className="arrow-up arrow-up-2 arrow-title-2"></div>
          <div className="arrow-up arrow-up-2 arrow-title-3"></div>
          <div id="title">Fullpage React</div>
        </Slide>
        <Slide id="slide2" className="slide" style={{backgroundColor: '#2B2C28'}}>
          <div id="title">100% React components, no jQuery</div>
          <div className="arrow-up abs-top top-100"></div>
        </Slide>
        <Slide id="slide3" className="slide" style={{backgroundColor: '#EFCB68'}}>
          <div id="title">Mobile friendly! Tap events for iOS and Android</div>
          <div className="arrow-up arrow-up-2 abs-top top-200"></div>
        </Slide>

        <SideNav {...sideNavOptions}>
          {navArr.map((n, idx) => {
            return <div key={idx} ref={idx} style={this.compareStyles(sideNavOptions, idx)}
                     onMouseOver={() => this.onMouseOver(idx)} onMouseOut={() => this.onMouseOut(idx)}>&#x25CF;</div>
          }, this)}
        </SideNav>

      </Fullpage>
    );
  }
};

module.exports = FullpageReact;
