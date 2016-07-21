const React = require('react');
const {Fullpage, Slide, TopNav, SideNav, SideNavButton} = require('../index');

//TODO: we should import goToSlide and apply it all the way down here through options?

let fullPageOptions = {

};

let slideOptions = {

};

let topNavOptions = {
  bottom: false
};

let sideNavOptions = {
  side: 'right',
  slides: [0,1,2]
};

class FullpageExample extends React.Component {
  constructor(props) {
    super(props)
  }

  goToSlideDispatch(e) {
    console.log('global', e);
  }

  render() {
    return (
      <div>
        <TopNav {...topNavOptions}></TopNav>
        <Fullpage {...fullPageOptions}>
          <Slide style={{background: '#61DAFB'}}>
            #1
          </Slide>
          <Slide style={{background: '#2B2C28'}}>
            #2
          </Slide>
          <Slide style={{background: '#EFCB68'}}>
            #3
          </Slide>
        </Fullpage>
        <SideNav {...sideNavOptions} goToSlide={this.goToSlideDispatch}>

        </SideNav>
      </div>
    );
  }
};

module.exports = FullpageExample;
