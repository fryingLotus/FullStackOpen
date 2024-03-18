import React, { useState } from 'react';
import axios from 'axios';

const DeletePerson = ({ personId }) => {
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/persons/${personId}`)
      .then(response => {
        setDeleteStatus('Person deleted successfully');
        // You may want to perform additional actions upon successful deletion
      })
      .catch(error => {
        setDeleteStatus('Error deleting person');
        console.error('Error deleting person:', error);
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Person</button>
      {deleteStatus && <p>{deleteStatus}</p>}
    </div>
  );
};

export default DeletePerson;
