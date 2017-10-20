function Graph (grid) {
  this.nodes = [];
  this.node_grid = Array(313).fill().map(()=> []);

  for (var i=0; i< grid.length; i++) {

    for(var j=0; j< grid[i].length; j++) {
      this.node_grid[i][j] =  new GraphNode(i, j, grid[i][j] || 0);
      this.nodes.push(this.node_grid[i][j]);
    };
  }

  this.init();
}

Graph.prototype = {
  resetAllProperties: function(node) {
    node.score = 0;
    node.g = 0;
    node.h = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
  },

  init: function() {
    this.closed_list = [];
    for (var i=0; i< this.nodes.length; i++) {
      this.resetAllProperties(this.nodes[i]);
    };
  },

  neighbors: function(node) {
    var neighbors = [];
    var i = node.x;
    var j = node.y;

    //check left
    if (this.node_grid[i-1] && this.node_grid[i-1][j]) {
      neighbors.push( this.node_grid [i-1][j] );
    }

    //check down
    if (this.node_grid[i] && this.node_grid[i][j-1]) {
      neighbors.push( this.node_grid [i][j-1] );
    }

    //check right
    if (this.node_grid[i+1] && this.node_grid [i+1][j]) {
      neighbors.push( this.node_grid[i+1][j]);
    }

    //check up 
    if (this.node_grid[i] && this.node_grid[i][j+1]) {
      neighbors.push( this.node_grid[i][j+1] );
    }

    // commenting out for now. it doesn't make sense to allow diagonal movements
    // TODO: figure out if it's required to allow diagonals
    // //check diagonals
    // if (this.node_grid[i-1]) {
    //   if (this.node_grid[i-1][j+1]) {
    //     neighbors.push(this.node_grid[i-1][j+1]);
    //   }

    //   if (this.node_grid[i-1][j-1]) {
    //     neighbors.push(this.node_grid[i-1][j-1]);
    //   }
    // }

    // if (this.node_grid[i+1]) {
    //   if (this.node_grid[i+1][j+1]) {
    //     neighbors.push(this.node_grid[i+1][j+1]);
    //   }

    //   if (this.node_grid[i+1][j-1]) {
    //     neighbors.push(this.node_grid[i+1][j-1]);
    //   }
    // }

    return neighbors;

  },
  add_closed_list: function(node) {
    this.closed_list.push(node);
  },

  empty_closed_list: function() {
    // before we reset the list we need to reset the properties
    for (var i=0; i< this.closed_list.length; i++) {
      this.resetAllProperties(this.closed_list[i]);
    };
    this.closed_list = [];
  },

};

/**
 * [GraphNode description]
 * @param x : x-coordinate of graph node
 * @param y : y-coordinate of graph node
 * @param w : weigh or value of the original grid[x][y]
 */
var GraphNode = function (x, y, w) {
  this.x = x;
  this.y = y;
  this.w = w;
};

GraphNode.prototype = {
  cost: function(node) {
    if (node && node.x != this.x && node.y != this.y) 
      return this.w * 1.5;
    return this.w;
  },

  is_walkable: function() {
    return this.w === 1;
  }
}