const React = require('react');
const ReactDOM = require('react-dom');

window.React = React;
window.ReactDOM = ReactDOM;

const Fullpage = require('./app');

ReactDOM.render(
  <Fullpage/>,
  document.getElementById('app')
)
