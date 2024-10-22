import React, { useEffect, useState, useRef } from 'react';
import Background from '../molecules/Background';
import Player from '../atoms/Player';
import backgroundImage from '/public/img/background.png';
import { platforms } from '../../utils/platforms';
import { collision } from '../../utils/collision';

const GameCanvas = () => {
  const playerInitialPosition = { x: 50, y: 500 };
  const [playerPosition, setPlayerPosition] = useState(playerInitialPosition);
  const [playerVelocity, setPlayerVelocity] = useState({ x: 0, y: 1 });
  const [playerAnimation, setPlayerAnimation] = useState('Idle');
  const canvasRef = useRef(null);
  const gravity = 0.5;

  const keys = {
    d: useRef(false),
    a: useRef(false),
    w: useRef(false),
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'd':
        keys.d.current = true;
        setPlayerAnimation('Run');
        break;
      case 'a':
        keys.a.current = true;
        setPlayerAnimation('Run');
        break;
      case 'w':
        if (playerVelocity.y === 0) {
          setPlayerVelocity((prev) => ({ ...prev, y: -10 }));
          setPlayerAnimation('Jump');
        }
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'd':
        keys.d.current = false;
        setPlayerAnimation('Idle');
        break;
      case 'a':
        keys.a.current = false;
        setPlayerAnimation('Idle');
        break;
      case 'w':
        keys.w.current = false;
        break;
      default:
        break;
    }
  };

  const updatePosition = () => {
    setPlayerPosition((prevPosition) => {
      let newPosition = { ...prevPosition };
      let newVelocity = { ...playerVelocity };

      if (keys.d.current) {
        newVelocity.x = 2;
      } else if (keys.a.current) {
        newVelocity.x = -2;
      } else {
        newVelocity.x = 0;
      }

      newVelocity.y += gravity;

      newPosition.x += newVelocity.x;
      newPosition.y += newVelocity.y;

      if (newPosition.x < 0) newPosition.x = 0;
      if (newPosition.x + 50 > 1024) newPosition.x = 1024 - 50;
      if (newPosition.y < 0) newPosition.y = 0;
      if (newPosition.y + 50 > 576) newPosition.y = 576 - 50;

      let onGround = false;
      platforms.forEach((platform) => {
        if (collision({ object1: { ...newPosition, width: 50, height: 50 }, object2: platform })) {
          if (newVelocity.y > 0) {
            newVelocity.y = 0;
            newPosition.y = platform.y - 50;
            onGround = true;
            setPlayerAnimation('Idle');
          } else if (newVelocity.y < 0) {
            newVelocity.y = 0;
            newPosition.y = platform.y + platform.height;
          }
        }
      });

      if (!onGround) {
        newVelocity.y += gravity;
      }

      setPlayerVelocity(newVelocity);
      return newPosition;
    });
  };

  const draw = (context) => {
    context.clearRect(0, 0, 1024, 576);
    context.fillStyle = 'black';
    context.fillRect(0, 0, 1024, 576);

    platforms.forEach((platform) => {
      context.fillStyle = 'green';
      context.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    context.fillStyle = 'red';
    context.fillRect(playerPosition.x, playerPosition.y, 50, 50);

    updatePosition();
  };

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    const gameLoop = () => {
      draw(context);
      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Background src={backgroundImage} position={{ x: 0, y: 0 }} />
      <canvas ref={canvasRef} width={1024} height={576} />
      <Player position={playerPosition} animation={playerAnimation} />
    </div>
  );
};

export default GameCanvas;
