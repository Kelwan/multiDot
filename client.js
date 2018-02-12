
const net = require('net');
const blessed = require('blessed');
const main = require('./main.js');

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
      main.startGame('client');
    }, 1500);
  });

  setTimeout(() => {
    screen.render();
  }, 1500);

  client.on('data', (data) => {
    ClientData(data);
  });

  screen.key('q', () => {
    process.exit(0);
  });

}

function ClientData(obj) {
  let clientPack = JSON.parse(obj);
  clientPack.length-1;
  this.clientPack = clientPack;
}



module.exports.ClientData = ClientData;
module.exports.multiClient = multiClient;
