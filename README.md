# phaser-path-finder

--------------------------------------------

You can play the game here:
https://safarimaedeh-hw3-bidsvkpmhw.firebaseapp.com/

## All game art is from open game tileset:
http://opengameart.org/content/dungeon-tileset-1




--------------------------------------------
Game Controls:
--------------------------------------------

  * Click on any given cell:
      Finds shortest path to destination if it's reachable.

  * Press Keyboard key `M`:
      Increase player velocity by 5 units. Have to increase it a couple of times to notice it.

  * Press Keyboard key `N`:
      Decrease player velocity by 5 units. Have to decrease it a couple of time to notice it.

  * Press keyboard key `L`:
      Toggle show path. It will render a green dot on each path cell. 
      Path will get erased after player reaches its destination.
      If pressed again path will not be rendered anymore.


--------------------------------------------
Please Note:
--------------------------------------------
  * I decided to not allow diagonal movements for my A* algorithm simply by not including diagonal neighbors. 
      The player moves more realistic without diagonal movements.
      You can check the algorithm in `src/PathFinder.js`



