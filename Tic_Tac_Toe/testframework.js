// Methoden Testframework

let failedTests = [];
let passedTests = [];

const assertEquals = (expected, actual) => {
    if(expected!=actual){
        failedTests.push(new Error(`\n  Failed Test Nr.${failedTests.length+1}: Expected ${expected}, but got ${actual} instead!!!`));
    }
    else{
        passedTests.push(`\n    Passed Test Nr.${passedTests.length+1}: Expected ${expected} and got ${actual}!!!`);
    }
};
const runTests = (testClass) => {
    let test = new testClass();
    let methods= Object.getOwnPropertyNames(testClass.prototype);
    let before = methods.filter(func => func==="setup" );
    test[before].call(test);
    for(let func of methods){
        if(func.startsWith("test")){
            test[func].call(test);
        }
    }
    console.info(`##############TEST-RESULTS################\nExecuted ${failedTests.length+passedTests.length} Tests:`)
    console.info(`Failed ${failedTests.length} Tests: ${failedTests}`);
    console.info(`Passed ${passedTests.length} Tests: ${passedTests}`);
};
module.exports.assertEquals = assertEquals;
module.exports.runTests = runTests;