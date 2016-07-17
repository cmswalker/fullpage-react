const React = require('react');
const ReactDOM = require('react-dom');
const FullpageReactExample = require('./fullpageReactExample');

const app = document.createElement('div');
document.body.appendChild(app);
document.body.style.margin = 0;

ReactDOM.render(
  <FullpageReactExample />,
  app
);
