'use strict';

function Game(){

    Phaser.Game.call(this, 800, 600, Phaser.Canvas, 'gameScreen');

    this.scene = 'game';
    this.state.add('start', new StartMenuScene());
    this.state.add('game', new GameScene());

}

Game.prototype = Phaser.Game.prototype;
Game.constructor = Phaser.Game;

Game.prototype.start = function(){

    this.loadScene(this.scene);
};


Game.prototype.loadScene = function(scene){
    if(!this.state.states.hasOwnProperty(scene)){
        throw new Error('invalid scene');
    }
    this.scene = scene;
    this.state.start(scene);

};
