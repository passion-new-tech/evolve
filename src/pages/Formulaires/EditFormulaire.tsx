import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormulaireById, updateFormulaire } from '@/services/formulaires.api';
import PageHeader from '@/components/navigation/page-header';
import SurveyCreatorForm from '@/components/formulaires/SurveyCreatorForm';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditFormulaire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getFormulaireById(id)
      .then(setSurvey)
      .catch(() => setError("Erreur lors du chargement du formulaire"))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleSave = async (data: any) => {
    if (!id) return;
    try {
      const surveyJson = data.json || data;
      const name = surveyJson.title?.fr || surveyJson.title || 'Formulaire sans titre';
      await updateFormulaire(id, { name, json: surveyJson });
      toast.success('Le formulaire a été mis à jour');
      navigate('/Formulaires');
    } catch (e) {
      toast.error('Impossible de mettre à jour le formulaire');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <>
      <PageHeader
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Formulaires', href: '/Formulaires' },
          { label: 'Édition', href: `/formulaires/edit/${id}` }
        ]}
        heading={`Édition : ${survey?.name || 'Formulaire'}`}
      >
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate('/Formulaires')}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
      </PageHeader>

      <div className="container mx-auto p-6">
        <SurveyCreatorForm
          initialData={survey}
          surveyId={id}
          onSave={handleSave}
          onBack={() => navigate('/Formulaires')}
        />
      </div>
    </>
  );
} 