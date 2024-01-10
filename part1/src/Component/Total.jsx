const Total = ({ parts }) => {
  const result = parts.reduce((sum, obj) => sum + obj['exercises'], 0);

  return (
    <div>
      <p>Result: {result}</p>
    </div>
  );
};

export default Total;
