var TopDownGame = TopDownGame || {};
 
//loading the game assets
TopDownGame.Preload = function(){};
 
TopDownGame.Preload.prototype = {
  preload: function() {
   
    //load game assets
    this.load.spritesheet('player', 'assets/player.png', 48, 48);
    this.load.tilemap('level1', 'assets/tile_map/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/tileset/dungeon tileset calciumtrice.png');
    this.load.image('light', 'assets/tileset/light.png');
    this.load.image('fire', 'assets/tileset/fire.png');
    this.load.image('path', 'assets/path.png');

  },
  create: function() {
    this.state.start('Game');
  }
};