

const blessed = require('blessed');

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

/*let block = blessed.box({
  parent: bg,
  width: 5,
  height: 5,
  bg: 'yellow',
  content: 'come here',
  top: 15,
  right: 15
});*/

let p1 = blessed.box({
  parent: bg,
  width: 3,
  height: 3,
  bg: 'red',
  content: 'BLUH',
  top: 0,
  right: 0
});

let p2 = blessed.box({
  parent: bg,
  width: 2,
  height: 4,
  bg: 'red',
  content: 'BLUH',
  top: 0,
  right: 0
});

let score = blessed.box({
  parent: bg,
  top: 0,
  left: 4,
  right: 50,
  height: 3,
  content: 'SCORE:'
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


p1.speed = 1;
p1.rtop = 0;``
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

  this.box = box;
}

Block.prototype.Generate = (() => {

  let box = blessed.box({
    parent: bg,
    height: 3,
    width: 3,
    left: rand1,
    top: rand2,
    bg: 'green',
    content: 'Eat me!'
  });

});

Block.prototype.contents = ((box) => {
  box.setContent('THX BRUH');
});

let block = new Block(screen.width, screen.height);



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
    if(p1.rleft > 0) p1.rleft -= p1.speed;
    screen.render();
  }
  else if(key.name == 'right'){
    if(p1.rright > 0) p1.rleft += p1.speed;
    screen.render();
  }
  // Check for overlap
  if(block.box.rleft == p1.rleft && block.box.rtop == p1.rtop){
    //block.contents(box);
    p1.score++;
    score.setContent('SCORE: ' + p1.score);
    let block = new Block(screen.width, screen.height);
    screen.render();
  }

});


screen.render();
