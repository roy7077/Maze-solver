function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.neighbors = [];

  this.previous = undefined;
  
  this.getNeighbors = function() {
    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top) {
      this.neighbors.push(top);
    }
    if (right) {
      this.neighbors.push(right);
    }
    if (bottom) {
      this.neighbors.push(bottom);
    }
    if (left) {
      this.neighbors.push(left);
    }
  }

  this.checkNeighbors = function() {
    let neighbors = [];

    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }
  
  this.highlight = function() {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(242, 196, 56);
    ellipse(x + w/2, y + w/2, w - 6, w - 6);
  }
  
  this.start = function() {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(0, 255, 0, 255);
    rect(x, y, w - 1, w - 1);
  }
  
  this.end = function() {
    let x = this.i * w + 1;
    let y = this.j * w + 1;
    noStroke();
    fill(255, 0, 0, 255);
    rect(x, y, w - 1, w - 1);
  }

  this.show = function() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(242, 87, 73, 150);
      rect(x, y, w, w);
    }
  }
}