'use strict';

function StartMenuScene(){
    Phaser.State.call(this);
}


StartMenuScene.prototype.preload = function(){
    this.game.load.image('smoke', 'assets/smoke.png');
};


StartMenuScene.prototype.create = function(){
  this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  
   var emitter = this.game.add.emitter(500, 500, 180);
   
    emitter.makeParticles('smoke');

    emitter.setXSpeed(-30, -45);
    emitter.setYSpeed(-35, -45);

    emitter.setRotation(0, 0);
    emitter.setAlpha(0.1, 1, 3000);
    emitter.setScale(0.1, 0.2, 0.1, 0.2, 1000, Phaser.Easing.Quintic.Out);
    emitter.gravity = 5;

    emitter.start(false, 8000, 50);

   // emitter.emitX = 64;
   // emitter.emitY = 500;
   
};

StartMenuScene.prototype.update = function(){};

StartMenuScene.prototype.render = function(){};