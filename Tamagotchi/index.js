const manager = require('./manager.js');
const input = require('./input.js');
const printer = require('./printer.js');

const defaultName = "default_name";

let name = defaultName;
process.argv.forEach((val, index) => {
    if(index ===2){
        name = val.split("=");
        name = name[1];
    }
});
let game = new manager.Game(name+".json");
process.stdin.setEncoding('utf8');
const stdin = process.openStdin();
printer._printGameInstructions(input);
printer.printTamagotchiWink();
stdin.on('data', function(data) {
    let key = data.toString().trim().toUpperCase();
    input.keyboardInput(key,game);
});
