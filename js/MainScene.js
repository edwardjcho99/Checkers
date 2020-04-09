class MainScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  // load spritesheets and images
  preload() {
    this.load.spritesheet("tiles","assets/images/wood.png",{
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("checkers","assets/images/checker.png",{
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.image("gameover","assets/images/gameover.png");

  }

  create() {
    this.board = new Board(this);
    this.turn = "white";

    this.mouse = this.input.activePointer;
  }

  // updates game state
  update() {
    this.getBoard().update();
    this.getBoard().gameOver();

    if (this.getBoard().moved == true){
      this.changeTurn();
    }

    if (this.getBoard().gameOver()){
      this.gameoverSprite = this.add.sprite(300,300,"gameover");
    }
  }

  // function that changes the player turn
  changeTurn(){
    if (this.turn == "white"){
      this.turn = "black";
    } else {
      this.turn = "white";
    }
    if (this.getBoard().moved == true){
      this.getBoard().moved = false;
    }
    this.getBoard().skippingPiece = null;
  }

  getBoard(){
    return this.board;
  }
}
