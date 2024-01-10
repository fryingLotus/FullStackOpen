import React from "react";

const PersonForm = ({ newName, handleNameChange, handlePhoneChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      Name: <input value={newName.name} onChange={handleNameChange} /> <br />
      Phone: <input value={newName.number} onChange={handlePhoneChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default PersonForm;
