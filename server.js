
const net = require('net');
const blessed = require('blessed');
const main = require('./main.js');


function multiServer(){

  let screen = blessed.screen({});
  let connection = false;

  let hostBox = blessed.box({
    parent: screen,
    top: '50%',
    left: '50%',
    content: 'WAITING FOR CONNECTION...'
  });

  screen.render();

  const server = net.createServer((socket) => {
    hostBox.setContent('CLIENT CONNECTED');
    connection = true;
    screen.render();

    setTimeout(() => {
      main.startGame();
    }, 1500);

    socket.on('error', (err) => {
      console.log(err);
    });

    socket.on('data', (data) => {

    });

    //socket.write();
  });

  server.on('error', (err) => {
    console.log(err);
  });

  server.listen(3000, () => {

  });


// Server receives data then distributes it to the CLIENT.

  screen.key('q', () => {
    process.exit(0);
  });

}


module.exports.multiServer = multiServer;
// It becomes a method for 'server'??
