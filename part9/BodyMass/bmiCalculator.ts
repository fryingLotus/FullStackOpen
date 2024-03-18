export const bmiCalculator = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2); // Convert height to meters
    
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Healthy";
    } else if (bmi >= 24.9 && bmi < 30) {
        return "Overweight";
    } else {
        return "Suffering from obesity";
    }
};
