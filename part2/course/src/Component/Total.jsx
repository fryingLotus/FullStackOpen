

const Total = ({parts}) => {
    const total = parts.reduce((acc, totalExercise) => acc + totalExercise.exercises, 0);
    console.log(total);
    return (
        <div>
            <p><b>Total of {total} exercises</b></p>
        </div>
    );
}

export default Total;

