const React = require('react');

const {Fullpage, Slide, HorizontalSlider, changeHorizontalSlide, changeFullpageSlide} = require('../lib/index');

require('./exampleStyles.styl');

let fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 100 is default
  scrollSensitivity: 100,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 100 is default
  touchSensitivity: 100,
  scrollSpeed: 900,
  resetSlides: false,
  infinite: true,
  hideScrollBars: true
};

let topNavStyle = {
  position: 'fixed',
  width: '100%',
  zIndex: '1',
  cursor: 'pointer',

  //defaults
  textAlign: 'left',
  top: '0'
};

// all children are spans by default, for stacked buttons,
// just wrap your nested components/buttons in divs
let horizontalNavPlaceholder = {
  position: 'relative',
  left: '50%',
  top: '50%',
  zIndex: 1
};
let horizontalNavStyle = {
  position: 'relative',
  // left: '50%',
  top: '50%',
  // zIndex: '1'
};

let horizontalSliderProps = {
  name: 'horizontalSlider1',
  scrollSpeed: 300,
  style: {textAlign: 'center', fontSize: '30px'},
  infinite: true,
  resetSlides: false
};

class FullpageReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        Fullpage: 0,
        horizontalSlider1: 0,
      },
      previous: {
        Fullpage: 0,
        horizontalSlider1: 0
      }
    };

    this.onSlideChangeStart = this.onSlideChangeStart.bind(this);
    this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);
  }

  onSlideChangeStart(name, state) {
    // console.log('slide STARTED for', name, state.activeSlide);
    var sliderState = { previous: {} };
    sliderState.previous[name] = state.activeSlide;
    this.setState(sliderState);
  }

  onSlideChangeEnd(name, state) {
    // console.log('slide ENDED for', name, state.activeSlide);
    var sliderState = { active: {} };
    sliderState.active[name] = state.activeSlide;
    // horizontalNavStyle.position = 'fixed';
    // console.log('updated', horizontalNavStyle)
    this.setState(sliderState);
  }

  render() {
    const { state } = this;

    let asdf = horizontalNavStyle;

    // if (state.active.Fullpage === 1) {
    //   asdf =horizontalNavStyle;
    // } else {
    //   asdf = horizontalNavPlaceholder;
    // }

    let horizontalNav = (
      <div style={Object.assign({}, asdf)}>
        <button onClick={changeHorizontalSlide.bind(null, 'horizontalSlider1', 'PREV')}>a</button>
        <button onClick={changeHorizontalSlide.bind(null, 'horizontalSlider1', 'NEXT')}>b</button>
      </div>
    );

    return (
      <Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions}>



        <Slide style={{backgroundColor: 'red'}}>
          <video width="500px" controls="true" className="video-container" autoPlay="true" loop="" muted="true" data-reactid=".0.1.0.0">
            <source type="video/mp4" data-reactid=".0.1.0.0.0" src="https://media.w3.org/2010/05/sintel/trailer.mp4"></source>
          </video>
        </Slide>

        <HorizontalSlider {...horizontalSliderProps} >
          <Slide horizontal={true} style={{backgroundColor: 'green'}}>1
          </Slide>
          <Slide horizontal={true} style={{backgroundColor: 'gray'}}>2</Slide>
          <Slide horizontal={true} style={{backgroundColor: 'purple'}}>3</Slide>
          {horizontalNav}
        </HorizontalSlider>

        <Slide style={{backgroundColor: 'orange'}}>
        </Slide>

        <Slide style={{backgroundColor: 'yellow'}}>
        </Slide>

        <Slide style={{backgroundColor: 'green'}}>
          <img src="http://ichef-1.bbci.co.uk/news/660/cpsprodpb/1325A/production/_88762487_junk_food.jpg"/>
        </Slide>

      </Fullpage>
    );
  }
}

module.exports = FullpageReact;
