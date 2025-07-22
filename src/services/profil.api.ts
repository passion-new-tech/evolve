import { IEmployee } from '@/types/IEmployee';
import axios from 'axios';

const API_URL = 'http://192.168.252.101:8080/profils';

export const getProfils = async (): Promise<IEmployee[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addProfils = async (profils: IEmployee): Promise<IEmployee> => {
  const res = await axios.post(API_URL, profils);
  return res.data;
};

export const updateProfils = async (profils: IEmployee): Promise<IEmployee> => {
  const res = await axios.put(`${API_URL}/${profils.id}`, profils);
  return res.data;
};

export const deleteProfils = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
}; 