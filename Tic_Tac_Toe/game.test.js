const testFramework = require('./testframework.js');
const tictactoe = require('./game.js');

class TicTacToeTests extends tictactoe.Game{

    setup(){
        this.initNewGame("Test_Player");
    }

    test_currentPlayer(){
        testFramework.assertEquals("Test_Player", this.currentPlayer);
    }

    test_currentState(){
        testFramework.assertEquals("open", this.currentState);
    }

    test_playerValidTurn(){
        testFramework.assertEquals(true, this.act(0));
    }

    test_kiTurn(){
        testFramework.assertEquals(true, this.kiAct());
    }

    test_playerInvalidTurn(){
        testFramework.assertEquals(false, this.act(0));
    }

    test_drawGame(){
        testFramework.assertEquals(true, this.act(1));
        testFramework.assertEquals(true, this.kiAct());
        testFramework.assertEquals(true, this.act(6));
        testFramework.assertEquals(true, this.kiAct());
        testFramework.assertEquals(true, this.act(5));
        testFramework.assertEquals(true, this.kiAct());
        testFramework.assertEquals(true, this.act(8));
        testFramework.assertEquals(false, this.kiAct());
        testFramework.assertEquals("draw", this.currentState);
        this._printGameState();
    }

    test_kiWonGame(){
        this.initNewGame("Test_Player");
        testFramework.assertEquals(true, this.act(0));
        testFramework.assertEquals(true, this.kiAct());
        testFramework.assertEquals(true, this.act(1));
        testFramework.assertEquals(true, this.kiAct());
        testFramework.assertEquals(true, this.act(3));
        testFramework.assertEquals(true, this.kiAct());
        testFramework.assertEquals(false, this.act(8));
        testFramework.assertEquals("player2won", this.currentState);
        this._printGameState();
    }
}

testFramework.runTests(TicTacToeTests);