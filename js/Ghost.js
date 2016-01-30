'use strict';

function Ghost(game){
    this.game = game;
    Phaser.Sprite.call(this, this.game, 300, -800, 'ghost', 1);

    this.anchor.set(0.5, 0.5);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.counter = 500;

    this.animations.add('moveAround', [0,1,2,3,4,5,6,7,9,10]);
}


Ghost.prototype = Object.create(Phaser.Sprite.prototype);
Ghost.constructor = Phaser.Sprite;

Ghost.prototype.moveAround = function(direction){
  this.scale.set(direction, 1);
  if(!this.animations.getAnimation('moveAround').isPlaying ){
      this.animations.getAnimation('moveAround').play(10, true);
  }

  this.body.velocity.x = direction * 10;

};

Ghost.prototype.stop = function(){
    this.animations.stop();
    this.frame = 0;
    this.body.velocity.x = 0;
};

Ghost.prototype.update = function(){
  var direction;
  if (!this.counter--) {
    direction = Math.random() > 0.5 ? 1 : -1;
  }
  this.moveAround(direction);
};
