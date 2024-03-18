"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bmiCalculator_1 = require("./bmiCalculator");
var parseArgument = function (args) {
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
try {
    var _a = parseArgument(process.argv), value1 = _a.value1, value2 = _a.value2;
    (0, bmiCalculator_1.bmiCalculator)(value1, value2);
}
catch (error) {
    var errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
