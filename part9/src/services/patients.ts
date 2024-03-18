import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  try {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
    return data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error; // Handle the error as needed
  }
};

const create = async (object: PatientFormValues) => {
  try {
    const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
    return data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error; // Handle the error as needed
  }
};

export default {
  getAll,
  create
};
