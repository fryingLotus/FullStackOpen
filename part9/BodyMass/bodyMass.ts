interface MassValue {
  value1: number;
  value2: number;
}
import { bmiCalculator } from "./bmiCalculator";

const parseArgument = (args: string[]): MassValue => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}







try {
  const { value1, value2 } = parseArgument(process.argv);
  bmiCalculator(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}