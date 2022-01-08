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

  // Create sprites
  game.player = this.physics.add.sprite(phaser.input.mousePointer.x, phaser.input.mousePointer.y, "one").setScale(8).setGravityY(-config.physics.arcade.gravity.y);
  game.debugger = this.physics.add.sprite(0, 0, "debugger").setScale(8).setGravityY(-config.physics.arcade.gravity.y);
  game.debugger.visible = false;

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
  setInterval(function() {
    game.debugger.visible = true;
    const random = Math.floor(Math.random() * 2);
    let array = [{x: Math.floor(Math.random() * 2) ? 0 : config.width, y: Math.random() * config.height}, {x: Math.random() * config.width, y: Math.floor(Math.random() * 2) ? 0 : config.height}]
    let choice = array[random];
    game.debugger.x = choice.x;
    game.debugger.y = choice.y;
    setTimeout(function() {
      game.debugger.visible = false;
    }, 3000);
  }, (Math.random() * 8000) + 3000);
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
  width: 1000,
  height: 800,
  render: {
    pixelArt: true
  },
  backgroundColor: 0x000000,
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
