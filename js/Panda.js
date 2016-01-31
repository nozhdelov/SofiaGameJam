'use strict';

function Panda(game){
    this.game = game;
    this.sounds ={};
    this.text = null;
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
    this.animations.add('tea',[70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140]);



    this.keys = this.game.input.keyboard.createCursorKeys();

    this.keys['A'] = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keys['S'] = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.keys['D'] = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

    this.controllsActive = true;

    this.sounds.bells = this.game.sound.add('bells');
    this.sounds.bg = this.game.sound.add('bg', 1, true);
    this.sounds.train = this.game.sound.add('train', 0.3, true);
    // this.game.sound.setDecodedCallback([this.sounds.bg, this.sounds.train], startSounds.bind(this));
    this.game.sound.setDecodedCallback([this.sounds.bells, this.sounds.bg, this.sounds.train], startSoundsListener.bind(this));
}

function startSoundsListener(){
  this.sounds.train.play();
  this.sounds.bg.play();
}

Panda.prototype = Object.create(Phaser.Sprite.prototype);
Panda.constructor = Phaser.Sprite;


Panda.prototype.walkLeft = function(){
    this.scale.set(-1, 1);

    if(!this.animations.getAnimation('walk').isPlaying ){
        this.animations.stop();
        this.animations.getAnimation('walk').play(30, true);
    }

    this.body.velocity.x = -200;
};


Panda.prototype.walkRight = function(){
    this.scale.set(1, 1);

    if(!this.animations.getAnimation('walk').isPlaying){
        this.animations.getAnimation('walk').play(30, false);
    }

    this.body.velocity.x = 200;
};


Panda.prototype.die = function(){


    if(!this.animations.getAnimation('die').isPlaying){
        this.animations.getAnimation('die').play(30, false);
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
    //this.scale.set(1, 1);
    if (  !this.text ){
      this.text = this.game.add.text(this.position.x, this.position.y - 100, "KUKER TIME", {font: "64px Arial", fontWeight: "bold", fill: "#E6151F", align: "center"});
      this.text.anchor.set(0.5);
      this.text.stroke = '#000000';
      this.text.strokeThickness = 10;  
      setTimeout(function (){
          this.text.destroy();
      }.bind(this), 2000);
    }
    this.sounds.bells.play();
    
    if(!this.animations.getAnimation('dance').isPlaying){
        this.animations.getAnimation('dance').play(30, true);
    }


};


Panda.prototype.walkOnFire = function(){
   // this.scale.set(1, 1);

    if(!this.animations.getAnimation('fireWalk').isPlaying){
        this.animations.getAnimation('fireWalk').play(30, false);
    }


};

Panda.prototype.tea = function(){
   // this.scale.set(1, 1);

    if(!this.animations.getAnimation('tea').isPlaying){
        this.animations.getAnimation('tea').play(30, false);
    }


};


Panda.prototype.stop = function () {
    this.animations.stop();
    this.frame = 0;
    this.body.velocity.x = 0;
    if (!this.animations.getAnimation('stand').isPlaying) {
        //this.animations.getAnimation('stand').play(5, true);
    }
    this.body.velocity.x = 0;
};


Panda.prototype.update = function(){
    if(!this.controllsActive){
        return false;
    }

    var danceKeysArePressed = this.keys.A.isDown || this.keys.S.isDown;
    var walkKeysArePressed = this.keys.left.isDown || this.keys.right.isDown || this.keys.up.isDown || this.keys.down.isDown;

    if(this.keys.left.isDown && !danceKeysArePressed ){
        this.walkLeft();
    }
    if(this.keys.right.isDown && !danceKeysArePressed){
        this.walkRight();
    }
    if(this.keys.up.isDown && !danceKeysArePressed){
        this.jump();
    }
    if(this.keys.A.isDown && !walkKeysArePressed ){
        this.dance();
    }


    if(this.keys.S.isDown && !walkKeysArePressed){
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
