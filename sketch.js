let cols, rows;
let w = 20;
let grid = [];
let current;
let stack = [];
let pos = 0;
let btn;
let btn2;
let btn3;

let diff;

function setup() {
  let c = createCanvas(830, 400);
  c.parent('canvasArea');
  generateMaze(400, 400);
  startAstar(400, 400);

  if (getItem('difficulty')) {
    diff = parseInt(getItem('difficulty'));
  } else {
    storeItem('difficulty', '6');
    diff = 6;
  }

  btn = select("#resetBtn");
  //btn.position(10, 440);
  btn.mousePressed(resetGame);

  btn2 = select("#pauseBtn");
  //btn2.position(50, 440);
  btn2.mousePressed(pauseGame);

  btn3 = select("#resumeBtn");
  //btn3.position(80, 440);
  btn3.mousePressed(resumeGame);
  
  select("#easyBtn").mousePressed(easyDiff);
  select("#medBtn").mousePressed(medDiff);
  select("#hardBtn").mousePressed(hardDiff);
}

function resetGame() {
  location.reload();
  return false;
}

function pauseGame() {
  noLoop();
}

function resumeGame() {
  loop();
}

function draw() {
  //background(51);
  fill(51);
  noStroke();
  rect(0, 0, 400, 400);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  checkMovement();

  grid[0].start();
  grid[grid.length - 1].end();
  grid[floor(pos)].highlight();

  push();
  translate(width - 400, 0);
  fill(51);
  noStroke();
  rect(0, 0, 400, 400);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  grid[0].start();
  grid[grid.length - 1].end();

  if (frameCount % diff == 0) {
    iterateAstar();
  }
  drawPath();
  pop();

  if (pos == grid.length - 1) {
    pauseGame();
  }
}

function easyDiff() {
  if(getItem('difficulty') != '6') {
    storeItem('difficulty', '6');
    resetGame();
  }
}

function medDiff() {
  if(getItem('difficulty') != '3') {
    storeItem('difficulty', '3');
    resetGame();
  }
}

function hardDiff() {
  if(getItem('difficulty') != '1') {
    storeItem('difficulty', '1');
    resetGame();
  }
}



function checkMovement() {
  if (keyIsDown(RIGHT_ARROW)) {
    if ((pos + 1) % cols != 0 && !grid[pos + 1].walls[3]) {
      pos += 1;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if ((pos) % cols != 0 && !grid[pos - 1].walls[1]) {
      pos -= 1;
    }
  }
  if (keyIsDown(UP_ARROW)) {
    if (pos >= cols && !grid[pos - cols].walls[2]) {
      pos -= cols;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (pos < grid.length - cols && !grid[pos + cols].walls[0]) {
      pos += cols;
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}