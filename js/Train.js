'use strict';

function Train(game){
    this.game = game;
    Phaser.Group.call(this, this.game);

    this.parts = [];
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;


    var train = new Phaser.Sprite(this.game, 600, 400, 'train');

    train.scale.set(-0.5,0.5);
    train.anchor.set(0.5, 0.5);

    this.game.physics.enable(train, Phaser.Physics.ARCADE);
    train.body.allowGravity = false;
    train.body.immovable = true;

    var train2 = new Phaser.Sprite(this.game, 200, 400, 'train');

    train2.scale.set(-0.5, 0.5);
    train2.anchor.set(0.5, 0.5);

    this.game.physics.enable(train2, Phaser.Physics.ARCADE);
    train2.body.allowGravity = false;
    train2.body.immovable = true;


    this.parts.push(train, train2);


   // this.game.camera.follow(train);

    this.parts.forEach(function(obj){
        this.add(obj);
    }.bind(this));


   this.game.world.add(this);

}


Train.prototype = Object.create(Phaser.Group.prototype);
Train.constructor = Phaser.Group;
