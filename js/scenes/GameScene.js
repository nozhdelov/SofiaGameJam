'use strict';

function GameScene() {

    Phaser.State.call(this);

    this.background = null;
    this.panda = null;
    this.train = null;
    this.ghost = null;
    this.bells = null;
    this.worldSize = {width: 80000, height: 600};
 }

GameScene.prototype = Object.create(Phaser.State.prototype);
GameScene.constructor = Phaser.State;

GameScene.prototype.preload = function () {
   this.game.load.image('background', 'assets/background.jpg');
   this.game.load.spritesheet('panda', 'assets/panda.png', 80, 76);
   this.game.load.image('train', 'assets/train.png');
   this.game.load.spritesheet('ghost', 'assets/ghost.png', 63, 75);

   //train
   this.game.load.image('train_1', 'assets/v1.png');
   this.game.load.image('train_2', 'assets/v2.png');
   this.game.load.image('train_3', 'assets/v3.png');
   this.game.load.image('train_4', 'assets/v4.png');
   this.game.load.image('train_5', 'assets/v5.png');
   this.game.load.image('train_6', 'assets/v6.png');
   this.game.load.image('train_7', 'assets/v7.png');

   //audio
   this.game.load.audio('bells', 'assets/audio/bells.mp3');

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
        this.panda.position.x = this.train.position.x - this.train.getWidth() + 400;
        this.game.world.add(this.ghost);
        this.game.camera.follow(this.panda);
    }.bind(this));

    tween0.chain(tween).start();

    this.bells = this.game.sound.add('bells');
    this.game.sound.setDecodedCallback([ this.bells ], start.bind(this), this);
};

function start(){
    var keys = this.game.input.keyboard.addKeys({ bells: Phaser.Keyboard.S});
    keys.bells.onDown.add(playFx, this);
    debugger;
    keys.bells.onUp.add(this.game.sound.StopAll);
}

GameScene.prototype.update = function () {
     this.game.physics.arcade.collide(this.panda, this.train);
     this.game.physics.arcade.collide(this.ghost, this.train);
    //  this.game.physics.arcade.collide(this.panda, this.ghost);
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
