// position class
class Position {

  // each position is constructed using an x and y
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }

  // checks to see if the position on the board
  isValid(){
    return !(this.getX() < 0 || this.getX() > 7 ||
            this.getY() < 0 || this.getY() > 7);
  }

  // checks to see if a position is in an array
  isInArray(array){
    if(array.length == 0) return false;
    for (var i = 0; i < array.length; i++){
      if (array[i].getX() == this.getX() && array[i].getY() == this.getY()){
        return true;
      }
    }
    return false;
  }

}
