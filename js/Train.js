'use strict';

function Train(game){
    this.game = game;
    Phaser.Group.call(this, this.game);

    this.parts = [];
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.enableBody = true;

    var width = 0;
    var train = new Phaser.Sprite(this.game, 50, 500, 'train_1');

   
    train.anchor.set(0.5, 0.5);

    this.game.physics.enable(train, Phaser.Physics.ARCADE);
    train.body.allowGravity = false;
    train.body.immovable = true;

    
    
    var i , train3, connector, connector2, wagoonName;
    var wagoons = [3,5,6];
    this.parts.push(train);
    
    
  

    
    for(i = 1; i < 5; i++){
        
        
        
        width = this.getWidth();
        wagoonName = 'train_' + wagoons[Math.round(Math.random() * (wagoons.length - 1))];
        train3 = new Phaser.Sprite(this.game, width , 500, wagoonName);

       // train3.scale.set(-0.7,0.7);
        train3.anchor.set(0.5, 0.5);
        this.game.physics.enable(train3, Phaser.Physics.ARCADE);
        train3.body.allowGravity = false;
        train3.body.immovable = true;
        this.parts.push(train3);
        
        
        width = this.getWidth();
        connector = new Phaser.Image(this.game, width - 170, 565, 'connector');
        connector.anchor.set(0.5, 0.5);
        this.parts.push(connector);
        
        
    }


    this.scale.set(-1, 1);


   // this.game.camera.follow(train);

    this.parts.forEach(function(obj){
        this.add(obj);
    }.bind(this));

    this.position.x = width;
    
    this.createSmoke();
   this.game.world.add(this);

}


Train.prototype = Object.create(Phaser.Group.prototype);
Train.constructor = Phaser.Group;


Train.prototype.getWidth = function(){
    return this.parts.reduce(function(a,b){
            return a + b.width;
        }, 0);
};


Train.prototype.createSmoke = function(){
   
     var emitter = this.game.add.emitter(this.position.x - this.getWidth() - 20, 350, 2580);
   
    emitter.makeParticles('smoke');

    emitter.setXSpeed(400, 545);
    emitter.setYSpeed(-550, -655);

    emitter.setRotation(0, 0);
    emitter.setAlpha(0.3, 9, 3000);
    emitter.setScale(0.3, 0.5, 0.3, 0.5, 1000, Phaser.Easing.Quintic.Out);
    //emitter.gravity = -80;

    emitter.start(false, 600, 15);
    this.add(emitter);
};
