var TopDownGame = TopDownGame || {};
 
TopDownGame.Boot = function(){};
 
//setting game configuration and loading the assets for the loading screen
TopDownGame.Boot.prototype = {
  preload: function() {
  },
  create: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';
 
    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
  }
};