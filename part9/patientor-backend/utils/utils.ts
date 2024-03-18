import { Gender, NewPatientEntry } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).includes(param as Gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};

const isSSN = (ssn: unknown): ssn is string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return true;
};

const parseSsn = (ssn: unknown): string => {
    if (!isSSN(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const isOccupation = (occupation: unknown): occupation is string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return true;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isOccupation(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('ssn' in object && 'dateOfBirth' in object && 'name' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            ssn: parseSsn(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
            name: parseName(object.name),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: a field missing');
};

export default toNewPatientEntry;