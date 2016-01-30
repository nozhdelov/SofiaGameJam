'use strict';

function GameScene() {

    Phaser.State.call(this);
    
    this.background = null;
 
}

GameScene.prototype = Object.create(Phaser.State.prototype);
GameScene.constructor = Phaser.State;

GameScene.prototype.preload = function () {
   this.game.load.image('background', 'assets/background.png');
};


GameScene.prototype.create = function () {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.background = new Background();
    
};

GameScene.prototype.update = function () {


};

GameScene.prototype.render = function () {
};

