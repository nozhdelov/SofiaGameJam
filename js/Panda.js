'use strict';

function Panda(game){
    this.game = game;

    Phaser.Sprite.call(this, this.game, 100, -800, 'panda', 1);

    this.anchor.set(0.5, 0.5);



    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;

    this.animations.add('stand', [0]);
    this.animations.add('walk', [8,9,10,11,12,13,14,15,16,17,18,19,20,21]);
    this.animations.add('dance', [36,37,38,39,40, 41, 42,43,44,45,46,47,48,49,50,51]);
    this.animations.add('fireWalk', [53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,69]);
    this.animations.add('die', [70,71,72,73,74,75,76,77,78,79,80,81,82,83,84]);
    this.animations.add('jump',[22, 23, 24, 25, 26, 27, 28, 29]);


    this.keys = this.game.input.keyboard.createCursorKeys();
    console.log(this.game.input.keyboard);
    this.keys['A'] = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keys['S'] = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.keys['D'] = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
   

}


Panda.prototype = Object.create(Phaser.Sprite.prototype);
Panda.constructor = Phaser.Sprite;


Panda.prototype.walkLeft = function(){
    this.scale.set(-1, 1);
    if(!this.animations.getAnimation('walk').isPlaying ){
        this.animations.getAnimation('walk').play(30, true);
    }

    this.body.velocity.x = -200;
};


Panda.prototype.walkRight = function(){
    this.scale.set(1, 1);

 
    if(!this.animations.getAnimation('walk').isPlaying){
        this.animations.getAnimation('walk').play(30, true);
    }

    this.body.velocity.x = 200;
};


Panda.prototype.die = function(){

 
    if(!this.animations.getAnimation('die').isPlaying){
        this.animations.getAnimation('die').play(30, true);
    }


};


Panda.prototype.jump = function(){

    if(!this.body.wasTouching.down){
        return;
    }

    this.animations.stop();
    if(!this.animations.getAnimation('jump').isPlaying){
        this.animations.getAnimation('jump').play(30, true);
    }
    this.body.velocity.y = -500;
};



Panda.prototype.dance = function(){
    this.scale.set(1, 1);

    if(this.animations.currentAnim.isPlaying && this.animations.currentAnim.name !== 'dance'){
        this.animations.currentAnim.stop();
    }
    if(!this.animations.getAnimation('dance').isPlaying){
        this.animations.getAnimation('dance').play(30, true);
    }

  
};


Panda.prototype.walkOnFire = function(){
    this.scale.set(1, 1);

   if(this.animations.currentAnim.isPlaying && this.animations.currentAnim.name !== 'fireWalk'){
        this.animations.currentAnim.stop();
    }
    if(!this.animations.getAnimation('fireWalk').isPlaying){
        this.animations.getAnimation('fireWalk').play(30, true);
    }

  
};


Panda.prototype.stop = function () {
    this.animations.stop();
    this.frame = 0;
    this.body.velocity.x = 0;
    if (!this.animations.getAnimation('stand').isPlaying) {
        this.animations.getAnimation('stand').play(5, true);
    }
    this.body.velocity.x = 0;
};


Panda.prototype.update = function(){
    
    if(this.keys.left.isDown){
        this.walkLeft();
    }
    if(this.keys.right.isDown){
        this.walkRight();
    }
    if(this.keys.up.isDown){
        this.jump();
    }
    if(this.keys.A.isDown){
        this.dance();
    }
    
 
    if(this.keys.S.isDown){
        this.walkOnFire();
    }

    
    if(this.keys.D.isDown){
        this.die();
    }
    
    var allKeysAreUp = Object.keys(this.keys).map(function(key){
        return this.keys[key].isUp;
    }.bind(this)).reduce(function(a,b){
        return a && b;
    });

    if(allKeysAreUp ){
        this.stop();
    }
};
