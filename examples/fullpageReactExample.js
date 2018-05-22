import React from 'react';

import FullpageReact from '../lib';

require('./normalize.css');
require('./skeleton.css');
require('./exampleStyles.styl');

const FullpageReactExample = (props) => {
  return (
    <FullpageReact {...props} render={(staticMethods, state) => {
      return (
        <div>
          <div className="section dark-blue">
            <p>Section 1</p>
          </div>
          <div className="section">
            <div className="slide blue"><p>Slide 1</p></div>
            <div className="slide red"><p>Slide 2</p></div>
            <div className="slide yellow"><p>Slide 3</p></div>
          </div>
          <div className="section green">
            <p>Section 3</p>
          </div>
        </div>
      );
    }} />
  )
}

export default FullpageReactExample;
