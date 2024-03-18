
const parseArgumentss = (args: string[]): number[] => {
    if (args.length !== 11) throw new Error('Expected 7 arguments'); 
    const values = args.slice(2).map(arg => parseInt(arg));

    if (values.some(isNaN)) {
      throw new Error('Provided values were not numbers!');
    }

    return values;
}
const exerciseCalculator = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const filteredHours = hours.filter((hour) => hour != 0);
  const trainingDays = filteredHours.length;
  const average =
    filteredHours.reduce((acc, cur) => acc + cur, 0) / filteredHours.length;
  let ratingDescription = "";
  let success = false;
  let rating: number;
  const percentage = (average / target) * 100;

  if (percentage < 70) {
    rating = 1;
  } else if (percentage >= 70 && percentage <= 100) {
    rating = 2;
  } else {
    rating = 3;
  }
  if (average == target) {
    ratingDescription = "You met your goal!";
    success = true;
  } else if (average >= target) {
    ratingDescription = `You passed your goal!`;
    success = true;
  } else {
    ratingDescription = "Are you even trying bruh?";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
try {
    const hours = parseArgumentss(process.argv);
    console.log(exerciseCalculator(hours, 2));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

