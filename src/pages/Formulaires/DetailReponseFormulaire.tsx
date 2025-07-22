import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReponseById, getFormulaireById, getReponsesFormulaire } from '@/services/formulaires.api';
import PageHeader from '@/components/navigation/page-header';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default function DetailReponseFormulaire() {
  const { id } = useParams(); // id = id de la réponse
  const navigate = useNavigate();
  const [reponse, setReponse] = useState<any>(null);
  const [formName, setFormName] = useState<string>('');
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formJson, setFormJson] = useState<any>(null);
  const [allReps, setAllReps] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getReponseById(id)
      .then(async (data) => {
        setReponse(data);
        // Récupérer le nom et le JSON du formulaire associé
        if (data?.formulaire_id) {
          const form = await getFormulaireById(data.formulaire_id);
          setFormName(form?.name || '');
          setFormJson(form?.json || null);
          // Récupérer toutes les réponses pour ce formulaire
          const allReps = await getReponsesFormulaire(data.formulaire_id);
          setAllReps(allReps);
          // Trouver la position de la réponse courante
          const idx = allReps.findIndex((r: any) => r.id === data.id);
          setOrderNumber(idx >= 0 ? idx + 1 : null);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement de la réponse');
        setLoading(false);
      });
  }, [id]);

  // Fonction utilitaire pour retrouver le titre d'une question à partir du JSON du formulaire
  function getQuestionTitle(key: string): string {
    if (!formJson) return key;
    // Parcours toutes les pages et questions
    for (const page of formJson.pages || []) {
      for (const q of page.elements || []) {
        if (q.name === key) {
          // Gestion multilingue ou simple
          return q.title?.fr || q.title || key;
        }
      }
    }
    return key;
  }

  // Fonction utilitaire pour retrouver le texte d'un choix (radio, select, etc.)
  function getChoiceLabel(key: string, value: any): string {
    if (!formJson) return String(value);
    for (const page of formJson.pages || []) {
      for (const q of page.elements || []) {
        if (q.name === key && Array.isArray(q.choices)) {
          const found = q.choices.find((c: any) => c.value === value);
          if (found) {
            return found.text?.fr || found.text || String(value);
          }
        }
      }
    }
    return String(value);
  }

  // Fonction utilitaire pour formater les dates en 'Jour/Mois/Année HH:MM:SS' (français)
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

  if (loading) return <div className="p-8 text-center">Chargement de la réponse...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!reponse) return <div className="p-8 text-center">Aucune réponse trouvée.</div>;

  return (
    <>
      <PageHeader
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Formulaires', href: '/Formulaires' },
          { label: formName || 'Réponse', href: '#' }
        ]}
        heading={`Réponse${orderNumber ? ` n°${orderNumber}` : ''}${formName ? ` — ${formName}` : ''}`}
      >
        <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
      </PageHeader>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-primary">Réponses au formulaire</h3>
        <div className="flex justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            disabled={orderNumber === 1 || !allReps.length}
            onClick={() => {
              if (orderNumber && allReps[orderNumber - 2]) {
                navigate(`/formulaires/reponses/${allReps[orderNumber - 2].id}`);
              }
            }}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={orderNumber === allReps.length || !allReps.length}
            onClick={() => {
              if (orderNumber && allReps[orderNumber]) {
                navigate(`/formulaires/reponses/${allReps[orderNumber].id}`);
              }
            }}
          >
            Suivant
          </Button>
        </div>
        <ul className="divide-y divide-gray-100 bg-gray-50 rounded-lg p-4 mb-4">
          {reponse.reponses && Object.entries(reponse.reponses).length > 0 ? (
            Object.entries(reponse.reponses).map(([key, value]) => (
              <li key={key} className="py-3 flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-medium text-gray-700 w-48 inline-block">{getQuestionTitle(key)} :</span>
                <span className="text-gray-900 break-all">{getChoiceLabel(key, value)}</span>
              </li>
            ))
          ) : (
            <li className="text-muted-foreground py-4 text-center">
              Aucune donnée à afficher.<br />
              <pre className="text-xs bg-gray-100 p-2 rounded mt-2">{JSON.stringify(reponse, null, 2)}</pre>
            </li>
          )}
        </ul>
        <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
          <span className="font-medium">Date de soumission :</span>
          <span className="text-gray-900">{formatDate(reponse.soumis_le || reponse.created_at)}</span>
        </div>
      </div>
    </>
  );
} 