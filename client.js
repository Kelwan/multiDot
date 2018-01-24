
const net = require('net');
const blessed = require('blessed');

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
    //client.write("SUP");
  });


}




module.exports.multiClient = multiClient();
