'use strict';

function DeadPanda(game){
    this.game = game;
    this.sounds ={};
    this.text = null;
    Phaser.Sprite.call(this, this.game, 100, -800, 'deadPanda', 1);

    this.anchor.set(0.5, 0.5);



 

    this.animations.add('die', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]);

}



DeadPanda.prototype = Object.create(Phaser.Sprite.prototype);
DeadPanda.constructor = Phaser.Sprite;

DeadPanda.prototype.die = function(){
    if(!this.animations.getAnimation('die').isPlaying){
        this.animations.getAnimation('die').play(30, false);
    }
};

