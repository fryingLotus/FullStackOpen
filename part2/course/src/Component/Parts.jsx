import React from "react";

const Part = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.id}>
          <p>{part.name} {part.exercises}</p>
        </div>
      ))}
    </div>
  );
};

export default Part;
