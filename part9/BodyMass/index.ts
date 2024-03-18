import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exCalc } from './exCalc';
const app = express();
app.use(express.json);
app.get('/ping', (_req, res) => {
  res.send('pong');
});
app.get('/hello', (req, res) => {
  const name = req.query.name || 'World'; 
  res.json({ message: `Hello, ${name}!` });
});
app.get('/bmi', (req, res) => {
  const heightString = req.query.height as string; // Asserting that height is a string
  const weightString = req.query.weight as string; // Asserting that weight is a string
  
  // Convert height and weight strings to numbers
  const height = Number(heightString);
  const weight = Number(weightString);

  if (isNaN(height) || isNaN(weight)) {
    // Return an error response if height or weight is not a valid number
    res.status(400).json({ error: 'Invalid height or weight provided' });
    return;
  }

  // Calculate BMI status
  const bmiStatus = bmiCalculator(height, weight);

  // Include height, weight, and BMI status in the response
  res.json({ height, weight, bmiStatus });
});

app.post('/exercises', (req, res) => {
   
  const body = req.body;

  const dailyExercises: number[] = body.daily_exercises;

  const target: number = body.target;

  if(!target || !dailyExercises){
      res.status(400).send({ error: 'parameters missing' })
  }

  if(isNaN(target) || dailyExercises.some(isNaN)){
      res.status(400).send({ error: 'malformatted parameters' })
  }

  try{
      const result = exCalc(dailyExercises, target);

      res.send({result}).status(200);
  }catch(error){
      if(error instanceof Error){
         res.status(400).send({ error: error.message })
      }

      res.status(400).send({ error: 'something went wrong' });
  }
      
})


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
});