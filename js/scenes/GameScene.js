'use strict';

function GameScene() {

    Phaser.State.call(this);

    this.background = null;
    this.panda = null;

    this.worldSize = {width: 80000, height: 600};
 }

GameScene.prototype = Object.create(Phaser.State.prototype);
GameScene.constructor = Phaser.State;

GameScene.prototype.preload = function () {
   this.game.load.image('background', 'assets/background.png');
   this.game.load.spritesheet('panda', 'assets/panda.png', 64, 88);

};


GameScene.prototype.create = function () {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, this.worldSize.width, this.worldSize.height);
    this.game.physics.arcade.gravity.y = 1000;

    this.background = new Background(this.game);
    this.panda = new Panda(this.game);

};

GameScene.prototype.update = function () {
     //this.panda.walkLeft();
};

GameScene.prototype.render = function () {
};
