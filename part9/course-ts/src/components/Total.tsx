import { CoursePart } from "../types";
interface TotalProps {
    parts: CoursePart[];
  }


export const Total = ({parts}: TotalProps) => 
{
    const totalExercises = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return(
        <>
            <p>Total exercise: {totalExercises}</p>
        </>
    );
   
}