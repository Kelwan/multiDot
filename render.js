

const blessed = require('blessed');



function Render(){

  let screen = blessed.screen({
    smartCSR : true
  });

  let bg = blessed.box({
    parent: screen,
    bg: 'blue',
    height: screen.height,
    width: screen.width
  });

  p1 = blessed.box({
    parent: bg,
    width: 3,
    height: 3,
    bg: 'red',
    content: 'P1',
    top: 10,
    right: 0
  });

  p1.speed = 1;
  p1.movable = true;

  p2 = blessed.box({
    parent: bg,
    width: 3,
    height: 3,
    bg: 'yellow',
    content: 'P2',
    top: 10,
    left: 0
  });

    p2.speed = 1;
    p2.moveable = true;

  let score = blessed.box({
    parent: bg,
    top: 0,
    left: 4,
    right: 50,
    height: 3,
    content: 'SCORE: '
  });

  let p1Score = blessed.text({
    parent: bg,
    top: 2,
    left: 5,
    color: 'red',
    content: '0'
  });

  let p2Score = blessed.text({
    parent: score,
    top: 2,
    left: 15,
    height: 1,
    content: '0'
  });

  /*this.error = blessed.box({
    parent: screen,
    width: 20,
    height: 5,
    top: '50%',
    left: '50%',
    bg: 'yellow'
    //content: error

  });*/

  screen.key('e', function(){

  });

  screen.key('q', () => {
    process.exit(0);
  });

  this.screen = screen;
  this.p1 = p1;
  this.p2 = p2;
  this.p1Score = p1Score;
  this.p2Score = p2Score;

  screen.render();

}

Render.prototype.updateScore = function (p1Score, p2Score) {
  //p1Score.setContent(p1Score);
  //p2Score.setContent(p2Score);
  //this.screen.render();
}

Render.prototype.renderScreen = (()=> {
  screen.render();
});

Render.prototype.movePiece = function(ch, key, role) {
  if(role == 'host'){
    if (key.name == 'down'){
      if(p1.rbottom > 0) p1.rtop += p1.speed;
      this.screen.render();
    }
    else if(key.name == 'up'){
      if (p1.rtop > 0) p1.rtop -= p1.speed;
      this.screen.render();
    }
    else if(key.name == 'left'){
      if(p1.rleft > 0) p1.rleft -= p1.speed;
    }
    else if(key.name == 'right'){
      if(p1.rleft < this.screen.width) p1.rleft += p1.speed;
    }
  }

  if (role == 'client'){
    if (key.name == 'down'){
      if(p2.rbottom > 0) p2.rtop += p2.speed;
      this.screen.render();
    }
    else if(key.name == 'up'){
      if (p2.rtop > 0) p2.rtop -= p2.speed;
      this.screen.render();
    }
    else if(key.name == 'left'){
      if(p2.rleft > 0) p2.rleft -= p2.speed;
    }
    else if(key.name == 'right'){
      if(p2.rleft < this.screen.width) p2.rleft += p2.speed;
    }
  }
}

Render.prototype.newBox = (() => {
  let box = blessed.box({
    parent: this.screen,
    height: 3,
    width: 3,
    left: block.rand1,
    top: block.rand2,
    bg: 'green',
    content: 'Eat me!'
  });
  this.screen.render();
});

Render.prototype.replaceBlock = ((oldBox) => {
  //oldBox.destroy();

if(string == 'host'){
  let box = blessed.box({
    parent: bg,
    height: 3,
    width: 3,
    left: rand1,
    top: rand2,
    bg: 'green',
    content: 'Eat me!'
  });
}

});

Render.prototype.checkOverlap = function(left, top, role){

  if(role == 'host'){
    if(p1.rleft == left && p1.rtop == top){
      return role;
    }
  }
  else if(role == 'client'){
    if(p2.rleft == left && p2.rtop == top){
      return role;
    }
  }
  else {return 'denied'};
  this.screen.render();
}

Render.prototype.getLocation  = function(role){
  if (role == 'host'){
    return [p1.rleft, p1.rtop];
  }

  else if(role == 'client'){
    return [p2.rleft, p2.rtop]
  }
}

module.exports.Render = Render;
