export interface IEmployee {
  id: string;
  id_utilisateur?: number;
  nom: string;
  prenoms: string;
  email: string;
  password:string;
  contact: string;
  fonction: string;
  dateInscription: string;
  derniereConnexion: string;
  profil: string;
  //nom_profil:string;
  dateNaissance: string;
  sexe: string;
  statuts: string;
  avatar?: string;
  lieu_residence?: string;
  name :string;
}
