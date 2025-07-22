import { useState, useEffect } from 'react';
import { IEmployee } from '@/types/IEmployee';
import { Button } from '@/components/ui/button';
import { getProfils } from '@/services/profil.api';

interface IAddEmployeeProps {
	onOpenChange: (open: boolean) => void;
	onSubmit: (employee: IEmployee) => void;
	initialData?: IEmployee;
}

const AddEmployee = ({ onOpenChange, onSubmit, initialData }: IAddEmployeeProps) => {
	const [nom, setNom] = useState('');
	const [prenoms, setPrenoms] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [contact, setContact] = useState('');
	const [fonction, setFonction] = useState('');
	const [profil, setProfil] = useState('');
	const [dateNaissance, setDateNaissance] = useState('');
	const [sexe, setSexe] = useState('');
	const [statuts, setStatut] = useState('');
	const [avatar, setAvatar] = useState('');
	const [lieu_residence, setLieu_residence] = useState('');

  // Ajout pour la liste des profils
  const [profils, setProfils] = useState<any[]>([]);
  useEffect(() => {
    getProfils().then(setProfils);
  }, []);

	useEffect(() => {
		if (initialData) {
			setNom(initialData.nom || '');
			setPrenoms(initialData.prenoms || '');
			setEmail(initialData.email || '');
			setContact(initialData.contact || '');
			setFonction(initialData.fonction || '');
			setProfil(initialData.profil || '');
			setDateNaissance(initialData.dateNaissance || '');
			setSexe(initialData.sexe || '');
			setStatut(initialData.statuts || '');
			setPassword('');
		}
	}, [initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const utilisateur = {
			nom,
			prenoms,
			email,
			password,
			avatar,
			statuts,
			contact,
			fonction,
			profil: profil, // string id
			date_naissance: dateNaissance,
			lieu_residence,
			sexe
		};
		onSubmit(utilisateur as any);
		onOpenChange(false);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label>Nom</label>
				<input type="text" value={nom} onChange={e => setNom(e.target.value)} className="w-full border p-2" required />
			</div>
			<div>
				<label>Prénoms</label>
				<input type="text" value={prenoms} onChange={e => setPrenoms(e.target.value)} className="w-full border p-2" required />
			</div>
			<div>
				<label>Email</label>
				<input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2" required />
			</div>
			<div>
				<label>Mot de passe</label>
				<input
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					className="w-full border p-2"
					placeholder={initialData ? "Laisser vide pour ne pas changer" : ""}
					required={!initialData}
				/>
			</div>
			<div>
				<label>Contact</label>
				<input type="text" value={contact} onChange={e => setContact(e.target.value)} className="w-full border p-2" />
			</div>
			<div>
				<label>Fonction</label>
				<input type="text" value={fonction} onChange={e => setFonction(e.target.value)} className="w-full border p-2" />
			</div>
			<div>
				<label>Profil</label>
				<select value={profil} onChange={e=>setProfil(e.target.value)} className="w-full border p-2">
					<option value="">Sélectionner</option>
            {profils.map((p, idx) => (
              <option key={p.id_profil || idx} value={String(p.id_profil)}>{p.nom_profil}</option>
            ))}
				</select>
			</div>
			<div>
				<label>Avatar</label>
				<input
					type="text"
					value={avatar}
					onChange={e => setAvatar(e.target.value)}
					className="w-full border p-2"
					placeholder="URL ou nom du fichier"
				/>
			</div>
			<div>
				<label>Lieu de résidence</label>
				<input
					type="text"
					value={lieu_residence}
					onChange={e => setLieu_residence(e.target.value)}
					className="w-full border p-2"
				/>
			</div>
			<div>
				<label>Date de naissance</label>
				<input type="date" value={dateNaissance} onChange={e => setDateNaissance(e.target.value)} className="w-full border p-2" name="date_naissance" />
			</div>
			<div>
				<label>Sexe</label>
				<select value={sexe} onChange={e => setSexe(e.target.value)} className="w-full border p-2">
					<option value="">Sélectionner</option>
					<option value="M">Masculin</option>
					<option value="F">Féminin</option>

				</select>
			</div>
			<div className='w-full sm:w-auto'>
				<label>Statut</label>
				<select value={statuts} onChange={e => setStatut(e.target.value) } className="w-full border p-2">
					<option value={"actif"}>Actif</option>
					<option value={"Inactif"}>Inactif</option>
				</select>
			</div>
			<div className="flex justify-end gap-2">
				<button type="button" onClick={() => onOpenChange(false)} className="btn btn-secondary">
					Annuler
				</button>
				<Button variant="default" type="submit" className="primary" >
					{initialData ? 'Modifier' : 'Ajouter'}
				</Button>
			</div>
		</form>
	);
};

export default AddEmployee;
