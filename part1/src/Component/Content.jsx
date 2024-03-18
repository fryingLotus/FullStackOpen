import React from 'react';
const Content = ({ parts }) => {
  return (
    <div>
      <p>
        Name: {parts[0].name} - Exercise: {parts[0].exercises}
      </p>
      <p>
        Name: {parts[1].name} - Exercise: {parts[1].exercises}
      </p>
      <p>
        Name: {parts[2].name} - Exercise: {parts[2].exercises}
      </p>
    </div>
  );
};
export default Content;
