import React, { useRef, useEffect } from 'react';

const Canvas = ({ draw, width = 1024, height = 576 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
