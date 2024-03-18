"use strict";
var parseArguments = function (args) {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    if (args.length > 4)
        throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};
var multiplicator = function (a, b, printText) {
    console.log(printText, a * b);
};
try {
    var _a = parseArguments(process.argv), value1 = _a.value1, value2 = _a.value2;
    multiplicator(value1, value2, "Multiplied ".concat(value1, " and ").concat(value2, ", the result is:"));
}
catch (error) {
    var errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
