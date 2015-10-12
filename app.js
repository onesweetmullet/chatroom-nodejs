var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var os = require('os');
var process = require('process');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    msg.ipAddress = this.handshake.address;
    msg.datestamp = new Date();
    
    fs.appendFile('history.txt', JSON.stringify(msg) + os.EOL, function(err) {
        
    });
    
    console.log('message: ' + msg.username + " - " + msg.message);
    
    io.emit('chat message', msg);
  });
  
  
  // uncomment below if you want to show previous messages from history.txt when first loading
  // fs.readFile('history.txt', function(err, data) {
  //   
  //   var _data = String.fromCharCode.apply(null, data);
  //   var _lines = _data.split(os.EOL);
  //   
  //   var _historyObject = {};
  //   if (_lines) {
  //     for (var i = 0; i < _lines.length; i++) {
  //       try {
  //         var _msg = JSON.parse(_lines[i]);
  //         _historyObject[i] = _msg;  
  //       } catch (err) {
  //         // do nothing
  //       }
  //               
  //     }
  //   }
  //   
  //   socket.emit('history-onload', _historyObject);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening for connections');
});