import React, { useRef } from 'react';
import warriorIdle from '/public/img/warrior/Idle.png';
import warriorRun from '/public/img/warrior/Run.png';
import warriorJump from '/public/img/warrior/Jump.png';
import warriorFall from '/public/img/warrior/Fall.png';

const Player = ({ position, animation }) => {
  const playerRef = useRef(null);
  const animations = {
    Idle: {
      imageSrc: warriorIdle,
    },
    Run: {
      imageSrc: warriorRun,
    },
    Jump: {
      imageSrc: warriorJump,
    },
    Fall: {
      imageSrc: warriorFall,
    }
  };

  const currentAnimation = animations[animation];

  return (
    <div
      ref={playerRef}
      style={{
        position: 'absolute',
        backgroundImage: `url(${currentAnimation.imageSrc})`,
        backgroundSize: 'cover',
        width: '50px',
        height: '50px',
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    />
  );
};

export default Player;
