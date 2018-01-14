
const net = require('net');

const server = net.createServer((socket) => {
  console.log('client connected');

  socket.on('error', (err) => {
    console.log(err);
  });

  socket.on('data', (data) => {
    console.log(data.toString());
  });

  socket.write("Hey Myself!");
});

server.on('error', (err) => {
  console.log(err);
});

server.listen(3000, () => {
  console.log(server.address());
});
