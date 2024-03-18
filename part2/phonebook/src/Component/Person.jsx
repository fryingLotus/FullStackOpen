import React from "react";
import "./Person.css";

const Person = ({ person, deleteContactOf }) => {
  const handleDelete = () => {
    deleteContactOf(person);
  };

  return (
    <div>
      <div className="grid-contact">
        <p>{person.name}</p>
        <p>{person.number}</p>
        <button onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Person;
