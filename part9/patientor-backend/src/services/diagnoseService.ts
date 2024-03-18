import allDiagnoses from '../../data/diagnoses';
import { Diagnose } from '../../types';

const getDiagnose = (): Diagnose[] => {
  return allDiagnoses;
};

export default {
  getDiagnose,
};
