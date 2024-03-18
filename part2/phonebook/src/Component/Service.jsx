import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAllPersons = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const createPerson = async (newPerson) => {
  try {
    const response = await axios.post(baseURL, newPerson);
    return response.data;
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
};

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};

const Service = {
  getAllPersons,
  createPerson,
  handleDelete
};

export default Service;
