
const net = require('net');
const blessed = require('blessed');
const main = require('./main.js');
const EventEmitter = require('events');


function multiServer(){


  let screen = blessed.screen({});

  let hostBox = blessed.box({
    parent: screen,
    top: '50%',
    left: '50%',
    content: 'WAITING FOR CONNECTION...'
  });

  screen.render();

  const server = net.createServer((socket) => {
    hostBox.setContent('CLIENT CONNECTED');
    screen.render();

    setTimeout(() => {
      screen.destroy();
      main.startGame('host', socket);
    }, 1500);

    socket.on('error', (err) => {
      console.log(err);
    });

    socket.on('data', (data) => {
      try {
        module.exports.HostData.obj = JSON.parse(data.toString());
      } catch(err){
        module.exports.CatchEmitter.emit('serverErr', data);
      }

      module.exports.HostEmitter.emit('p2Position');
    });


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

module.exports.CatchEmitter = new EventEmitter();
module.exports.HostData = {};
module.exports.HostEmitter = new EventEmitter();
module.exports.multiServer = multiServer;
// It becomes a method for 'server'??
