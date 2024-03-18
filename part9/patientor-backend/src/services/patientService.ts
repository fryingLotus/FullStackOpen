import allPatients from "../../data/patients";
import { NonSsnPatient, Patient, NewPatientEntry } from "../../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = allPatients;

const getPatient = (): Patient[] => {
  return patients;
};

const getNonSsnPatient = (): NonSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = (entry: NewPatientEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const id: string  = uuid(); // Explicitly type id as string
  const newPatients: Patient = {
    id,
    ...entry,
  };
  patients.push(newPatients);
  return newPatients;
};

export default {
  getPatient,
  getNonSsnPatient,
  addPatients
};
