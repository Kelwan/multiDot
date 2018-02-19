
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
  let rand1 = rand(this.width, 1);
  let rand2 = rand(this.height, 10);
  this.rand1 = rand1;
  this.rand2 = rand2;

};

Block.prototype.replaceBlock = function() {
  this.box.destroy();

  this.rand1 = rand(this.width, 1);
  this.rand2 = rand(this.height, 10);

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

}

Block.prototype.clientBlock = function (rand1, rand2) {
  let box = blessed.box({
    parent: this.gScreen,
    height: 3,
    width: 3,
    left: rand1,
    top: rand2,
    bg: 'green',
    content: 'eat me'
  });
};

function Player(player){
  this.player = player;
}



function startGame(role, socket) {
  let game = new render.Render;
  let block;

  block = new Block(game.screen.width, game.screen.height, game.screen);
  if(role == 'host'){
    block.getRandom();
    block.createBlock();
    let loc = game.getLocation(role);

    forClient(loc[0], loc[1], socket, block.rand1, block.rand2);


  }

  let p1 = new Player("p1");
  let p2 = new Player("p2");

  game.screen.render();

    client.ClientEmitter.on('p1Position', () => {

        let hData = client.ClientData;
          //game.error.setContent(JSON.stringify(hData.obj));
          if(game.p1.rleft != undefined){
            game.p1.rleft = hData.obj.left;
            game.p1.rtop = hData.obj.top;
          }
          if(hData.obj.rand1 != undefined){
            block.clientBlock(hData.obj.rand1, hData.obj.rand2);
          }
          game.screen.render();
          block.clientBlock(hData.obj.rand1, hData.obj.rand2);
    });



    server.HostEmitter.on('p2Position', () => {
      let cData = server.HostData;
      //game.error.setContent(JSON.stringify(cData.obj));
      game.p2.rleft = cData.obj.left;
      game.p2.rtop = cData.obj.top;
      game.screen.render();
    });

    game.screen.on('keypress', function(ch, key){

      game.movePiece(ch, key, role);


      if (role == 'host') {
        let loc = game.getLocation(role);
        forClient(loc[0], loc[1], socket, block.rand1, block.rand2);
      }

      if(role == 'client') {
        let loc = game.getLocation(role);
        forHost(loc[0], loc[1], socket);
      }



        let test = client.ClientData;

        if(test.obj == undefined){
        //  game.error.setContent("undefined");
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

function forClient(hleft, htop, socket, hRand1, hRand2){
  let Package = {
    left: hleft,
    top: htop,
    rand1: hRand1,
    rand2: hRand2
  };
  socket.write(JSON.stringify(Package), 'utf8');
}

function forHost(cleft, ctop, client){
  let Package = {
    left: cleft,
    top: ctop,
  };
  client.write(JSON.stringify(Package), 'utf8');
}



module.exports.startGame = startGame;
module.exports.forClient = forClient;
module.exports.forHost = forHost;
