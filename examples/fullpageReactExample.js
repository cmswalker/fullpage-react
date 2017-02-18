const React = require('react');

const {Fullpage, Slide, TopNav, SideNav, HorizontalSlider, changeHorizontalSlide, changeFullpageSlide} = require('../lib/index');

require('./exampleStyles.styl');

let fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 100 is default
  scrollSensitivity: 100,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 100 is default
  touchSensitivity: 100,
  scrollSpeed: 300,
  // resetSlides: true,
  // infinite: true,
  hideScrollBars: true
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

let horizontalSliderProps = {
  name: 'horizontalSlider1',
  scrollSpeed: 300,
  style: {textAlign: 'center', fontSize: '30px'},
  infinite: true,
  // resetSlides: true
};

class FullpageReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      hover: null
    };
  }

  onFullpageChange(state) {
    console.log('fullpage change completed', state.activeSlide);
  }

  onHorizontalChange(slideName, state) {
    console.log('horizontal change completed for ', slideName, state.activeSlide);
  }

  render() {
    let navCount = 3;
    let navArr = [];

    for (var i = 0; i < navCount; i++) {
      navArr.push(i);
    }

    return (
      <Fullpage onFullpageChange={this.onFullpageChange} onHorizontalChange={this.onHorizontalChange} {...fullPageOptions}>

        <TopNav {...topNavOptions}>
          <button onClick={changeHorizontalSlide.bind(null, 'horizontal-1', 'PREV')}>foo bar</button>
          <button onClick={changeHorizontalSlide.bind(null, 'horizontal-1', 'NEXT')}>foo bar</button>
        </TopNav>

        <HorizontalSlider {...horizontalSliderProps} >
          <Slide horizontal={true} style={{backgroundColor: 'green'}}>1</Slide>
          <Slide horizontal={true} style={{backgroundColor: 'gray'}}>2</Slide>
          <Slide horizontal={true} style={{backgroundColor: 'purple'}}>3</Slide>
        </HorizontalSlider>

        <Slide style={{backgroundColor: 'red'}}>
          <video width="500px" controls="true" className="video-container" autoPlay="true" loop="" muted="true" data-reactid=".0.1.0.0">
            <source type="video/mp4" data-reactid=".0.1.0.0.0" src="https://media.w3.org/2010/05/sintel/trailer.mp4"></source>
          </video>
        </Slide>

        <Slide style={{backgroundColor: 'orange'}}>
        </Slide>

        <Slide style={{backgroundColor: 'yellow'}}>
        </Slide>

        <Slide style={{backgroundColor: 'green'}}>
          <img src="http://ichef-1.bbci.co.uk/news/660/cpsprodpb/1325A/production/_88762487_junk_food.jpg"/>
        </Slide>

        <SideNav {...sideNavOptions}>
          <button style={{cursor: 'pointer'}} onTap={changeFullpageSlide.bind(null, 'PREV')}>foo bar</button>
          <button onTap={changeFullpageSlide.bind(null, 'NEXT')}>foo bar</button>
        </SideNav>

      </Fullpage>
    );
  }
}

module.exports = FullpageReact;
