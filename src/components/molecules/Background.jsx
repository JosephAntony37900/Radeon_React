import React from 'react';

const Background = ({ src, position }) => {
  return (
    <img
      src={src}
      alt="background"
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '1024px',
        height: '576px',
        objectFit: 'cover',
      }}
    />
  );
};

export default Background;
