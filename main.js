

const blessed = require('blessed');
const server = require('./server.js');
const client = require('./client.js')

// Main file w/ menu, start from here

let screen = blessed.screen({

});

let bg = blessed.box({
  parent: screen,
  title: 'Main Menu',
  width: screen.width,
  height: screen.height
});

let logo = blessed.text({
  parent: bg,
  top: 5,
  left: '50%',
  content: ' MULTIDOT ',
  style : {
    bg: 'blue',
    hover: {
      bg: 'red'
    },
    shadow: true
  },
  border: {
    type: 'line',
    bg: 'purple',
    fg: 'purple'
  }
});

let hostBox = blessed.box({
  parent: bg,
  left: '20%',
  content: ' HOST (H)',
  width: 15,
  height: 3,
  top: '50%'
});

let clientBox = blessed.box({
  parent: bg,
  left: '80%',
  content: ' JOIN (J)',
  width: 15,
  height: 3,
  top: '50%'
});

screen.key('q', () => {
  process.exit('0');
});

screen.key('h', () => {
  hostBox.setContent('H PRESSED');
  //screen.destroy();
  server.multiServer;
  screen.render();
});

screen.key('j', () => {
  //screen.destroy();
  client.multiClient;
});

screen.render();


// Main > Client + Server > Render
