import gameToPage from "./gameToPage.js";

export default class Game{

    constructor(tttRootElement){
        this.gameToPage = new gameToPage(tttRootElement);
        this.gameToPage.setupNewGame();
    }

    initNewGame(){
        this.players=["Player1", "Player2"];
        this.gameStates =["open", "player1won", "player2won", "draw"];
        this.winCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [6,4,2]
        ];
        this.field = Array.from(Array(9).keys());
        this.currentPlayer = this.players[0];
        this.currentState = this.gameStates[0];
    }

    act(index){
        if(this.field[index]===this.players[0] || this.field[index]===this.players[1] ||this.currentState !== this.gameStates[0] || index > this.field.length-1){
            console.log(`${this.currentPlayer} cannot tick at ${index} Tick somewhere else!`);
            return false;
        }
        else{
            console.log(`${this.currentPlayer} ticked at ${index}`);
            this.field[index] = this.currentPlayer;
            this._checkWin(this.field, this.currentPlayer);
            this.currentPlayer = this.currentPlayer===this.players[0] ? this.players[1] : this.players[0];
            return true;
        }
    }
    _printGameState(){
        let printField = this.field.map((elem,index)=> elem = typeof elem ==="number" ? "-" : elem )
            .map(elem=> elem = elem === this.players[0] ? "X" : elem )
            .map(elem=> elem = elem === this.players[1] ? "O" : elem );
        let firstRow = printField.slice(0,3);
        let secondRow = printField.slice(3,6);
        let thirdRow = printField.slice(6,9);
        console.log(...firstRow);
        console.log(...secondRow);
        console.log(...thirdRow);
        console.log(`Current game state: ${this.currentState}\n`);
    }
    kiAct(){
        let kiActed = false;
        if(this.currentPlayer ===this.players[1]){
            kiActed = this.act(this._minimax(this.field, this.players[1]).index);
        }
        return kiActed;
    }

    _minimax(newField, player){
        let availSpots = this._emptyField(newField)
        if(this._checkKiWin(newField,this.players[0])){
            return {score: -10}
        }
        else if(this._checkKiWin(newField,this.players[1])){
            return {score: 10}
        }
        else if(availSpots.length ===0){
            return {score: 0}
        }
        let moves = [];
        for(let i = 0; i<availSpots.length;i++){
            let move = {};
            move.index = newField[availSpots[i]];
            newField[availSpots[i]] = player;

            if(player === this.players[1]){
                let result = this._minimax(newField, this.players[0]);
                move.score = result.score;
            }
            else{
                let result = this._minimax(newField, this.players[1]);
                move.score = result.score;
            }
            newField[availSpots[i]] = move.index;
            moves.push(move);
        }
        let bestMove;
        if(player === this.players[1]){
            let bestScore = -10000;
            for(let i =0; i<moves.length;i++){
                if(moves[i].score>bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }else{
            let bestScore = 10000;
            for(let i =0; i<moves.length;i++){
                if(moves[i].score<bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }
    _emptyField(field){
        return field.filter(elem => typeof elem === "number");
    }
    _checkKiWin(field, player){
        let gameWon = false;
        if(field.every(elem => elem===this.players[0] || elem===this.players[1])){}
        else
        {
            let ticks = field.reduce((result,element,index) =>
                (element===player) ? result.concat(index) : result, []);
            for(let [index, win] of this.winCombos.entries()){
                if(win.every(elem => ticks.indexOf(elem) > -1))
                {
                    gameWon = true;
                }
            }
        }
        return gameWon;
    }
    _checkWin(field, player){
        let gameWon = false;

        if(field.every(elem => elem===this.players[0] || elem===this.players[1]))
        {

            this.currentState = this.gameStates[3];
        }
        else
        {

            let ticks = field.reduce((result,element,index) =>
                (element===player) ? result.concat(index) : result, []);
            //console.log(...ticks);
            for(let [index, win] of this.winCombos.entries()){
                if(win.every(elem => ticks.indexOf(elem) > -1))
                {
                    this.currentState = player===this.players[0] ? this.gameStates[1] : this.gameStates[2];
                    gameWon = true;
                }
            }
        }
        //console.log(this.currentState);
        return gameWon;
    }
}