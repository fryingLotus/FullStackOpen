import React from 'react';
import Header from './Header';
import Parts from './Parts';
import Total from './Total';

const Course = ({ courses }) => (
  <div>
    {courses.map((course) => (
      <div key={course.id}>
        <Header course={course} /> 
        <Parts parts={course.parts}  />
        <Total parts={course.parts}/>
      </div>
    ))}
  </div>
);

export default Course;
