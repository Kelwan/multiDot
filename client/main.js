
// A multiplayer dot game where you eat other dots to grow in size


let blessed = require('blessed');
let menu = require('./menu.js');
let logic = require('./logic.js');
//let gameBoard = require('./gameBoard.js');



console.log(menu.setGameType);

let val = menu.setGameType;

if (val == 1){
  let confirmation = blessed.text({
    parent: menu.screen,
    content: 'SINGLEPLAYER CONFIRMED',
    bg: 'green'
  });
}





//Logic Side
