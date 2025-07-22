import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReponsesFormulaire, getFormulaireById } from '@/services/formulaires.api';
import PageHeader from '@/components/navigation/page-header';
import { exportToCSV, exportToPDF } from '@/lib/exportUtils';
import toast from 'react-hot-toast';

const ListeReponsesFormulaire = () => {
  const { id } = useParams(); // id = id du formulaire
  const navigate = useNavigate();
  const [reponses, setReponses] = useState<any[]>([]);
  const [formName, setFormName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formJson, setFormJson] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      getReponsesFormulaire(id),
      getFormulaireById(id)
    ])
      .then(([data, form]) => {
        setReponses(data || []);
        setFormName(form?.name || '');
        setFormJson(form?.json || null);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des réponses');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Chargement des réponses...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  // Fonction utilitaire pour formater les dates en 'Jour/Mois/Année HH:MM:SS' quoi
  function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  return (
    <>
      <PageHeader
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Formulaires', href: '/Formulaires' },
          { label: formName || 'Réponses', href: `/formulaires/${id}/reponses` }
        ]}
        heading={`Réponses au formulaire${formName ? ` : ${formName}` : ''}`}
      />
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-2 mb-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              if (reponses.length === 0) return toast.error('Aucune réponse à exporter');
              if (!formJson) return toast.error('Structure du formulaire introuvable');
              // Colonnes : date + titres lisibles
              const columns = [
                { key: 'soumis_le', label: 'Horodateur' },
                ...((formJson.pages || []).flatMap((page: any) =>
                  (page.elements || []).map((q: any) => ({
                    key: q.name,
                    label: q.title?.fr || q.title || q.name
                  }))
                ))
              ];
              // Mapping des réponses
              const data = reponses.map(rep => {
                const row: any = { soumis_le: rep.soumis_le || rep.created_at };
                columns.slice(1).forEach(col => {
                  row[col.key] = rep.reponses?.[col.key] ?? '';
                });
                return row;
              });
              exportToCSV(`reponses_formulaire_${id}.csv`, data, columns);
            }}
          >
            Export CSV
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              if (reponses.length === 0) return toast.error('Aucune réponse à exporter');
              if (!formJson) return toast.error('Structure du formulaire introuvable');
              const columns = [
                { key: 'soumis_le', label: 'Horodateur' },
                ...((formJson.pages || []).flatMap((page: any) =>
                  (page.elements || []).map((q: any) => ({
                    key: q.name,
                    label: q.title?.fr || q.title || q.name
                  }))
                ))
              ];
              const data = reponses.map(rep => {
                const row: any = { soumis_le: rep.soumis_le || rep.created_at };
                columns.slice(1).forEach(col => {
                  row[col.key] = rep.reponses?.[col.key] ?? '';
                });
                return row;
              });
              exportToPDF(`reponses_formulaire_${id}.pdf`, data, columns);
            }}
          >
            Export PDF
          </button>
        </div>
        <button className="btn btn-secondary mb-4" onClick={() => navigate('/Formulaires')}>Retour à la liste</button>
        {reponses.length === 0 ? (
          <div className="text-center text-muted-foreground">Aucune réponse pour ce formulaire.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="border px-2 py-1">N°</th>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reponses.map((rep, idx) => (
                  <tr key={rep.id}>
                    <td className="border px-2 py-1">{idx + 1}</td>
                    <td className="border px-2 py-1">{formatDate(rep.soumis_le || rep.created_at)}</td>
                    <td className="border px-2 py-1">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/formulaires/reponses/${rep.id}`)}>
                        Voir la réponse
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ListeReponsesFormulaire;