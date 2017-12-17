import React from 'react';
import PropTypes from 'prop-types';

const Slide = ({style, children}) => {
  return (
    <div style={style} className='fullpage-react-slide'>
      {children}
    </div>
  )
};
Slide.propTypes = {
  style: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Slide;