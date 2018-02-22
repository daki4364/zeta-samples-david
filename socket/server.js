let express = require('express');
let socket = require('socket.io');

const port = 4000;

let app = express();

let players = [];


let server = app.listen(port,()=>{
    console.log('Server listening to port '+port);
});

app.use(express.static('client'));

let io = socket(server);

io.on('connection',(socket)=>{
    if(players.length < 2){
        players.push(socket);
        console.log('Connected to Server on port '+port + socket.id);
    }
    else{
        socket.disconnect();
        console.log('Denied connection to Server on port '+port + socket.id);
    }
});