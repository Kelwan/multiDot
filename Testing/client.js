const net = require('net');
const blessed = require('blessed');

const client = net.createConnection({ port: 3000 }, () => {

  console.log('connected to server');
  client.write('here it comes!');

});

client.on('data', (data) => {
  let obj = JSON.parse(data);
  buildBox(obj);
});

let screen = blessed.screen({});

let box = blessed.box({
  parent: screen,
  content: 'empty',
  top: '50%',
  left: '50%',
  bg: 'red',
  height: 4,
  width: 4
});

function buildBox(obj){

  box.rleft = obj.left;
  box.rtop = obj.top;
  box.setContent(obj.string);

  screen.render();

}

screen.render();






//client.on('data', (data) => {
  //  JSON.parse(data);
//});
