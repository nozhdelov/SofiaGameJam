'use strict';

function Panda(game){
    this.game = game;

    Phaser.Sprite.call(this, this.game, 100, -800, 'panda', 1);

    this.anchor.set(0.5, 0.5);
    this.scale.set(1.5, 1.5);


    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;

    this.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    this.animations.add('jump',[3]);


    this.keys = this.game.input.keyboard.createCursorKeys();

}


Panda.prototype = Object.create(Phaser.Sprite.prototype);
Panda.constructor = Phaser.Sprite;


Panda.prototype.walkLeft = function(){
    this.scale.set(-1.5, 1.5);
    if(!this.animations.getAnimation('walk').isPlaying ){
        this.animations.getAnimation('walk').play(30, true);
    }

    this.body.velocity.x = -200;
};


Panda.prototype.walkRight = function(){
    this.scale.set(1.5, 1.5);


    if(!this.animations.getAnimation('walk').isPlaying){
        this.animations.getAnimation('walk').play(30, true);
    }

    this.body.velocity.x = 200;
};


Panda.prototype.jump = function(){

    if(!this.body.wasTouching.down){
        return;
    }

    this.animations.stop();
    this.frame = 3;
    this.body.velocity.y = -500;
};

Panda.prototype.stop = function(){
    this.animations.stop();
    this.frame = 0;
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

    if(!this.keys.up.isDown && !this.keys.left.isDown && !this.keys.right.isDown){
        this.stop();
    }
};
