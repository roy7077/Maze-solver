function generateMaze(width_, height_) {
  cols = floor(width_ / w);
  rows = floor(height_ / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  
  for (let i = 0; i < grid.length; i++) {
    grid[i].getNeighbors();
  }

  current = grid[0];
  stack.push(current);
  
  while(stack.length > 0) {
    current.visited = true;
    //current.highlight();
    let next = current.checkNeighbors();
    if (next) {
      next.visited = true;

      stack.push(current);

      removeWalls(current, next);

      current = next;
    } else {
      current = stack.pop();
    }
  }
}