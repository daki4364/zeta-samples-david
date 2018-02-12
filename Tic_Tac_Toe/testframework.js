// Methoden Testframework
const assertEquals = (expected, actual) => {
    if(expected!=actual){
        console.error(`Expected ${expected}, but got ${actual} instead!!!`);
    }
};
const runTests = (testClass) => {
    let test = new testClass();
    test.test_initNewGame("Test_Player");
    test.test_getCurrentPlayer("Test_Player");
    test.test_checkGameStatus("open");
    test.test_doPlayerTurn(true,0);
    test._printGameState();
    test.test_getCurrentPlayer("AI_Player");
    test.test_checkGameStatus("open");
    test.test_doKiTurn(true);
    test._printGameState();
};

module.exports.assertEquals = assertEquals;
module.exports.runTests = runTests;