"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bmiCalculator_1 = require("./bmiCalculator");
var exCalc_1 = require("./exCalc");
var app = (0, express_1.default)();
app.use(express_1.default.json);
app.get('/ping', function (_req, res) {
    res.send('pong');
});
app.get('/hello', function (req, res) {
    var name = req.query.name || 'World';
    res.json({ message: "Hello, ".concat(name, "!") });
});
app.get('/bmi', function (req, res) {
    var heightString = req.query.height; // Asserting that height is a string
    var weightString = req.query.weight; // Asserting that weight is a string
    // Convert height and weight strings to numbers
    var height = Number(heightString);
    var weight = Number(weightString);
    if (isNaN(height) || isNaN(weight)) {
        // Return an error response if height or weight is not a valid number
        res.status(400).json({ error: 'Invalid height or weight provided' });
        return;
    }
    // Calculate BMI status
    var bmiStatus = (0, bmiCalculator_1.bmiCalculator)(height, weight);
    // Include height, weight, and BMI status in the response
    res.json({ height: height, weight: weight, bmiStatus: bmiStatus });
});
app.post('/exercises', function (req, res) {
    var body = req.body;
    var dailyExercises = body.daily_exercises;
    var target = body.target;
    if (!target || !dailyExercises) {
        res.status(400).send({ error: 'parameters missing' });
    }
    if (isNaN(target) || dailyExercises.some(isNaN)) {
        res.status(400).send({ error: 'malformatted parameters' });
    }
    try {
        var result = (0, exCalc_1.exCalc)(dailyExercises, target);
        res.send({ result: result }).status(200);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        }
        res.status(400).send({ error: 'something went wrong' });
    }
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server is now running on http://localhost:".concat(PORT));
});
