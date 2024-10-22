export default class Sprite {
    constructor(imagePath, width, height) {
      this.image = new Image();
      this.image.src = imagePath;
      this.width = width;
      this.height = height;
    }
  
    draw(context, x, y) {
      context.drawImage(this.image, x, y, this.width, this.height);
    }
  }
  