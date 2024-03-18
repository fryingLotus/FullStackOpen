
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../../utils/utils';


const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = patientService.getNonSsnPatient();
  res.json(diagnoses);
});

router.post('/', (req, res)=> {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatients(newPatientEntry);
        res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
  }
 
});


export default router;
