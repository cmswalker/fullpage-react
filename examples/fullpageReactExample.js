const React = require('react');

const {Fullpage, Slide, TopNav, SideNav, SideNavButton} = require('../index');

let fullPageOptions = {

};

let slideOptions = {

}


class FullpageReact extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fullpage>
        <Slide style={{background: '#61DAFB'}}></Slide>
        <Slide style={{background: '#2B2C28'}}></Slide>
        <Slide style={{background: '#EFCB68'}}></Slide>
      </Fullpage>
    );
  }
};

module.exports = FullpageReact;
