// class defining the CheckerPiece Sprite
class CheckerPiece extends Phaser.GameObjects.Sprite {

  // CheckerPieces have a scene, color, and position
  constructor(scene,color,position){
    super(scene,position.getX() * TILESIZE,position.getY() * TILESIZE,"checkers");
    scene.add.existing(this);

    this.setOrigin(0,0);
    this.displayWidth = game.config.width / 8;
    this.scaleY = this.scaleX;
    this.setFrame(0);

    this.scene = scene;
    this.position = position;
    this.color = color;
    this.king = false;

    this.orientation;

    if (this.color == "black"){
      if (!this.king) this.setFrame(3);
      else this.setFrame(0);
      this.orientation = 1;
    } else {
      if (!this.king) this.setFrame(4);
      else this.setFrame(1);
      this.orientation = -1;
    }
  }

  getPosition(){
    return this.position;
  }

  getColor(){
    return this.color;
  }

  setPos(position){
    this.position = position;
    this.x = this.getPosition().getX() * TILESIZE;
    this.y = this.getPosition().getY() * TILESIZE;
  }

  // returns legal moves for the piece
  // Input: Board
  // Output: array of positions
  getLegalSkips(board){
    var legalSkips = [];

    var pos1 = new Position(this.getPosition().getX()-2,this.getPosition().getY()+this.orientation+this.orientation);
    var skipped1 = new Position(this.getPosition().getX()-1,this.getPosition().getY()+this.orientation);

    if (pos1.isValid() && board.getPiece(skipped1.getX(),skipped1.getY()) != null) {
      if (board.getPiece(pos1.getX(),pos1.getY()) == null &&
          board.getPiece(skipped1.getX(),skipped1.getY()).getColor() != this.getColor()){
        legalSkips.push(pos1);
      }

    }
    var pos2 = new Position(this.getPosition().getX()+2,this.getPosition().getY()+this.orientation+this.orientation);
    var skipped2 = new Position(this.getPosition().getX()+1,this.getPosition().getY()+this.orientation);

    if (pos2.isValid() && board.getPiece(skipped2.getX(),skipped2.getY()) != null) {
      if (board.getPiece(pos2.getX(),pos2.getY()) == null &&
          board.getPiece(skipped2.getX(),skipped2.getY()).getColor() != this.getColor()){
        legalSkips.push(pos2);
      }
    }

    if(this.king == false) return legalSkips;

    //king movements

    var pos3 = new Position(this.getPosition().getX()+2,this.getPosition().getY()-this.orientation-this.orientation);
    var skipped3 = new Position(this.getPosition().getX()+1,this.getPosition().getY()-this.orientation);

    if (pos3.isValid() && board.getPiece(skipped3.getX(),skipped3.getY()) != null) {
      if (board.getPiece(pos3.getX(),pos3.getY()) == null &&
          board.getPiece(skipped3.getX(),skipped3.getY()).getColor() != this.getColor()){
        legalSkips.push(pos3);
      }
    }

    var pos4 = new Position(this.getPosition().getX()-2,this.getPosition().getY()-this.orientation-this.orientation);
    var skipped4 = new Position(this.getPosition().getX()-1,this.getPosition().getY()-this.orientation);

    if (pos4.isValid() && board.getPiece(skipped4.getX(),skipped4.getY()) != null) {
      if (board.getPiece(pos4.getX(),pos4.getY()) == null &&
          board.getPiece(skipped4.getX(),skipped4.getY()).getColor() != this.getColor()){
        legalSkips.push(pos4);
      }
    }
    return legalSkips;

  }

  // finds legal moves for the piece
  // Input: Board
  // Output: array of positions
  getLegalMoves(board){
    var legalMoves = [];
    var pos1 = new Position(this.getPosition().getX()-1,this.getPosition().getY()+this.orientation);
    if (pos1.isValid()) {
      if (board.getPiece(pos1.getX(),pos1.getY()) == null){
        legalMoves.push(pos1);
      }
    }

    var pos2 = new Position(this.getPosition().getX()+1,this.getPosition().getY()+this.orientation);
    if (pos2.isValid()) {
      if (board.getPiece(pos2.getX(),pos2.getY()) == null){
        legalMoves.push(pos2);
      }
    }

    if(this.king){
      var pos4 = new Position(this.getPosition().getX()-1,this.getPosition().getY()-this.orientation);
      if (pos4.isValid()) {
        if (board.getPiece(pos4.getX(),pos4.getY()) == null){
          legalMoves.push(pos4);
        }
      }

      var pos3 = new Position(this.getPosition().getX()+1,this.getPosition().getY()-this.orientation);
      if (pos3.isValid()) {
        if (board.getPiece(pos3.getX(),pos3.getY()) == null){
          legalMoves.push(pos3);
        }
      }
    }

    var skips = this.getLegalSkips(board);
    for (var skip = 0; skip < skips.length; skip++){
      legalMoves.push(skips[skip]);
    }

    if (this.getColor() != this.getScene().turn) return [];
    else if (board.skippingPiece == null && board.anyLegalSkips(this.getScene().turn)) return skips;
    else if(board.skippingPiece != null && this.equals(board.skippingPiece)) return skips;
    else if(this.getColor() == this.getScene().turn && board.skippingPiece == null) return legalMoves;
    else return [];
  }

  getScene(){
    return this.scene;
  }

  // checks to see if a piece is equivalent to another
  // returns boolean
  equals(other){
    if (this.getPosition().getX() == other.getPosition().getX() && this.getPosition().getY() == other.getPosition().getY()){
      return true;
    }
    return false;
  }

  // updates state of piece
  update(){
    if ((this.getColor() == "white" && this.getPosition().getY() == 0) ||
        (this.getColor() == "black" && this.getPosition().getY() == 7)){
      this.king = true;
      if(this.getColor() == "white") this.setFrame(1);
      if(this.getColor() == "black") this.setFrame(0);
    }
  }

}
