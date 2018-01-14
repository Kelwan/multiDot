

const blessed = require('blessed');
//const logic = require('./logic.js');


function rand(max, min){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let screen = blessed.screen({
  smartCSR : true
});

let bg = blessed.box({
  parent: screen,
  bg: 'blue',
  height: screen.height,
  width: screen.width
});

let p1 = blessed.box({
  parent: bg,
  width: 3,
  height: 3,
  bg: 'red',
  content: 'P1',
  top: 10,
  right: 0
});

let p2 = blessed.box({
  parent: bg,
  width: 3,
  height: 3,
  bg: 'yellow',
  content: 'P2',
  top: 10,
  left: 0
});

let score = blessed.box({
  parent: bg,
  top: 0,
  left: 4,
  right: 50,
  height: 3,
  content: 'SCORE:'
});

let error = blessed.box({
  parent: bg,
  width: 5,
  height: 5,
  top: 20,
  left: 20,
  color: 'white'
  //content: error
});

let tally = blessed.box({
  parent: score,
  top: 1,
  left: 10,
  height: 1,
  content: 'TEST'
});

p1.score = 0;
p2.score = 0;

screen.key('q', function(){
  process.exit(0);
});

screen.key('e', function(){
  let error = blessed.box({
    parent: bg,
    width: 5,
    height: 5,
    top: 20,
    left: 20,
    color: 'white'
    //content: error
  });
});


p1.speed = 1;
p1.movable = true;


function Block(width, height){

  let rand1 = rand(width, 1);
  let rand2 = rand(height, 1);

  let box = blessed.box({
    parent: bg,
    height: 3,
    width: 3,
    left: rand1,
    top: rand2,
    bg: 'green',
    content: 'Eat me!'
  });

  this.width = width;
  this.height = height;
  this.box = box;
}


let block = new Block(screen.width, screen.height);

Block.prototype.newBox = function (oldBox){

  oldBox.destroy();

  let rand1 = rand(screen.width, 1);
  let rand2 = rand(screen.height, 10);

  let box = blessed.box({
    parent: bg,
    height: 3,
    width: 3,
    left: rand1,
    top: rand2,
    bg: 'green',
    content: 'Eat me!'
  });

  this.box = box;

}

Block.prototype.contents = ((box) => {
  box.setContent('THX BRUH');
});

screen.on('keypress', function(ch, key){

  if (key.name == 'down'){
    if(p1.rbottom > 0) p1.rtop += p1.speed;
    screen.render();
  }
  else if(key.name == 'up'){
    if (p1.rtop > 0) p1.rtop -= p1.speed;
    screen.render();
  }
  else if(key.name == 'left'){
    error.setContent(p1.left.toString());
    if(p1.left > 0) p1.left -= p1.speed;
    screen.render();
  }
  else if(key.name == 'right'){
    error.setContent(p1.right.toString());
    if(p1.rleft < screen.width) {
      p1.rleft += p1.speed;
    }
    screen.render();
  }
  // Check for overlap
  if(block.box.left == p1.left && block.box.top == p1.top){
    p1.score++;
    score.setContent('SCORE: ' + p1.score);
    block.newBox(block.box);
    screen.render();
  }

});


screen.render();
