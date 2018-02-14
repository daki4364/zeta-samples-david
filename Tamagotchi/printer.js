function _printGameState(game){
    console.log(`${_getCurrentTime()}${game.dino.name}: Hunger(${game.dino.hunger}%) | Durst(${game.dino.durst}%) | Sauberkeit(${game.dino.sauberkeit}%) | Gesundheit(${game.dino.gesundheit}%)`);
}
function _getGameState(game){
    return `${_getCurrentTime()}${game.dino.name}: Hunger(${game.dino.hunger}%) | Durst(${game.dino.durst}%) | Sauberkeit(${game.dino.sauberkeit}%) | Gesundheit(${game.dino.gesundheit}%)`;
}
function _getCurrentTime(){
    let currentDate = new Date();
    return `${currentDate.getDay()}.${currentDate.getMonth()} - ${currentDate.getHours()}:${currentDate.getSeconds()} - `;
}
function _getCurrentSeconds(){
    return new Date().getSeconds();
}
function _printGameInstructions(input){
    console.log(`#########INSTRUCTIONS##############
Input ${input.INPUT_FEED} to feed!
Input ${input.INPUT_DRINK} to drink!
Input ${input.INPUT_HEAL} to heal!
Input ${input.INPUT_CLEAN} to clean!
Input ${input.INPUT_PAUSE} to pause the game!
While the game is paused input ${input.INPUT_SAVE} to save the game!
While the game is paused input ${input.INPUT_RESUME} to resume the game!
While the game is paused input ${input.INPUT_AUTO} to toggle the auto save every 20sec!
Anytime input ${input.INPUT_END} to exit the game!
CAUTION: Your game will not be safed!
####################################`);
}
function savePrintedEvents(event){

}
module.exports._printGameState = _printGameState;
module.exports._getCurrentTime = _getCurrentTime;
module.exports._printGameInstructions = _printGameInstructions;
module.exports._getGameState = _getGameState;
module.exports._getCurrentSeconds = _getCurrentSeconds;