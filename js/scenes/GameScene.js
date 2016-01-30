'use strict';

function GameScene() {

    Phaser.State.call(this);

    this.background = null;
    this.panda = null;
    this.train = null;
    this.ghost = null;
    this.worldSize = {width: 80000, height: 600};

 }

GameScene.prototype = Object.create(Phaser.State.prototype);
GameScene.constructor = Phaser.State;

GameScene.prototype.preload = function () {
   this.game.load.image('background', 'assets/background.jpg');
   this.game.load.spritesheet('panda', 'assets/panda.png', 64, 59);
   this.game.load.image('train', 'assets/train.png');
   this.game.load.spritesheet('ghost', 'assets/ghost.png', 63, 75);
};


GameScene.prototype.create = function () {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, this.worldSize.width, this.worldSize.height);
    this.game.physics.arcade.gravity.y = 1000;

    this.background = new Background(this.game);
    this.panda = new Panda(this.game);
    this.train = new Train(this.game);
    this.ghost = new Ghost(this.game);

    this.game.camera.x = 700;


    var tween0 = this.game.add.tween(this.game.camera.scale).from({x : 3, y : 3});

    var tween = this.game.add.tween(this.game.camera).to({x:this.panda.position.x}).delay(0);
    tween.onComplete.add(function(){
        this.game.world.add(this.panda);
        this.game.world.add(this.ghost);
        this.game.camera.follow(this.panda);
    }.bind(this));

    tween0.chain(tween).start();
};

GameScene.prototype.update = function () {
     this.game.physics.arcade.collide(this.panda, this.train);
     this.game.physics.arcade.collide(this.ghost, this.train);
    //  this.game.physics.arcade.collide(this.panda, this.ghost);
};

GameScene.prototype.render = function () {

};
