var TopDownGame = TopDownGame || {};
 
//title screen
TopDownGame.Game = function(){};
 
TopDownGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');
 
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');
 
    //create layer
    this.backgroundlayer = this.map.createLayer('Background');
    this.blockedLayer = this.map.createLayer('BlockedLayer');
 
    //collision on blockedLayer
    this.map.setCollisionBetween(1, 500, true, 'BlockedLayer');
 
    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();
    this.createObjects();

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'ObjectLayer')
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.player.scale.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.collideWorldBounds = true;
    this.player.body.allowGravity = false;

    // set anchor point to be the center of the collision box
    this.player.anchor.setTo(0.5, 0.5);

    // this adds the player animations
    this.player.animations.add('left', [1, 5,,9, 13], 10, true);
    this.player.animations.add('right', [3, 7, 11, 15], 10, true);
    this.player.animations.add('up', [2, 6, 10, 14], 10, true);
    this.player.animations.add('down', [0, 4, 8, 12], 10, true);
    this.player.animations.add('idle', [0], 10, true);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    TopDownGame.traverse = {
      x : 0,
      y: 0
    };

    TopDownGame.path = [];
    TopDownGame.pathSprites = [];
    TopDownGame.path_counter = -1;
    TopDownGame.player_velocity = 300;
    TopDownGame.toggle_path = false;

    // make the game grid
    var grid = initGraph(this.map);


    // Game Control

    this.input.onDown.add(function() {
      var actual_pointer = this.input.activePointer;
      actual_pointer.x += this.game.camera.view.x;
      actual_pointer.y += this.game.camera.view.y;
      findPath(this.player, actual_pointer);
    }, this);

    this.game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.add(function () {   
      TopDownGame.player_velocity -= 5;
    }, this);

    this.game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(function () {   
      TopDownGame.player_velocity += 5;
    }, this);

    this.game.input.keyboard.addKey(Phaser.Keyboard.L).onDown.add(function () {   
      TopDownGame.toggle_path = !TopDownGame.toggle_path;
    }, this);

  },

  update: function() {
    // collision with blocked layer or walls of the game world
    this.game.physics.arcade.collide(this.player, this.blockedLayer);

    //player movement
    if (TopDownGame.path.length > 0) {
      traverse(this.player);
    }
    else {
      if (TopDownGame.pathSprites && TopDownGame.pathSprites.length > 0)
        erasePath();
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      this.player.animations.play('idle');
    }
  },
  createObjects: function() {
    //create items
    this.objects = this.game.add.group();
    this.objects.enableBody = true;
    var obj;    
    result = this.findObjectsByType('object', this.map, 'ObjectLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.objects);
    }, this);
  },
  //find objects in a Tiled layer that contains a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.visible && element.properties.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.name);
 
      //copy all properties to the sprite
      Object.keys(element).forEach(function(key){
        sprite[key] = element[key];
      });
  }
}