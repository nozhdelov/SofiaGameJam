function Background (game) {
  this.game = game || Phaser.game;
  Phaser.TileSprite.call(this, this.game, 0, 0, 4096, 512, 'background');
  this.game.world.add(this);
}

Background.prototype = Object.create(Phaser.TileSprite.prototype);
Background.prototype.constructor = Background;

Background.prototype.update = function (){
  this.tilePosition.x -=20;
}
