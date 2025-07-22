import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormulaireById, saveReponseFormulaire } from '@/services/formulaires.api';
import { Survey } from 'survey-react-ui';
//import 'survey-core/modern.min.css';
import { Model } from 'survey-core';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const PublicFormulaire = () => {
  const { id } = useParams();
  const [surveyJson, setSurveyJson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getFormulaireById(id)
      .then((form) => {
        setSurveyJson(form?.json || null);
        setLoading(false);
      })
      .catch(() => {
        setError('Formulaire introuvable');
        setLoading(false);
      });
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success('Lien copié dans le presse-papier');
    });
  };

  if (loading) return <div className="p-8 text-center">Chargement du formulaire...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!surveyJson) return <div className="p-8 text-center">Aucun formulaire à afficher.</div>;

  const survey = new Model(surveyJson);

  survey.onComplete.add(async (sender) => {
    if (!id) return;
    try {
      await saveReponseFormulaire(id, sender.data); // id = formulaire_id, sender.data = reponses
      toast.success('Votre réponse a bien été enregistrée.');
    } catch (e) {
      toast.error('Erreur lors de l\'enregistrement de la réponse.');
    }
  });

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={handleCopyLink}>
          Copier le lien de ce formulaire
        </Button>
      </div>
      <Survey model={survey} />
    </div>
  );
};

export default PublicFormulaire; 