import React from "react";
import Person from './Person';

const Persons = ({ filteredUsers,deleteContactOf }) => {
  const handleButtonClick = (buttonNumber) => {
    console.log(`Button ${buttonNumber} clicked`);
  }
  return (
    <div>

      <ul>
        {filteredUsers.map((person,index) => (
          <Person key={person.id} person={person} buttonNumber={index + 1} handleButtonClick={handleButtonClick} deleteContactOf={deleteContactOf} />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
