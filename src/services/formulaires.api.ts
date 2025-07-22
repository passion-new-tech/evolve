import axios from 'axios';

//const API_URL = 'http://localhost:3010/api/formulaires'; //
const API_URL='https://dtsmtnvjfgemohtvrdad.supabase.co/rest/v1/formulaires'
//Ajout pour l'API Supabase
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0c210bnZqZmdlbW9odHZyZGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Mjg3NzUsImV4cCI6MjA2NDIwNDc3NX0.5RyBAGgBhDgrU0V2NHVpRAR8n-LtUGPmZGiCQ5itM80';

const axiosConfig = {
  headers: {
    apikey: API_KEY,
  },
};

export async function getFormulaires() {
  const res = await axios.get(API_URL, axiosConfig);
  return res.data;
}

export async function getFormulaireById(id: string) {
  const res = await axios.get(`${API_URL}?id=eq.${id}`, axiosConfig);
  return Array.isArray(res.data) ? res.data[0] : res.data;
}

export async function createFormulaire(data: any) {
  const res = await axios.post(API_URL, data, axiosConfig);
  return res.data;
}

export async function updateFormulaire(id: string, data: any) {
  const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, axiosConfig);
  return res.data;
}

export async function deleteFormulaire(id: string) {
  await axios.delete(`${API_URL}?id=eq.${id}`, axiosConfig);
}

export async function getReponsesFormulaire(formulaire_id: string) {
  const API_URL_REP = 'https://dtsmtnvjfgemohtvrdad.supabase.co/rest/v1/reponses_formulaire';
  const res = await axios.get(`${API_URL_REP}?formulaire_id=eq.${formulaire_id}`, axiosConfig);
  return res.data;
}

export async function saveReponseFormulaire(formulaire_id: string, reponses: any) {
  const API_URL_REP = 'https://dtsmtnvjfgemohtvrdad.supabase.co/rest/v1/reponses_formulaire';
  const body = {
    formulaire_id,
    reponses

  };
  const res = await axios.post(API_URL_REP, body, axiosConfig);
  return res.data;
}

export async function getReponseById(id: string) {
  const API_URL_REP = 'https://dtsmtnvjfgemohtvrdad.supabase.co/rest/v1/reponses_formulaire';
  const res = await axios.get(`${API_URL_REP}?id=eq.${id}`, axiosConfig);
  return Array.isArray(res.data) ? res.data[0] : res.data;
}
