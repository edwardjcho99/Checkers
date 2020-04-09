// class defining a CheckerTile
class CheckerTile extends Phaser.GameObjects.Sprite {
  // each tile has a scene, color, position, and image texture
  constructor(scene,color,position,texture){
    super(scene,position.getX() * TILESIZE,position.getY() * TILESIZE,texture);
    scene.add.existing(this);

    this.COLOR = color;
    this.POSITION = position;

    this.setOrigin(0,0);
    this.displayWidth = game.config.width / 8;
    this.scaleY = this.scaleX;

    this.hasPiece = false;

    // setting color of piece
    if (this.COLOR == "black"){
      this.setFrame(15);
    } else {
      this.setFrame(0);
    }
  }

  // highlights tile
  highLight(){
    this.setFrame(7);
  }

  //unhighlights tile
  unhighLight(){
    if (this.COLOR == "black"){
      this.setFrame(15);
    } else {
      this.setFrame(0);
    }
  }

  // checks to see if a point overlaps this sprite
  // returns boolean
  contains(x,y){
    return !(x < this.getPosition().getX() * TILESIZE || x >= this.getPosition().getX() * TILESIZE + TILESIZE ||
            y < this.getPosition().getY() * TILESIZE || y >= this.getPosition().getY() * TILESIZE + TILESIZE);
  }

  getPosition(){
    return this.POSITION;
  }

}
