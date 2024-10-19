import React, { useEffect, useState } from 'react';

const Player = ({ position, width = 50, height = 50, color = 'red' }) => {
  const [playerPos, setPlayerPos] = useState(position);

  // Actualiza la posición del jugador según la tecla presionada
  useEffect(() => {
    const handleMovement = (event) => {
      setPlayerPos((prev) => {
        switch (event.key) {
          case 'd':
            return { ...prev, x: prev.x + 10 };
          case 'a':
            return { ...prev, x: prev.x - 10 };
          case 'w':
            return { ...prev, y: prev.y - 10 };
          case 's':
            return { ...prev, y: prev.y + 10 };
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleMovement);
    return () => window.removeEventListener('keydown', handleMovement);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: color,
        width: `${width}px`,
        height: `${height}px`,
        top: `${playerPos.y}px`,
        left: `${playerPos.x}px`,
      }}
    />
  );
};

export default Player;
