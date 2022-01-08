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
  this.load.image("zero", "assets/zero.png");

  // Sound
  this.load.audio("music", "assets/music.mp3");
}

// Create all the sprites and colliders and everything else
function create() {
  // Phaser
  let phaser = this;

  // Load sounds
  game.music = this.sound.add("music");
  game.music.play();
  game.music.setLoop(true);

  // Create following sprite
  game.player = this.physics.add.sprite(phaser.input.mousePointer.x, phaser.input.mousePointer.y, "one").setScale(8).setGravityY(-config.physics.arcade.gravity.y);

  // Check if mouse moving
  setInterval(function() {
    if (game.oldMousePos.x === phaser.input.mousePointer.x && game.oldMousePos.y === phaser.input.mousePointer.y) {
      game.mouseMoving = false;
    } else {
      game.mouseMoving = true;
    }
    game.oldMousePos.x = phaser.input.mousePointer.x;
    game.oldMousePos.y = phaser.input.mousePointer.y;
  }, 100);
}

// Update the sprites and groups
function update() {
  game.player.x = this.input.mousePointer.x;
  game.player.y = this.input.mousePointer.y;
  if (game.mouseMoving) {
    game.player.setTexture("one");
    game.music.resume();
  } else {
    game.player.setTexture("zero");
    game.music.pause();
  }
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
