// Setting up Phaser
const config = {
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    pixelArt: true
  },
  width: 1000,
	height: 343,
  backgroundColor: 0xffffff,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 1500
      },
      enableBody: true,
      // debug: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
};
const phaserGame = new Phaser.Game(config);
