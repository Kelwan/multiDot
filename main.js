
const blessed = require('blessed');
const render = require('./render.js');
const net = require('net');

function rand(max, min){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Block(width, height){

  let rand1 = rand(width, 1);
  let rand2 = rand(height, 10);

  this.rand1 = rand1;
  this.rand2 = rand2;

  this.width = width;
  this.height = height;
}

Block.prototype.newBox = function(render){
  render.newBox;
  render.renderScreen;
};

function Player(player){
  this.player = player;
  let direction = null;
}

function startGame(role, socket) {
  let game = new render.Render;

  //block.newBox(game.replaceBlock);


  let block = new Block(game.width, game.height);
  let p1 = new Player(p1);
  let p2 = new Player(p2);

    block.newBox(game, role);



  screen.on('keypress', function(ch, key){
    if (key.name == 'down'){
      if(p1.rbottom > 0) {
        game.movePlayerPlus(p1)
      } p1.rtop += p1.speed;
      screen.render();
    }
    else if(key.name == 'up'){
      if (p1.rtop > 0) p1.rtop -= p1.speed;
      screen.render();
    }
    else if(key.name == 'left'){
      if(p1.left > 0) p1.left -= p1.speed;
      screen.render();
    }
    else if(key.name == 'right'){
      if(p1.rleft < screen.width) {
        p1.rleft += p1.speed;
      }
      screen.render();
    }
    // Check for overlap
    if(block.box.left == p1.left && block.box.top == p1.top){
      p1.score++;
      score.setContent('SCORE: ' + p1.score);
      let randBlock = block.newBox(block.box);
      screen.render();
    }

    if (role == 'host'){
      ForClient(p1.rleft, p1.rtop);
    }

    if(role == 'client'){
      ForHost(p2.rleft, p2.rtop);
    }
  });
}

function ForClient(left, top, score, boxLeft, boxTop){
  function package = {
    left: left,
    top: top,
    boxLeft: boxLeft,
    boxTop: boxTop
  }
}

function ForHost(left, top){
  function package = {
    left: left,
    top: top
  }
}



module.exports.startGame = startGame;
module.exports.ForClient = ForClient;
module.exports.ForHost = ForHost;
