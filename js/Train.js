'use strict';

function Train(game){
    this.game = game;
    Phaser.Group.call(this, this.game);

    this.parts = [];
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;

    var width = 0;
    var train = new Phaser.Sprite(this.game, 1, 500, 'train_1');

   
    train.anchor.set(0.5, 0.5);

    this.game.physics.enable(train, Phaser.Physics.ARCADE);
    train.body.allowGravity = false;
    train.body.immovable = true;

    
    
    var i , train3;
    this.parts.push(train);
    
    
  

    
    for(i = 1; i < 10; i++){
        width = this.getWidth();

        train3 = new Phaser.Sprite(this.game, width, 500, 'train_6');// + Math.round(Math.random() * 6));

       // train3.scale.set(-0.7,0.7);
        train3.anchor.set(0.5, 0.5);
        width += train3.width;
        this.game.physics.enable(train3, Phaser.Physics.ARCADE);
        train3.body.allowGravity = false;
        train3.body.immovable = true;
        this.parts.push(train3);
    }


    this.scale.set(-1, 1);


   // this.game.camera.follow(train);

    this.parts.forEach(function(obj){
        this.add(obj);
    }.bind(this));

    this.position.x = width;
   this.game.world.add(this);

}


Train.prototype = Object.create(Phaser.Group.prototype);
Train.constructor = Phaser.Group;


Train.prototype.getWidth = function(){
    return this.parts.reduce(function(a,b){
            return a + b.width;
        }, 0);
};
