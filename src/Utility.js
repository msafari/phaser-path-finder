// make a graph from tiled map
var initGraph = function(map, player){
  this.map = map;
  this.player = player;
  var walkable_data_index = _.findIndex(this.map.layers, function(layer) {
    return layer.name == "Background";
  });

  walkable_data = this.map.layers[walkable_data_index].data;
  var game_grid = Array(313).fill().map(()=> []);
  var cell;

  // populate the grid with value 1 if the tile is walkable
  for (var i =0; i<this.map.width; i++) {
    for(var j=0; j<this.map.height; j++){
      cell = walkable_data[i][j];

      if (cell) {
        game_grid[cell.x][cell.y] = 1;
      }
    }
  }

  this.graph = new Graph(game_grid);
  return this.graph;
};

var findPath = function (player, mouse) {
  this.player = player;
  var playerX = Math.floor (this.player.x/ this.map.tileWidth),
    playerY = Math.floor (this.player.y/ this.map.tileHeight),
    mouseX = Math.floor (mouse.x / this.map.tileWidth),
    mouseY = Math.floor (mouse.y / this.map.tileHeight);

  var start = this.graph.node_grid[playerX][playerY];
  var dest = this.graph.node_grid[mouseX][mouseY];

  TopDownGame.path = PathFinder.a_star_search(start, dest, this.graph);

  TopDownGame.path_counter = 0;
  if (TopDownGame.toggle_path) {
    drawPath();
    this.player.bringToTop();
  }
};

var traverse = function (player) {
  this.player = player;

  var length = TopDownGame.path.length;
  var velocity;

  var destX = TopDownGame.path[length -1].x * this.map.tileWidth;
  var destY = TopDownGame.path[length -1].y * this.map.tileHeight;

  if (TopDownGame.path.length > 0) {
    this.next_pos = TopDownGame.path[TopDownGame.path_counter];
    TopDownGame.traverse.x = this.next_pos.x * this.map.tileWidth;
    TopDownGame.traverse.y = this.next_pos.y * this.map.tileHeight;
    
    velocity = new Phaser.Point(TopDownGame.traverse.x - this.player.x, TopDownGame.traverse.y - this.player.y);
    var abs_v_x = Math.abs(velocity.x);
    var abs_v_y = Math.abs(velocity.y);

    if (velocity.x > 0 && abs_v_x >= abs_v_y) {
      this.player.animations.play('right');
    }
    else if (velocity.x < 0 && abs_v_x >= abs_v_y) {
      this.player.animations.play('left');
    }
    if (velocity.y < 0 && abs_v_x <= abs_v_y) {
      this.player.animations.play('up');
    }
    else if (velocity.y > 0 && abs_v_x <= abs_v_y) {
      this.player.animations.play('down');
    }

    var target_position = new Phaser.Point(TopDownGame.traverse.x, TopDownGame.traverse.y);
    if ( !reached_target (this.player, target_position) ) {
      TopDownGame.game.physics.arcade.moveToXY(this.player, TopDownGame.traverse.x, TopDownGame.traverse.y, TopDownGame.player_velocity);
    } else {
      if (TopDownGame.path_counter < length -1) {
        TopDownGame.path_counter +=1;
      }
      else {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.animations.play('idle');
        TopDownGame.path = [];
        TopDownGame.path_counter = -1;
        this.next_pos = null;
      }
    }
  }
};

var drawPath = function() {
  for (var i = 0; i<= TopDownGame.path.length - 1; i++) {
    TopDownGame.pathSprites.push(TopDownGame.game.add.sprite(TopDownGame.path[i].x * 16, TopDownGame.path[i].y * 16, 'path'));
  }
};

var erasePath = function() {
  for (var i = 0; i < TopDownGame.pathSprites.length; i++) {
    TopDownGame.pathSprites[i].destroy();
  }
  TopDownGame.pathSprites = [];
};

var reached_target = function (player, target) {
  var current_position = new Phaser.Point(player.x, player.y);
  var distance = Phaser.Point.distance(current_position, target);
  return distance < 15;
}