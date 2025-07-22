import { IEmployee } from '@/types/IEmployee';
import axios from 'axios';

const API_URL = 'http://192.168.252.101:8080/utilisateurs';

export const getUtilisateurs = async (): Promise<IEmployee[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addUtilisateur = async (utilisateur: IEmployee): Promise<IEmployee> => {
  const res = await axios.post(API_URL, utilisateur);
  return res.data;
};

export const updateUtilisateur = async (utilisateur: IEmployee): Promise<IEmployee> => {
  const res = await axios.put(`${API_URL}/${utilisateur.id}`, utilisateur);
  return res.data;
};

export const deleteUtilisateur = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
}; 