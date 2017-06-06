import React from 'react';
import ReactDOM from 'react-dom';
import FullpageReactExample from './fullpageReactExample';

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

ReactDOM.render(
  <FullpageReactExample />,
  app
);
