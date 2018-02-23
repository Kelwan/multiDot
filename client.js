
const net = require('net');
const blessed = require('blessed');
const main = require('./main.js');
const EventEmitter = require('events');

function multiClient(){

  let screen = blessed.screen({ });

  let clientBox = blessed.box({
    parent: screen,
    top: '50%',
    left: '50%',
    content: 'WAITING FOR HOST...'
  });

  screen.render();

  const client = net.createConnection({ port: 3000 }, () => {
    clientBox.setContent('CONNECTED TO HOST');
    setTimeout(() => {
      main.startGame('client', client);
    }, 1500);
  });

  setTimeout(() => {
    screen.render();
  }, 1500);

  client.on('data', (data) => {
    module.exports.ClientData.obj = JSON.parse(data.toString());
    module.exports.ClientEmitter.emit('p1Position');
  });

  screen.key('q', () => {
    process.exit(0);
  });




}


module.exports.ClientEmitter = new EventEmitter();
module.exports.ClientData = {};
module.exports.multiClient = multiClient;
