/**
 * Binary heap data structure is used in the A* 
 * implementation instead of an array for 
 * faster performance and efficiency 
 */
function BinaryHeap(costMethod) {
  this.elements = [];
}

BinaryHeap.prototype = {
  push: function (element) {
    var n = this.elements.length;
    this.elements.push(element);
    this.move_down(n);
  },

  pop: function (element) {
    var return_val = this.elements[0];

    var last = this.elements.pop();

    if (this.elements.length > 0) {
      this.elements[0] = last;
      this.move_up(0);
    }

    return return_val;
  },

  size: function () {
    return this.elements.length;
  },

  move_up: function (k) {
    var target = this.elements[k];
    var target_score = this.getCost(target);

    while (true) {
      var second_child_i = (2* k) + 2;
      var first_child_i = second_child_i - 1;

      var tmp = null;

      if (first_child_i < this.elements.length) {
        var first_child = this.elements[first_child_i];
        var first_child_cost = this.getCost(first_child);

        if (first_child_cost < target_score)  tmp = first_child_i;
      } 

      if (second_child_i < this.elements.length) {
        var second_child = this.elements[second_child_i];
        var second_child_cost = this.getCost(second_child);

        var compareTo = tmp ? target_score : first_child_cost;
        if (second_child_cost < compareTo)  tmp = second_child_i;
      }

      if (tmp == null)
        break;

      // if it exists, swap the target with tmp
      this.elements[k] = this.elements[tmp];
      this.elements[tmp] = target;
      k = tmp;
    }
  },

  move_down: function (k) {
    var target = this.elements[k];
    var target_score = this.getCost(target);

    while (k>0) {
      var parent_index = Math.floor((k+1)/2) -1;
      var parent = this.elements[parent_index];

      if(this.getCost(parent) < target_score)
        break;

      // swap parent with target
      this.elements[parent_index] = target;
      this.elements[k] = parent;
      k = parent_index
    }
  },

  getCost: function(n) { 
    return n.score; 
  },

  reposition (node) {
    var n_i = this.elements.indexOf(node);
    return this.move_down(n_i);
  }

};