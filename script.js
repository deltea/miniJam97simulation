// Main game object
var game = {
  oldMousePos: {
    x: 0,
    y: 0
  },
  mouseMoving: false,
  debuggerSearching: false,
  points: 0,
  timesNotMoving: 0,
  playAgainCursorDown: false
};

// Main scene
class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  // Load all the sprites and background
  preload() {
    // Images
    this.load.image("debugger", "assets/debugger.png");
    this.load.image("one", "assets/one.png");
    this.load.image("zero", "assets/zero.png");
    this.load.image("time", "assets/time.png");

    // Sound
    this.load.audio("music", "assets/music.mp3");
  }

  // Update score
  updateScore(num) {
    game.points += num;
    game.score.text = game.points;
  }

  // Create all the sprites and colliders and everything else
  create() {
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
    game.debugger.tweenX = 0;
    game.debugger.tweenY = 0;
    game.time = this.physics.add.group();
    game.time.create(Math.random() * config.width, Math.random() * config.height, "time").setScale(8).setGravityY(-config.physics.arcade.gravity.y);
    game.score = this.add.text(50, 50, game.points, {
      fontFamily: '"VT323"',
      fontSize: 80,
      color: 0xffffff
    });

    // Check if mouse moving
    setInterval(function() {
      if (game.oldMousePos.x === phaser.input.mousePointer.x && game.oldMousePos.y === phaser.input.mousePointer.y) {
        game.mouseMoving = false;
        if (!game.debuggerSearching) {
          game.timesNotMoving++;
        }
      } else {
        game.mouseMoving = true;
        game.timesNotMoving = 0;
      }
      game.oldMousePos.x = phaser.input.mousePointer.x;
      game.oldMousePos.y = phaser.input.mousePointer.y;
      if (game.timesNotMoving >= 20) {
        phaser.updateScore(-1);
        game.timesNotMoving = 0;
      }
    }, 100);
    setInterval(function() {
      game.debugger.visible = true;
      const random = Math.floor(Math.random() * 2);
      let array = [{x: Math.floor(Math.random() * 2) ? 0 : config.width, y: Math.random() * config.height}, {x: Math.random() * config.width, y: Math.floor(Math.random() * 2) ? 0 : config.height}]
      let choice = array[random];
      if (choice == array[0]) {
        if (choice.x === 0) {
          game.debugger.direction = "right";
        } else {
          game.debugger.direction = "left";
        }
      } else {
        if (choice.y === 0) {
          game.debugger.direction = "down";
        } else {
          game.debugger.direction = "up";
        }
      }
      game.debugger.x = choice.x;
      game.debugger.y = choice.y;
      if (game.debugger.direction === "right") {
        game.debugger.tweenX = game.debugger.x + 50;
        game.debugger.tweenY = game.debugger.y;
      } else if (game.debugger.direction === "left") {
        game.debugger.tweenX = game.debugger.x - 50;
        game.debugger.tweenY = game.debugger.y;
      } else if (game.debugger.direction === "up") {
        game.debugger.tweenX = game.debugger.x;
        game.debugger.tweenY = game.debugger.y - 50;
      } else {
        game.debugger.tweenX = game.debugger.x;
        game.debugger.tweenY = game.debugger.y + 50;
      }
      game.debugger.peekIn = phaser.tweens.add({
        targets: game.debugger,
        x: game.debugger.tweenX,
        y: game.debugger.tweenY,
        duration: 400,
        callbackScope: this,
        onComplete: function() {
          game.debuggerSearching = true;
        }
      });
      setTimeout(function() {
        if (game.debugger.direction === "right") {
          game.debugger.tweenX = game.debugger.x - 50;
          game.debugger.tweenY = game.debugger.y;
        } else if (game.debugger.direction === "left") {
          game.debugger.tweenX = game.debugger.x + 50;
          game.debugger.tweenY = game.debugger.y;
        } else if (game.debugger.direction === "up") {
          game.debugger.tweenX = game.debugger.x;
          game.debugger.tweenY = game.debugger.y + 50;
        } else {
          game.debugger.tweenX = game.debugger.x;
          game.debugger.tweenY = game.debugger.y - 50;
        }
        game.debugger.peekOut = phaser.tweens.add({
          targets: game.debugger,
          x: game.debugger.tweenX,
          y: game.debugger.tweenY,
          duration: 400,
          callbackScope: this
        });
        setTimeout(function () {
          game.debugger.visible = false;
          game.debuggerSearching = false;
        }, 400);
      }, 2000);
    }, (Math.random() * 10000) + 4000);

    // Colliders
    this.physics.add.overlap(game.player, game.time, function(player, time) {
      time.destroy();
      game.time.create(Math.random() * config.width, Math.random() * config.height, "time").setScale(8).setGravityY(-config.physics.arcade.gravity.y);
      phaser.updateScore(10);
      let text = phaser.add.text(time.x, time.y, "+10", {
        fontFamily: '"VT323"',
        fontSize: 40,
        color: "#4caf50"
      });
      phaser.tweens.add({
        targets: text,
        y: text.y - 20,
        duration: 400,
        callbackScope: this
      });
      setTimeout(function () {
        text.destroy();
      }, 400);
    });
  }

  // Update the sprites and groups
  update() {
    game.player.x = this.input.mousePointer.x;
    game.player.y = this.input.mousePointer.y;
    if (game.mouseMoving) {
      game.player.setTexture("one");
      game.music.resume();
    } else {
      game.player.setTexture("zero");
      game.music.pause();
    }
    if (game.mouseMoving && game.debuggerSearching) {
      this.scene.stop("Game");
      this.scene.start("GameOver");
    }
  }
}

// Game over
class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }
  preload() {
    this.load.image("playAgain", "assets/playAgain.png");
    this.load.image("playAgainCursor", "assets/playAgainCursor.png");
  }
  create() {
    let phaser = this;
    this.add.text(450, 100, "GAME OVER", {
      fontFamily: '"VT323"',
      fontSize: 100,
      color: "#4caf50"
    });
    game.playAgainButton = this.physics.add.sprite(625, 400, "playAgain").setScale(8).setInteractive().setGravityY(-config.physics.arcade.gravity.y);
    game.playAgainCursor = this.physics.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, "playAgainCursor").setScale(8).setGravityY(-config.physics.arcade.gravity.y);
    this.physics.add.overlap(game.playAgainButton);
    this.input.on("pointerdown", function () {
      game.playAgainCursor.setScale(7);
      game.playAgainCursorDown = true;
    });
    this.input.on("pointerup", function () {
      game.playAgainCursor.setScale(8);
      game.playAgainCursorDown = false;
    });
    this.physics.add.overlap(game.playAgainCursor, game.playAgainButton, function () {
      game.playAgainButton.setScale(7);
      if (game.playAgainCursorDown) {
        game.points = 0;
        phaser.scene.stop("GameOver");
        phaser.scene.start("Game");
      }
    });
  }
  update() {
    game.playAgainCursor.x = this.input.mousePointer.x;
    game.playAgainCursor.y = this.input.mousePointer.y;
  }
}

// Phaser config
const config = {
  type: Phaser.AUTO,
  width: 1250,
  height: 590,
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
  scene: [Game, GameOver]
};

// Phaser game
const phaserGame = new Phaser.Game(config);
