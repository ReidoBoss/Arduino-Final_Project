const WebSocket = require('ws');

const ws = new WebSocket('ws://172.16.30.13/ws'); // ip of the esp32

ws.on('open', function open() {
  console.log('Connected to WebSocket server');
  
  // Send a message to the WebSocket server
  ws.send('Hello from WebSocket client!');
});

ws.on('message', function incoming(message) {
  // Convert the buffer object to a string
  const messageString = message.toString('utf8');
  
  console.log('Received message from server:', messageString);

  // Your code to handle the received message here
});


ws.on('close', function close() {
  console.log('Disconnected from WebSocket server');
});
