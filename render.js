

const blessed = require('blessed');



function Render(){

  let screen = blessed.screen({
    smartCSR : true
  });

  let p1Score = 0;
  let p2Score = 0;

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

  p1.speed = 1;
  p1.movable = true;

  let p2 = blessed.box({
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



  this.screen = screen;
  this.p1 = p1;
  this.p2 = p2;

  screen.render();

}

Render.prototype.updateScore = ((p1Score, p2Score) => {

});

Render.prototype.renderScreen = (()=> {
  screen.render();
});

Render.prototype.newBox = function () {

  let box = blessed.box({
    parent: game.screen,
    height: 3,
    width: 3,
    left: block.rand1,
    top: block.rand2,
    bg: 'green',
    content: 'Eat me!'
  });

};

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

Render.prototype.movePlayerMinus = ((player, direction) => {

  

  screen.render();


});

Render.prototype.movePlayerPlus = ((player, direction) => {
  screen.render();
});

Render.prototype.confirmConnect = (() => {
  p1.setContent('DATA RECEIEVED');
});

module.exports.Render = Render;
