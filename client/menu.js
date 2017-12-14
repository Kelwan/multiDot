let blessed = require('blessed');

//Render Side using Blessed

let screen = blessed.screen({
  smartCSR: true
});

screen.title = 'multidot';

let form = blessed.form({
  parent: screen,
  keys:true,
  left: 0,
  top: 0,
  width: '50%',
  height: '50%',
  bg: 'green',
  content: 'Choose game type'
});

let header = blessed.text({
  parent: form,
  left: '30%',
  width: 50,
  height: 5,
  align: 'center',
  valign: 'middle',
  content: 'MULTI-DOT',
  mouse: true,
  draggable: true
});

let singleplayer = blessed.button({
  parent: form,
  mouse: true,
  shrink: true,
  padding: {
    left: 2,
    right: 2,
    top: 2,
    bottom: 2,
  },
  left: 10,
  top: 15,
  name: 'singleplayer',
  content: 'S for Singleplayer',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

let multiplayer = blessed.button({
  parent:form,
  mouse: true,
  shrink: true,
  left: 85,
  top: 15,
  name: 'multiplayer',
  content:'A for Multiplayer',
  bg: 'blue',
  padding: {
    left: 2,
    right: 2,
    top: 2,
    bottom: 2,
  },


});

singleplayer.on('press', function() {
  form.setContent('Singeplayer enabled');
  form.submit();
});

form.on('submit', function(data){

});

screen.key('q', function(){
  process.exit(0);
});

screen.key('s', function(){
  form.setContent('Singeplayer enabled');
  setGameType(1);
  screen.render();
});

screen.key('a', function(){
  //form.setContent('multiplayer enabled');
  setGameType(2);
  screen.render();
});

function setGameType(val){
  return val;
}

//screen.append(box);

screen.render();
