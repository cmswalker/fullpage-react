const React = require('react');

const {Fullpage, Slide, TopNav, SideNav, HorizontalSlider, HorizontalNav, UIEvents} = require('../lib/index');

//TODO: global function for fullpage that will change the slide;
//TODO: can it work for multiple horizontals?

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


let horizontalNavOptions = {
  header: false, //topNav can double as a footer if true
  align: 'center', //also supports center and right alignment

  //styles to apply to children
  activeStyles: {backgroundColor: 'white'},
  hoverStyles: {backgroundColor: 'yellow'},
  nonActiveStyles: {backgroundColor: 'gray'}
};

function fullpageChangeEvent(slide) {
  // console.log('EVT', slide);
}

function horizontalChangeEvent(name, slide) {
  // console.log('EVT', arguments);
}

class FullpageReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullPageActive: 0,
      hover: null
    };
  }

  updateHorizontalActive(newActive) {
    this.setState({activeSlide: newActive});
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

  //TODO: these could be taken down to the next-level of fullpage and the schema, but how to call them from here?

  fullpageCb(fullPageActive) {
    this.setState({fullPageActive: fullPageActive});
  }

  horizontalCb(horizontalActive) {
    this.setState({horizontalActive: horizontalActive});
  }

  getCurrentFullPageActive() {
    return this.state.fullPageActive;
  }

  getCurrentHorizontalActive() {
    return this.state.horizontalActive;
  }

  render() {
    var navCount = 3;
    var navArr = [];
    for (let i = 0; i < navCount; i++) {
      navArr.push(i);
    }

    return (
      <Fullpage onVerticalSlideChange={fullpageChangeEvent} {...fullPageOptions}>

        <TopNav className='topNav' {...topNavOptions}>
          {navArr.map((n, idx) => {
            return <span key={idx} ref={idx} style={this.compareStyles(topNavOptions, idx)}
              onMouseOver={() => this.onMouseOver(idx)} onMouseOut={() => this.onMouseOut()}>Slide {idx}</span>
          }, this)}
        </TopNav>

        <Slide style={{backgroundColor: '#61DAFB'}}>
          <div id="title">___</div>
        </Slide>

        <HorizontalSlider name={'horizontalSlider1'} onHorizontalChange={horizontalChangeEvent} style={{textAlign: 'center', fontSize: '30px'}}>
          <HorizontalNav style={{position: 'absolute', paddingTop: '50%'}}>
            {[1,2,3].map((n, idx) => {
              return <span key={idx}>idx</span>
            })}
          </HorizontalNav>
          <Slide style={{backgroundColor: 'green'}}>1</Slide>
          <Slide style={{backgroundColor: 'white'}}>2</Slide>
          <Slide style={{backgroundColor: 'purple'}}>3</Slide>
        </HorizontalSlider>

        <HorizontalSlider name={'horizontalSlider2'} onHorizontalChange={horizontalChangeEvent} style={{textAlign: 'left', fontSize: '30px'}}>
          <Slide style={{backgroundColor: 'orange'}}>1</Slide>
          <Slide style={{backgroundColor: 'yellow'}}>2</Slide>
          <Slide style={{backgroundColor: 'purple'}}>3</Slide>
        </HorizontalSlider>

        <Slide style={{backgroundColor: '#61DAFB'}}></Slide>
        <Slide style={{backgroundColor: 'green'}}></Slide>

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
