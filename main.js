
const blessed = require('blessed');
const render = require('./render.js');

const net = require('net');

const server = require('./server.js');
const client = require('./client.js');
const EventEmitter = require('events');


function rand(max, min){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Block(width, height, gScreen){
  this.width = width;
  this.height = height;
  this.gScreen = gScreen;
}

Block.prototype.getRandom = function() {
  let rand1 = rand(this.width - 5, 5);
  let rand2 = rand(this.height - 5, 10);
  this.rand1 = rand1;
  this.rand2 = rand2;

};

Block.prototype.replaceBlock = function() {
  this.box.destroy();

  let box = blessed.box({
    parent: this.gScreen,
    height: 3,
    width: 3,
    left: this.rand1,
    top: this.rand2,
    bg: 'green',
    content: 'eat me'
  });


  this.box = box;

};

Block.prototype.createBlock = function(){
  let box = blessed.box({
    parent: this.gScreen,
    height: 3,
    width: 3,
    left: this.rand1,
    top: this.rand2,
    bg: 'green',
    content: 'eat me'
  });
  this.box = box;

}

Block.prototype.clientBlock = function (rand1, rand2) {

  if(this.box != undefined){
    this.box.destroy();
  }

  let box = blessed.box({
    parent: this.gScreen,
    height: 3,
    width: 3,
    left: rand1,
    top: rand2,
    bg: 'green',
    content: 'eat me'
  });
  this.rand1 = rand1;
  this.rand2 = rand2;
  this.box = box;
};

function Player(player, score){
  this.player = player;
  this.score = score;
}

function startGame(role, socket) {
  let game = new render.Render;
  let block;
  let score = 0;

  block = new Block(game.screen.width, game.screen.height, game.screen);
  if(role == 'host'){
    block.getRandom();
    block.createBlock();
    let loc = game.getLocation(role);
    forClient(loc[0], loc[1], socket, block.rand1, block.rand2);
  }

  let player1 = new Player("p1", 0, "host");
  let player2 = new Player("p2", 0, "client");

  game.screen.render();

    client.ClientEmitter.on('p1Position', () => {

        let hData = client.ClientData;
          //game.error.setContent(JSON.stringify(hData.obj));
          if(game.p1.rleft != undefined){
            game.p1.rleft = hData.obj.left;
            game.p1.rtop = hData.obj.top;
          }

          player1.score = hData.obj.score;

          block.clientBlock(hData.obj.rand1, hData.obj.rand2);
          game.screen.render();

    });



    server.HostEmitter.on('p2Position', () => {
      let cData = server.HostData;
      //game.error.setContent(JSON.stringify(cData.obj));
      game.p2.rleft = cData.obj.left;
      game.p2.rtop = cData.obj.top;

      player2.score = cData.obj.score;

      game.screen.render();
    });

    game.screen.on('keypress', function(ch, key){


      let test = client.ClientData;

        if(test.obj == undefined){
        //  game.error.setContent("undefined");
        }

        // Check for overlap and victory
        setTimeout(() => {
          let position = game.getLocation(role);
          let checkScore;
          let myEmitter = new EventEmitter();


          if(position[0] == block.box.rleft && position[1] == block.box.rtop){
            let p2Scored = false;

            if(role == 'client'){
              p2Scored = true;
              player2.score++;
            }
            if(role == 'host'){
              player1.score++;
              block.getRandom();
              block.replaceBlock();
            }

            if(p2Scored == true && role == 'host'){
              block.getRandom();
              block.replaceBlock();
            }



          }

        }, 50);

          game.movePiece(ch, key, role);
          if (role == 'host') {
            let loc = game.getLocation(role);
            forClient(loc[0], loc[1], socket, block.rand1, block.rand2, player1.score);
          }

          if(role == 'client') {
            let loc = game.getLocation(role);
            forHost(loc[0], loc[1], socket, player2.score);
          }
          game.updateScore(player1.score, player2.score);

        game.screen.render();
    }); // Does 'this' operate as a pointer?

    game.screen.render();



}

function forClient(hleft, htop, socket, hRand1, hRand2, hScore){
  let Package = {
    left: hleft,
    top: htop,
    rand1: hRand1,
    rand2: hRand2,
    score: hScore
  };
  socket.write(JSON.stringify(Package), 'utf8');
}

function forHost(cleft, ctop, client, cScore){
  let Package = {
    left: cleft,
    top: ctop,
    score: cScore
  };
  client.write(JSON.stringify(Package), 'utf8');
}



module.exports.startGame = startGame;
module.exports.forClient = forClient;
module.exports.forHost = forHost;
