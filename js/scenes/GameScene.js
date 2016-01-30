'use strict';

function GameScene() {

    Phaser.State.call(this);
 
}

GameScene.prototype = Object.create(Phaser.State.prototype);
GameScene.constructor = Phaser.State;

GameScene.prototype.preload = function () {
   
};


GameScene.prototype.create = function () {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;


};

GameScene.prototype.update = function () {


};

GameScene.prototype.render = function () {
};

