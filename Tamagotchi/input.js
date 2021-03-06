const printer = require('./printer.js');
const chalk = require('chalk');

const INPUT_FEED = "H";
const INPUT_DRINK = "D";
const INPUT_CLEAN = "S";
const INPUT_HEAL = "G";
const INPUT_SAVE = "SAVE";
const INPUT_PAUSE = "PAUSE";
const INPUT_RESUME = "RESUME";
const INPUT_START = "START";
const INPUT_END= "EXIT";
const INPUT_AUTO= "AUTO";

function keyboardInput(key,game){
    if(key===INPUT_END){
        game._stopGame();
    }
    if(game.gameState==="run"){
        if(key===INPUT_FEED){
            game.dino._feed();
            console.log(chalk.blue(`${printer._getCurrentTime()}Spieler füttert ${game.dino.name}`));
            game.saveEvent(`${printer._getCurrentTime()}Spieler füttert ${game.dino.name}`);
            printer._printGameState(game);
            game.saveEvent(printer._getGameState(game));
        }
        else if(key===INPUT_DRINK){
            game.dino._drink();
            console.log(chalk.blue(`${printer._getCurrentTime()}Spieler tränkt ${game.dino.name}`));
            game.saveEvent(`${printer._getCurrentTime()}Spieler tränkt ${game.dino.name}`);
            printer._printGameState(game);
            game.saveEvent(printer._getGameState(game));
        }
        else if(key===INPUT_CLEAN){
            game.dino._clean();
            console.log(chalk.blue(`${printer._getCurrentTime()}Spieler putzt ${game.dino.name}`));
            game.saveEvent(`${printer._getCurrentTime()}Spieler putzt ${game.dino.name}`);
            printer._printGameState(game);
            game.saveEvent(printer._getGameState(game));
        }
        else if(key===INPUT_HEAL){
            game.dino._heal();
            console.log(chalk.blue(`${printer._getCurrentTime()}Spieler heilt ${game.dino.name}`));
            game.saveEvent(`${printer._getCurrentTime()}Spieler heilt ${game.dino.name}`);
            printer._printGameState(game);
            game.saveEvent(printer._getGameState(game));
        }
        else if(key===INPUT_PAUSE){
            game._pauseGame();
        }
    }
    else if(game.gameState==="pause"){
        if(key===INPUT_RESUME){
            game._startGame();
        }
        else if(key===INPUT_SAVE){
            game.saveGame()
                .then((data)=>console.log(printer._getCurrentTime()+chalk.yellowBright("Saved game")))
                .catch((err)=>{throw err;});
        }
        else if(key===INPUT_AUTO){
            game.autoSave = !game.autoSave;
            console.log(printer._getCurrentTime()+chalk.yellowBright("Auto save set to: "+game.autoSave));
        }
    }
    else if(game.gameState==="stop")
    {
        if(key===INPUT_START){
            if(game.dino.events.length !== 0){
                console.log(...game.dino.events);
            }
            game._startGame();
        }
    }
}

module.exports.keyboardInput = keyboardInput;
module.exports.INPUT_FEED = INPUT_FEED;
module.exports.INPUT_DRINK = INPUT_DRINK;
module.exports.INPUT_CLEAN = INPUT_CLEAN;
module.exports.INPUT_HEAL = INPUT_HEAL;
module.exports.INPUT_SAVE = INPUT_SAVE;
module.exports.INPUT_PAUSE = INPUT_PAUSE;
module.exports.INPUT_RESUME = INPUT_RESUME;
module.exports.INPUT_END = INPUT_END;
module.exports.INPUT_START = INPUT_START;
module.exports.INPUT_AUTO = INPUT_AUTO;