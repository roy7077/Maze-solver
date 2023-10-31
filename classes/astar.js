function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function heuristic(a, b) {
  let d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

var openSet = [];
var closedSet = [];

var start;
var end;

var w_, h_;

var path = [];

function startAstar(width_, height_) {
  w_ = width_ / cols;
  h_ = height_ / rows;

  start = grid[0];
  end = grid[grid.length - 1];

  openSet.push(start);
}

function wallPresent(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    return a.walls[3] && b.walls[1];
  } else if (x === -1) {
    return a.walls[1] && b.walls[3];
  }
  let y = a.j - b.j;
  if (y === 1) {
    return a.walls[0] && b.walls[2];
  } else if (y === -1) {
    return a.walls[2] && b.walls[0];
  }
}

function iterateAstar() {
  var current;

  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    current = openSet[winner];

    if (current === end) {
      noLoop();
      console.log('done');
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;

    
    for (let i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      

      if (!closedSet.includes(neighbor) && !wallPresent(current, neighbor)) {
        var tempG = current.g + heuristic(neighbor, current);

        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  } else {
    console.log('no solution');
    noLoop();
    return;
  }

  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  //drawPath();
}

function drawPath() {
  noFill();
  stroke(242, 196, 56);
  strokeWeight(w_ / 2);
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].i * w_ + w_ / 2, path[i].j * h_ + h_ / 2);
  }
  endShape();
}