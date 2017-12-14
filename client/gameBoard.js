

const blessed = require('blessed')

let screen = blessed.screen({
  smartCSR:true
});

let spots = [];

for(let i = 0; i < 100; i+= 10){
  for(let j = 0; j < 10; j+= 10){
    let cell = new BoxContainer(j, i);
  }
}


function BoxContainer(horizontal, vertical){
  let cell = blessed.box({
    parent: screen,
    bg: 'red',
    name: 'cell',
    content: 'cell',
    top: vertical,
    left: horizontal
  });
  screen.render();
}
