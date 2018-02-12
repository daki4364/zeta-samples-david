const testFramework = require('./testframework.js');
const tictactoe = require('./game.js');

class TicTacToeTests extends tictactoe{

    test_initNewGame(player){
        this.initNewGame(player);
    }
    test_doPlayerTurn(expected,index){
        testFramework.assertEquals(expected,this.act(index));
    }
    test_doKiTurn(expected){
        testFramework.assertEquals(expected, this.kiAct());
    }
    test_getCurrentPlayer(expected){
        testFramework.assertEquals(expected, this.currentPlayer);
    }
    test_checkGameStatus(expected){
        testFramework.assertEquals(expected, this.currentState);
    }
    test_printGameState(){
        this._printGameState();
    }
}

testFramework.runTests(TicTacToeTests);