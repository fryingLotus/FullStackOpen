export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'

}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  ssn:string;
  occupation: string;
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}
export type NonSsnPatient = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;