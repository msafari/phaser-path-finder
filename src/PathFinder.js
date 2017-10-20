var PathFinder = {
  calculate_h: function (c1, c2) {
    var dist_1 = Math.abs(c1.x - c2.x);
    var dist_2 = Math.abs(c1.y - c2.y);

    return dist_2 + dist_1;
  },

  pathTo: function (node) {
    var cursor = node;
    var path = [];

    while(cursor.parent) {
      path.unshift(cursor);
      cursor = cursor.parent
    }

    return path;
  },

  a_star_search: function(start, dest, graph) {
    graph.empty_closed_list();

    var open = new BinaryHeap();

    var closest = start;
    start.h = this.calculate_h(start, dest);
    graph.add_closed_list(start); 
    open.push(start);

    while (open.size() > 0) {
      var cursor = open.pop();

      // base case
      if (cursor === dest) {
        return this.pathTo(cursor);
      } 

      cursor.closed = true;

      var adjacents = graph.neighbors(cursor);

      _.forEach(adjacents, function(adjacent, i) {
        if (!adjacent.closed && adjacent.is_walkable()) {

          //calculate g score
          var g = cursor.g + adjacent.cost(cursor);
          var alreadyVisited = adjacent.visited;

          if (!alreadyVisited || g < adjacent.g) {
            adjacent.visited = true;
            adjacent.parent = cursor;
            adjacent.h = adjacent.h || PathFinder.calculate_h(adjacent, dest);
            adjacent.g = g;
            adjacent.score = adjacent.h + adjacent.g;
            graph.add_closed_list(adjacent);

            if (!alreadyVisited) {
              open.push(adjacent);
            }
            else {
              open.reposition(adjacent);
            }
          }

        }
      });

    }

    // there's no valid path to destination
    // return an empty list
    // TODO: maybe add a visual indicating to the player that it's not reachable?
    return [];
  }
};