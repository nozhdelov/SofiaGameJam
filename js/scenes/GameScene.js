'use strict';

function GameScene() {

    Phaser.State.call(this);

    this.background = null;
    this.panda = null;
    this.deadPanda = null;
    this.train = null;
    this.ghost = null;
    this.bells = null;
    this.worldSize = {width: 80000, height: 600};
    this.treeTicker = 300;
    this.sounds = {};
    this.goalReached = false;
 }

GameScene.prototype = Object.create(Phaser.State.prototype);
GameScene.constructor = Phaser.State;

GameScene.prototype.preload = function () {
   this.game.load.image('background', 'assets/background.jpg');
  // this.game.load.spritesheet('panda', 'assets/panda.png', 80, 76);
   this.game.load.spritesheet('deadPanda', 'assets/swordDeath.png', 140, 150);
   this.game.load.spritesheet('panda', 'assets/animations6.png', 110, 100);
   this.game.load.image('train', 'assets/train.png');
   this.game.load.spritesheet('ghost', 'assets/ghost.png', 63, 75);
   this.game.load.image('tree1', 'assets/tree1.png');
   this.game.load.image('tree2', 'assets/tree2.png');


   //train
   this.game.load.image('connector', 'assets/connector.png');
   this.game.load.image('train_1', 'assets/v1.png');
   this.game.load.image('train_2', 'assets/v2.png');
   this.game.load.image('train_3', 'assets/v3.png');
   this.game.load.image('train_4', 'assets/v4.png');
   this.game.load.image('train_5', 'assets/v5.png');
   this.game.load.image('train_6', 'assets/v6.png');
   this.game.load.image('train_7', 'assets/v7.png');

   //audio
   this.game.load.audio('bells', 'assets/audio/bells.mp3');
   this.game.load.audio('bg', 'assets/audio/bumper.mp3');
   this.game.load.audio('train', 'assets/audio/train.mp3');

   //smoke
   this.game.load.image('smoke', 'assets/smoke1.png');

};


GameScene.prototype.create = function () {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, this.worldSize.width, this.worldSize.height);
    this.game.physics.arcade.gravity.y = 1000;

    this.background = new Background(this.game);
    this.panda = new Panda(this.game);
    this.deadPanda = new DeadPanda(this.game);
    this.train = new Train(this.game);
    this.ghost = new Ghost(this.game);

    this.game.camera.x = 700;

    this.game.camera.x = this.train.position.x - 350;
    var tween0 = this.game.add.tween(this.game.camera.scale).from({x : 2, y : 2});

    var tween = this.game.add.tween(this.game.camera).to({x:this.panda.position.x}).delay(1000);
    tween.onComplete.add(function(){
        this.game.world.add(this.panda);
        this.panda.position.x = this.train.position.x - this.train.getWidth() + 400;
        this.game.world.add(this.ghost);
        this.game.camera.follow(this.panda);
        this.ghost.position.x = this.train.position.x - 350;
    }.bind(this));

    tween0.chain(tween).start();
  };


GameScene.prototype.update = function () {
     this.game.physics.arcade.collide(this.panda, this.train);
     this.game.physics.arcade.collide(this.ghost, this.train);
     this.game.physics.arcade.collide(this.ghost, this.panda, function(ghost, panda){
         if(this.goalReached){
             return;
         }
         this.goalReached = true;
        panda.controllsActive = false;
        panda.dance(); 
        
        this.game.add.tween(this.ghost).to({y:-200}).delay(1000).start().onComplete.add(function(){
            this.panda.tea();
            setTimeout(function(){
                this.game.world.add(this.deadPanda);
                this.deadPanda.position = this.panda.position;
                this.panda.kill();
                this.deadPanda.die();
                
            }.bind(this), 3500);
        }.bind(this));

     }.bind(this));
 
};

GameScene.prototype.render = function () {

};

function playFx(key){
    switch (key.keyCode) {
        case Phaser.Keyboard.S:
            this.bells.play();
            break;
    }
}
