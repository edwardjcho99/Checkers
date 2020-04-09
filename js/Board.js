// class defining a Board
class Board {
  constructor(scene){

    this.clickedPos = new Position(0,0);
    this.oldPos = new Position(0,0);

    this.skippingPiece = null;
    this.moved = false;

    // make the tiles
    this.tiles = [];
    this.scene = scene;
    var tileColor = "black";
    for (var row = 0; row < 8; row++){
      if (row % 2 == 0) tileColor = "black";
      else tileColor = "white";

      for (var col = 0; col < 8; col++){
        this.tiles.push(new CheckerTile(scene,tileColor,new Position(row,col),"tiles"));
        if (tileColor == "black") tileColor = "white";
        else tileColor = "black";
      }

    }

    // 2d array of the board
    this.pieces = [
      //black
      [new CheckerPiece(scene,"black",new Position(0,0)),null,new CheckerPiece(scene,"black",new Position(2,0)),null,
      new CheckerPiece(scene,"black",new Position(4,0)),null,new CheckerPiece(scene,"black",new Position(6,0)),null],
      [null,new CheckerPiece(scene,"black",new Position(1,1)),null,new CheckerPiece(scene,"black",new Position(3,1)),
      null,new CheckerPiece(scene,"black",new Position(5,1)),null,new CheckerPiece(scene,"black",new Position(7,1))],
      [new CheckerPiece(scene,"black",new Position(0,2)),null,new CheckerPiece(scene,"black",new Position(2,2)),null,
      new CheckerPiece(scene,"black",new Position(4,2)),null,new CheckerPiece(scene,"black",new Position(6,2)),null],
      //middle
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      //white
      [null,new CheckerPiece(scene,"white",new Position(1,5)),null,new CheckerPiece(scene,"white",new Position(3,5)),
      null,new CheckerPiece(scene,"white",new Position(5,5)),null,new CheckerPiece(scene,"white",new Position(7,5))],
      [new CheckerPiece(scene,"white",new Position(0,6)),null,new CheckerPiece(scene,"white",new Position(2,6)),null,
      new CheckerPiece(scene,"white",new Position(4,6)),null,new CheckerPiece(scene,"white",new Position(6,6)),null],
      [null,new CheckerPiece(scene,"white",new Position(1,7)),null,new CheckerPiece(scene,"white",new Position(3,7)),
      null,new CheckerPiece(scene,"white",new Position(5,7)),null,new CheckerPiece(scene,"white",new Position(7,7))]
    ];

  }

  getPiece(x,y){
    if(x < 0 || x > 7 || y < 0 || y > 7) throw "OutOfBounds";
    return this.pieces[y][x];
  }

  // moves piece from pos1 to pos 2
  // input: Position, Position
  movePiece(pos1,pos2){
    var tmp = this.getPiece(pos1.getX(),pos1.getY());
    this.getPiece(pos1.getX(),pos1.getY()).setPos(pos2);
    this.pieces[pos1.getY()][pos1.getX()] = null;
    this.pieces[pos2.getY()][pos2.getX()] = tmp;
  }

  // removes a piece at a position
  // input: Position
  remove(pos){
    var tmp = this.getPiece(pos.getX(),pos.getY());
    this.pieces[pos.getY()][pos.getX()] = null;
    tmp.destroy();
  }

  // checks to see if there are any legal skips
  // input: String (the player color)
  // output: boolean
  anyLegalSkips(player){
    for (var x = 0; x < this.pieces.length; x++){
      for (var y = 0; y < this.pieces[0].length; y++){
        if (this.getPiece(x,y) != null){
          if (this.getPiece(x,y).getLegalSkips(this).length > 0 && player == this.getPiece(x,y).getColor()){
            return true;
          }
        }
      }
    }
    return false;
  }

  // checks to see if there are any legal moves
  // input: String (the player color)
  // output: boolean
  anyLegalMoves(player){
    for (var x = 0; x < this.pieces.length; x++){
      for (var y = 0; y < this.pieces[0].length; y++){
        if (this.getPiece(x,y) != null){
          if (this.getPiece(x,y).getLegalMoves(this).length >= 1 && player == this.getPiece(x,y).getColor()){
            return true;
          }
        }
      }
    }
    return false;
  }

  // checks to see if the game is over
  // output: boolean
  gameOver(){
    var whiteCount = 0;
    var blackCount = 0;
    for (var x = 0; x < this.pieces.length; x++){
      for (var y = 0; y < this.pieces[0].length; y++){
        if (this.getPiece(x,y) != null){
          var color = this.getPiece(x,y).getColor();
          if (color == "white") whiteCount++;
          if (color == "black") blackCount++;
        }
      }
    }
    if (whiteCount == 0 || blackCount == 0) return true;
    return false;
  }

  // updates state of the board
  update(){
    //moves the piece based on where the player clicks
    if (this.getPiece(this.oldPos.getX(),this.oldPos.getY()) != null){
      if (this.getPiece(this.clickedPos.getX(),this.clickedPos.getY()) == null){

        if(this.clickedPos.isInArray(this.getPiece(this.oldPos.getX(),this.oldPos.getY()).getLegalMoves(this))){
          this.movePiece(this.oldPos,this.clickedPos);
          var removedX = null;
          var removedY = null;
          if (this.clickedPos.getX() == this.oldPos.getX() + 2){
            removedX = this.oldPos.getX() + 1;
          }
          if (this.clickedPos.getX() == this.oldPos.getX() - 2){
            removedX = this.oldPos.getX() - 1;
          }
          if (this.clickedPos.getY() == this.oldPos.getY() + 2){
            removedY = this.oldPos.getY() + 1;
          }
          if (this.clickedPos.getY() == this.oldPos.getY() - 2){
            removedY = this.oldPos.getY() - 1;
          }

          if (removedX != null && removedY != null){
             this.skippingPiece = this.getPiece(this.clickedPos.getX(),this.clickedPos.getY());
             console.log(this.skippingPiece);
             this.remove(new Position(removedX,removedY));
             if(this.anyLegalSkips(this.scene.turn) && this.skippingPiece.getLegalSkips(this).length >= 1){
               this.moved = false;
             } else {
               this.moved = true;
               this.skippingPiece = null;
             }

          } else {
            this.skippingPiece = null;
            this.moved = true;
          }

        }
      }
    }

    //highlights the tiles and sets the old and new mouse positions
    for (var tile = 0; tile < this.tiles.length; tile++){
      if(this.scene.mouse.isDown){
        if(this.tiles[tile].contains(this.scene.mouse.x,this.scene.mouse.y)){
          this.tiles[tile].highLight();

          var tmpPos = this.tiles[tile].getPosition();
          if (tmpPos != this.clickedPos){
            this.oldPos = this.clickedPos;
            this.clickedPos = this.tiles[tile].getPosition();
          }

        } else {
          this.tiles[tile].unhighLight();
        }
      }

    }

    // updates each piece
    for (var x = 0; x < this.pieces.length; x++){
      for (var y = 0; y < this.pieces[0].length; y++){
        if (this.getPiece(x,y) != null){
          this.getPiece(x,y).update();
        }
      }
    }
  }

}
