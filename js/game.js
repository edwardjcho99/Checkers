var config = {
  width: 600,
  height: 600,
  title: "Checkers",
  backgroundColor:0x444444,
  scene: [MainScene],
  pixelArt: true,
};

const TILESIZE = config.width / 8;

var game = new Phaser.Game(config);
