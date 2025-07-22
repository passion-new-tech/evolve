import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '@/components/navigation/page-header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfileSidebar from '@/components/profile/profile-sidebar';
import ProfileActivity from '@/components/profile/profile-activity';
import ProfileSettings from '@/components/profile/profile-settings';
import { IEmployee } from '@/types/IEmployee';
import { getUtilisateurs } from '@/services/utilisateur.api';
import { getProfils } from '@/services/profil.api';

const DetailUtilisateur = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IEmployee | null>(null);
  const [tab, setTab] = useState('activity');
  const [profilNom, setProfilNom] = useState<string>('');
  const [profils, setProfils] = useState<any[]>([]);

  useEffect(() => {
    getUtilisateurs().then(users => {
      const found = users.find(u => String(u.id_utilisateur) === String(id) || String(u.id) === String(id));
      setUser(found || null);
    });
    getProfils().then(setProfils);
  }, [id]);

  useEffect(() => {
    if (user && profils.length > 0) {
      const profil = profils.find(p => String(p.id_profil) === String(user.profil));
      setProfilNom(profil ? profil.nom_profil : 'Profil inconnu');
    }
  }, [user, profils]);

  if (!user) {
    return <div className="p-8">Utilisateur introuvable</div>;
  }

  // Données factices pour activity/timeline/settings si besoin
  const activityFeed: any[] = [];


  return (
    <div className="relative flex min-h-screen">
      <div className="flex-1">
      <PageHeader
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Utilisateurs', href: '/Utilisateurs' },
          { label: user.nom, href: `/Utilisateurs/${user.id_utilisateur || user.id}` }
        ]}
        heading={`Profil de ${user.nom} ${user.prenoms}`}
      />
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <ProfileSidebar user={{
          name: user.nom + ' ' + user.prenoms,
          title: profilNom,
          avatar: user.avatar || '',
          friends: 0,
          education: '',
          location: user.lieu_residence || '',
          skills: '',
          notes: user.email
        }} />
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Informations détaillées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Nom :</strong> {user.nom}</div>
              <div><strong>Prénoms :</strong> {user.prenoms}</div>
              <div><strong>Email :</strong> {user.email}</div>
              <div><strong>Contact :</strong> {user.contact}</div>
              <div><strong>Fonction :</strong> {user.fonction}</div>
              <div><strong>Sexe :</strong> {user.sexe}</div>
              <div><strong>Statut :</strong> {user.statuts}</div>
              <div><strong>Date de naissance :</strong> {user.dateNaissance}</div>
              <div><strong>Lieu de résidence :</strong> {user.lieu_residence}</div>
              <div><strong>Profil :</strong> {profilNom}</div>
            </div>
          </div>
          <Tabs value={tab} onValueChange={setTab} className="mt-4">
            <TabsList className="mb-4 flex gap-2 bg-muted p-1 rounded-lg w-fit">
              <TabsTrigger value="activity" className={tab === 'activity' ? '!bg-primary text-white shadow' : 'text-muted-foreground'}>
                Historique de l'utilisateur
              </TabsTrigger>
              <TabsTrigger value="settings" className={tab === 'settings' ? '!bg-primary text-white shadow' : 'text-muted-foreground'}>
                Modifier
              </TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <ProfileActivity activityFeed={activityFeed} />
            </TabsContent>
            <TabsContent value="settings">
              <ProfileSettings user={{
                name: user.nom + ' ' + user.prenoms,
                title: user.fonction,
                avatar: user.avatar || '',
                friends: 0,
                education: '',
                location: user.lieu_residence || '',
                skills: '',
                  notes: user.email,
                  followers: 0,
                  following: 0
              }} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DetailUtilisateur; 