import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// NOTE: will include static methods after mount
import FullpageReactExample from './fullpageReactExample';

const addCss = (src) => {
  const head = document.head;
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = src;
  head.appendChild(link);
}

const app = document.createElement('div');
document.body.appendChild(app);
document.body.style.margin = 0;

var meta = document.createElement('meta');
meta.setAttribute('http-equiv', 'X-UA-Compatible');
meta.setAttribute('content', 'IE=Edge');
document.getElementsByTagName('head')[0].appendChild(meta);

var meta2 = document.createElement('meta');
meta2.setAttribute('name', 'viewport');
meta2.setAttribute('content', 'width=device-width, initial-scale=1');
document.getElementsByTagName('head')[0].appendChild(meta2);

addCss('https://cdn.jsdelivr.net/npm/fullpage.js@2.9.7/dist/jquery.fullpage.css');

const onChange = (...args) => {
  console.log('changed', ...args);
};
const props = {
  $,
  onLeave: onChange,
  onSlideLeave: onChange
}

ReactDOM.render(
  <FullpageReactExample {...props} />,
  app
);
