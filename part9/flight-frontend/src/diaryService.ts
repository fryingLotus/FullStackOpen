import axios from 'axios';
import { Diary, NewDiary } from "./types";

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiary = async () => {
  try {
    const response = await axios
      .get<Diary[]>(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching diaries:', error);
    throw error; // Rethrow the error to handle it at a higher level
  }
}

export const createDiary = async (object: NewDiary) => {
  try {
    const response = await axios
      .post<Diary>(baseUrl, object);
    return response.data;
  } catch (error) {
    console.error('Error creating diary:', error);
    throw error; // Rethrow the error to handle it at a higher level
  }
}
