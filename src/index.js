const React = require('react');
const ReactDOM = require('react-dom');

const Fullpage = require('./app');
console.log('full', Fullpage);

ReactDOM.render(
  <Fullpage/>,
  document.getElementById('app')
)
