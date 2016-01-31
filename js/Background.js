function Background (game) {
  this.START_TREE_X = 3000;
  this.game = game || Phaser.game;
  Phaser.TileSprite.call(this, this.game, 0, 0, 50000, 600, 'background');
  this.game.world.add(this);
  this.tree1 = this.addChild(new Phaser.Image(this.game, this.START_TREE_X, 100, 'tree1'));
  this.tree2 = this.addChild(new Phaser.Image(this.game, this.START_TREE_X, 200, 'tree2'));

  this.tree1.scale.set(0.5, 0.5);
  this.tree2.scale.set(0.5, 0.5);
}
// this.game.camera
function random(min, max){
  // good enough;
  return Math.random() * max + min;
}

Background.prototype = Object.create(Phaser.TileSprite.prototype);
Background.prototype.constructor = Phaser.TileSprite;

Background.prototype.randomTreePosition = function () {
  return random(500, 2000) + this.START_TREE_X;
}

Background.prototype.update = function (){
  this.tilePosition.x -=20;
  this.updateTrees();
}

Background.prototype.updateTrees = function (){
  if (this.tree1.position.x < -300 ){
    this.tree1.position.x = this.randomTreePosition();
  }
  if (this.tree2.position.x < -300) {
    this.tree2.position.x = this.randomTreePosition();
  }
  this.tree1.position.x -= 20;
  this.tree2.position.x -= 20;
}
