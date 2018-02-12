const net = require('net');
const blessed = require('blessed');


function start(socket){
  let screen = blessed.screen({

  });

  let box = blessed.box({
    parent: screen,
    bg: 'blue',
    content: 'HEY',
    width: 4,
    height: 4,
    top: '50%',
    left: '50%'
  });

  box.moveable = true;
  box.speed = 1;



  screen.render();

  screen.on('keypress', (ch, key) => {

    if(key.name == 'left'){
      if(box.rleft > 0) box.rleft -= box.speed;
      screen.render();
    }



    let Package = {
      top: box.rtop,
      left: box.rleft,
      string: 'hello world'
    };

    socket.write(JSON.stringify(Package));

    screen.render();

  });

}


const server = net.createServer((socket) => {

  

  console.log('client connected');
  start(socket);

});

server.on('data', (data) => {
  console.log(data);
})

server.listen(3000, () => {
  console.log('listening');
});
