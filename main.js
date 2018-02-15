
const blessed = require('blessed');
const render = require('./render.js');

const net = require('net');

const server = require('./server.js');
const client = require('./client.js');


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
}

function startGame(role, socket) {
  let game = new render.Render;

  //block.newBox(game.replaceBlock);


  let block = new Block(game.width, game.height);
  let p1 = new Player("p1");
  let p2 = new Player("p2");

    block.newBox(game, role);

    client.ClientEmitter.on('p1Position', () => {
      let test = client.ClientData;
        game.error.setContent(JSON.stringify(test.obj));
        game.p1.rleft = test.obj.left;
        game.p1.rtop = test.obj.top;
        game.screen.render();
    });

    game.screen.on('keypress', function(ch, key){
      if (key.name == 'down'){
        if(game.p1.rbottom > 0) game.p1.rtop += game.p1.speed;
        game.screen.render();
      }
      else if(key.name == 'up'){
        if (game.p1.rtop > 0) game.p1.rtop -= game.p1.speed;
        game.screen.render();
      }
      else if(key.name == 'left'){
        if(game.p1.rleft > 0) game.p1.rleft -= game.p1.speed;
        game.screen.render();
      }
      else if(key.name == 'right'){
        if(game.p1.rleft < game.screen.width) game.p1.rleft += game.p1.speed;
        game.screen.render();
      }

      if (role == 'host') {
        forClient(game.p1.rleft, game.p1.rtop, socket);
      }

        let test = client.ClientData;

        if(test.obj == undefined){
          game.error.setContent("undefined");
        }


        game.screen.render();

    }); // Does 'this' operate as a pointer?

    game.screen.render();


    //game.movePlayer(game);

    // Check for overlap
    /*if(block.box.left == p1.left && block.box.top == p1.top){
      p1.score++;
      score.setContent('SCORE: ' + p1.score);
      let randBlock = block.newBox(block.box);
      screen.render();
    }*/


}

function forClient(hleft, htop, socket){
  let Package = {
    left: hleft,
    top: htop
  };
  socket.write(JSON.stringify(Package), 'utf8');
}

function forHost(left, top){
  let Package = {
    left: left,
    top: top
  };
}



module.exports.startGame = startGame;
module.exports.forClient = forClient;
module.exports.forHost = forHost;
