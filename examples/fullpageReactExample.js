const React = require('react');

const {Fullpage, Slide, TopNav, SideNav, HorizontalSlider} = require('../lib/index');

//TODO: use the nodes on fullpage vs document
//TODO: surface onclick goTo functionality HERE

require('./exampleStyles.styl');

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
    super(props);
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
    var navCount = 3;
    var navArr = [];
    for (let i = 0; i < navCount; i++) {
      navArr.push(i);
    }

    return (
      <Fullpage active={this.updateActiveState} {...fullPageOptions}>

        <TopNav className='topNav' {...topNavOptions}>
          {navArr.map((n, idx) => {
            return <span key={idx} ref={idx} style={this.compareStyles(topNavOptions, idx)}
              onMouseOver={() => this.onMouseOver(idx)} onMouseOut={() => this.onMouseOut()}>Slide {idx}</span>
          }, this)}
        </TopNav>
        <Slide style={{backgroundColor: '#61DAFB'}}>
          <div id="title">Fullpage React</div>
        </Slide>
        <Slide style={{backgroundColor: 'green'}}>
          <HorizontalSlider style={{textAlign: 'center', fontSize: '30px'}}>
            <Slide>1</Slide>
            <Slide>2</Slide>
            <Slide>3</Slide>
          </HorizontalSlider>
        </Slide>

        <Slide style={{backgroundColor: '#EFCB68'}}></Slide>

        <SideNav {...sideNavOptions}>
          {navArr.map((n, idx) => {
            return <div key={idx} ref={idx} style={this.compareStyles(sideNavOptions, idx)}
              onMouseOver={() => this.onMouseOver(idx)} onMouseOut={() => this.onMouseOut()}>&#x25CF;</div>
          }, this)}
        </SideNav>

      </Fullpage>
    );
  }
}

module.exports = FullpageReact;

function log(msg) {
  console.log(msg)
}
