import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormulaireById, getReponsesFormulaire } from '@/services/formulaires.api';
import PageHeader from '@/components/navigation/page-header';
import SurveyDashboard from '@/components/dashboard/SurveyDashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import SurveyTableView from '@/components/dashboard/SurveyTableView';

export default function DashboardFormulaire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formJson, setFormJson] = useState<any>(null);
  const [formName, setFormName] = useState('');
  const [reponses, setReponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      getFormulaireById(id),
      getReponsesFormulaire(id)
    ])
      .then(([form, reps]) => {
        setFormJson(form?.json || null);
        setFormName(form?.name || '');
        setReponses(reps || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement du dashboard');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Chargement du dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!formJson) return <div className="p-8 text-center">Aucun formulaire trouvé.</div>;

  return (
    <>
      <PageHeader
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Formulaires', href: '/Formulaires' },
          { label: formName || 'Dashboard', href: '#' }
        ]}
        heading={`Dashboard — ${formName}`}
      >
        <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="h-4 w-4" />
          Retour
        </Button>
      </PageHeader>
      <div className="max-w-6xl mx-auto p-6">
        <SurveyDashboard surveyJson={formJson} responses={reponses} />
        <div className="mt-8">
          <SurveyTableView surveyJson={formJson} responses={reponses} />
        </div>
      </div>
    </>
  );
} 