// Methoden Testframework
const assertEquals = (expected, actual) => {
    if(expected!=actual){
        console.error(`Expected ${expected}, but got ${actual} instead!!!`);
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
};
module.exports.assertEquals = assertEquals;
module.exports.runTests = runTests;