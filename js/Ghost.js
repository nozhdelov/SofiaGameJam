'use strict';

function Ghost(game){
    this.game = game;
    Phaser.Sprite.call(this, this.game, 1200, 350, 'ghost', 1);

    this.anchor.set(0.5, 0.5);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
   // this.body.collideWorldBounds = true;
    this.counter = 150;
    this.direction = 1;
    this.body.allowGravity = false;

    this.animations.add('moveAround', [0,1,2,3,4,5,6,7,9,10]);
}


Ghost.prototype = Object.create(Phaser.Sprite.prototype);
Ghost.constructor = Phaser.Sprite;

Ghost.prototype.moveAround = function(){
  this.scale.set(this.direction, 1);
  if(!this.animations.getAnimation('moveAround').isPlaying ){
      this.animations.getAnimation('moveAround').play(10, true);
  }

  this.body.velocity.x = this.direction * 10;

};

Ghost.prototype.stop = function(){
    this.animations.stop();
    this.frame = 0;
    this.body.velocity.x = 0;
};

Ghost.prototype.update = function(){
  this.updateDirection();
  this.moveAround();
};

Ghost.prototype.updateDirection = function (){
  if (!--this.counter) {
    this.counter = 150;
    this.direction = Math.random() > 0.5 ? 1 : -1;
  }
}
