
const net = require('net');
const blessed = require('blessed');




function multiServer(){

  let screen = blessed.screen({

  });


  let bg = blessed.box({
    parent:screen,
    width: screen.width,
    height: screen.height,
    bg: 'red'
  });

  let host = blessed.box({
    parent: screen,
    top: '50%',
    left: '50%',
    content: 'WAITING FOR CONNECTION...'
  });

  screen.render();

  const server = net.createServer((socket) => {

    socket.on('error', (err) => {
      console.log(err);
    });

    socket.on('data', (data) => {
      console.log(data.toString());
    });

  });

  server.on('error', (err) => {
    console.log(err);
  });

  server.listen(3000, () => {
    console.log(server.address());
  });
}


module.exports.multiServer = multiServer();
