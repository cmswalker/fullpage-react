const React = require('react');
const {Fullpage, Slide} = require('../index');

class FullpageExample extends React.Component {
  render() {
    return (
      <Fullpage>
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
    );
  }
};

module.exports = FullpageExample;
