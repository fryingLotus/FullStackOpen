"use strict";
var parseArgumentss = function (args) {
    if (args.length !== 11)
        throw new Error('Expected 7 arguments');
    var values = args.slice(2).map(function (arg) { return parseInt(arg); });
    if (values.some(isNaN)) {
        throw new Error('Provided values were not numbers!');
    }
    return values;
};
var exerciseCalculator = function (hours, target) {
    var periodLength = hours.length;
    var filteredHours = hours.filter(function (hour) { return hour != 0; });
    var trainingDays = filteredHours.length;
    var average = filteredHours.reduce(function (acc, cur) { return acc + cur; }, 0) / filteredHours.length;
    var ratingDescription = "";
    var success = false;
    var rating;
    var percentage = (average / target) * 100;
    if (percentage < 70) {
        rating = 1;
    }
    else if (percentage >= 70 && percentage <= 100) {
        rating = 2;
    }
    else {
        rating = 3;
    }
    if (average == target) {
        ratingDescription = "You met your goal!";
        success = true;
    }
    else if (average >= target) {
        ratingDescription = "You passed your goal!";
        success = true;
    }
    else {
        ratingDescription = "Are you even trying bruh?";
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
};
try {
    var hours = parseArgumentss(process.argv);
    console.log(exerciseCalculator(hours, 2));
}
catch (error) {
    var errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
