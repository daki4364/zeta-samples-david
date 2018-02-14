const manager = require('./manager.js');

const INPUT_FEED = "H";
const INPUT_DRINK = "D";
const INPUT_CLEAN = "S";
const INPUT_HEAL = "G";
const INPUT_SAVE = "O";
const INPUT_PAUSE = "P";
const INPUT_RESUME = "R";
const INPUT_END= "E";

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
});

let game = new manager.Game("davy.json");
process.stdin.setEncoding('utf8');
const stdin = process.openStdin();
stdin.on('data', function(data) {
    let input = data.toString().trim().toUpperCase();
    if(input===INPUT_END){
        game._stopGame();
        stdin.removeAllListeners('data');

    }
    if(game.gameState==="run"){
        if(input===INPUT_FEED){

        }
        else if(input===INPUT_DRINK){

        }
        else if(input===INPUT_CLEAN){

        }
        else if(input===INPUT_HEAL){

        }
        else if(input===INPUT_PAUSE){
            game._pauseGame();
        }
    }
    else if(game.gameState==="pause"){
        if(input===INPUT_RESUME){
            game._startGame();
        }
        else if(input===INPUT_SAVE){
            game._saveGame();
        }
    }

});
