import React from 'react';
import DeletePerson from './DeletePerson';

const Test = () => {
  // Assuming 'personId' is the ID of the person you want to delete
  const personIdToDelete = 4; 

  return (
    <div>
      <h2>Delete Person</h2>
      <p>{personIdToDelete}</p>
      <DeletePerson personId={personIdToDelete} />
    </div>
  );
};

export default Test;
