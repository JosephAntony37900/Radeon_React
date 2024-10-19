import React, { useEffect, useState, useRef } from 'react';
import Canvas from '../atoms/Canvas';
import Background from '../molecules/Background';
import Player from '../atoms/Player';
import backgroundImage from '/public/img/background.png';
import { platforms } from '../../utils/platforms';
import { collision } from '../../utils/collision';

const GameCanvas = () => {
  const playerInitialPosition = { x: 50, y: 50 };
  const [playerPosition, setPlayerPosition] = useState(playerInitialPosition);
  const canvasRef = useRef(null);
  console.log('Player:', playerPosition);
  console.log('Platform:', platforms);
  
  const draw = (context) => {
    context.clearRect(0, 0, 1024, 576); // Limpia el canvas
    context.fillStyle = 'black';
    context.fillRect(0, 0, 1024, 576); // Fondo

    // Dibujar plataformas
    platforms.forEach((platform) => {
      context.fillStyle = 'green';
      context.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Dibujar jugador
    context.fillStyle = 'red';
    context.fillRect(playerPosition.x, playerPosition.y, 50, 50);

    // Verificar colisiones
    platforms.forEach((platform) => {
      if (
        collision({
          object1: { ...playerPosition, width: 50, height: 50 },
          object2: platform,
        })
      ) {
        console.log('Colisión detectada');
      }
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return; // Asegurar que canvasRef no sea null
  
    const context = canvasRef.current.getContext('2d');
  
    const gameLoop = () => {
      draw(context); 
      requestAnimationFrame(gameLoop);
    };
  
    gameLoop();
  
    return () => cancelAnimationFrame(gameLoop); // Limpieza
  }, [playerPosition]); // Dependencia para redibujar cuando cambie la posición del jugador

  return (
    <div style={{ position: 'relative' }}>
      <Background src={backgroundImage} position={{ x: 0, y: 0 }} />
      <canvas ref={canvasRef} width={1024} height={576} />
      <Player position={playerPosition} />
    </div>
  );
};

export default GameCanvas;
