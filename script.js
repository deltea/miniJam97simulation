// Main game object
var game = {
  oldMousePos: {
    x: 0,
    y: 0
  },
  mouseMoving: false
};

// Load all the sprites and background
function preload() {
  // Images
  this.load.image("debugger", "assets/debugger.png");
  this.load.image("one", "assets/one.png");
  this.load.image("zero0", "assets/zero0.png");
  this.load.image("zero1", "assets/zero1.png");
}

// Create all the sprites and colliders and everything else
function create() {
  // Phaser
  var phaser = this;

  // Check if mouse moving
  setInterval(function() {
    if (game.oldMousePos.x === phaser.input.mousePointer.x && game.oldMousePos.y === phaser.input.mousePointer.y) {
      game.mouseMoving = false;
    } else {
      game.mouseMoving = true;
    }
    game.oldMousePos.x = phaser.input.mousePointer.x;
    game.oldMousePos.y = phaser.input.mousePointer.y;
    console.log(game.mouseMoving);
  }, 100);
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

// Phaser game
const phaserGame = new Phaser.Game(config);
