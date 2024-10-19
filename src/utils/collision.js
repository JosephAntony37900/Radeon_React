export const collision = ({ object1, object2 }) => {
    if (!object1 || !object2) return false; // Evitar errores si los objetos son undefined
  
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.y + object1.height > object2.y
    );
  };
  
  
  export function platformCollision({ object1, object2 }) {
    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y + object1.height <=
        object2.position.y + object2.height &&
      object1.position.x <= object2.position.x + object2.width &&
      object1.position.x + object1.width >= object2.position.x
    );
  }
  