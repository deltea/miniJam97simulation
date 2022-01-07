// Load all the sprites and background
function preload() {

}

// Create all the sprites and colliders and everything else
function create() {

}

// Update the sprites and groups
function update() {

}

// Phaser config
const config = {
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.RESIZE
  },
  render: {
    pixelArt: true
  },
  backgroundColor: 0xffffff,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 1500
      },
      enableBody: true,
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
};
