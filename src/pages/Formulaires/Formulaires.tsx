import { useState, useEffect } from 'react';
import PageHeader from '@/components/navigation/page-header';
import { PlusIcon, FileTextIcon, EditIcon, ShareIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFormulaires, deleteFormulaire, getFormulaireById, getReponsesFormulaire, createFormulaire } from '@/services/formulaires.api';
import { useNavigate } from 'react-router-dom';
import CardWrapper from '@/components/card-wrapper';
import toast from 'react-hot-toast';
import SurveyCreatorForm from '@/components/formulaires/SurveyCreatorForm';
import { exportToCSV, exportToPDF } from '@/lib/exportUtils';

const initialSurveyJson = {
  pages: [
    {
      name: 'Page1',
      elements: [
        {
          name: 'question1',
          title: 'Nouvelle question',
          type: 'text',
        },
      ],
    },
  ],
};

export default function FormulairesPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [responsesCount, setResponsesCount] = useState<{[key:string]:number}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  // const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    getFormulaires()
      .then(async (forms) => {
        setSurveys(forms);
        const counts: {[key:string]:number} = {};
        await Promise.all(forms.map(async (f:any) => {
          const reps = await getReponsesFormulaire(f.id);
          counts[f.id] = reps.length;
        }));
        setResponsesCount(counts);
      })
      .catch(() => setError('Erreur lors du chargement des formulaires'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleBack = () => {
    setIsCreating(false);
  };

  const handleSaveSurvey = async (data: any) => {
    try {
      const surveyJson = data.json || data;
      const name = surveyJson.title?.fr || surveyJson.title || 'Formulaire sans titre';
      await createFormulaire({ name, json: surveyJson });
      toast.success('Le formulaire a été créé');
      // Recharger la liste
      const forms = await getFormulaires();
      setSurveys(forms);
      setIsCreating(false);
    } catch (e) {
      toast.error('Impossible de créer le formulaire');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce formulaire ? Cette action est irréversible.')) {
      return;
    }

    try {
      await deleteFormulaire(id);
      setSurveys(surveys.filter(s => s.id !== id));
      toast.success('Le formulaire a été supprimé');
    } catch (e) {
      toast.error('Impossible de supprimer le formulaire');
    }
  };

  const handleShare = (id: string) => {
    const url = `${window.location.origin}/#/formulaires/public/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Lien copié dans le presse-papier');
    });
  };

  if (isCreating) {
    return (
      <>
        <PageHeader
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Formulaires', href: '/formulaires' },
            { label: 'Nouveau', href: '#' }
          ]}
          heading="Nouveau formulaire"
        />
        <div className="container mx-auto p-6">
          <SurveyCreatorForm
            initialData={{ json: initialSurveyJson }}
            onBack={handleBack}
            onSave={handleSaveSurvey}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Formulaires', href: '/formulaires' }
        ]}
        heading="Tableau de bord des formulaires"
      >
        <Button
          variant="default"
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={handleCreateClick}
        >
          <PlusIcon className="h-4 w-4" />
          Nouveau formulaire
        </Button>
      </PageHeader>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center min-h-[200px]">
              <div className="text-muted-foreground">Chargement...</div>
            </div>
          ) : error ? (
            <div className="col-span-full flex items-center justify-center min-h-[200px]">
              <div className="text-red-500">{error}</div>
            </div>
          ) : surveys.length === 0 ? (
            <div className="col-span-full flex items-center justify-center min-h-[200px]">
              <div className="text-muted-foreground">Aucun formulaire trouvé.</div>
            </div>
          ) : (
            surveys.map((survey) => (
              <CardWrapper
                key={survey.id}
                title={<span className="text-primary cursor-pointer underline hover:text-blue-700" onClick={() => navigate(`/formulaires/dashboard/${survey.id}`)}>{survey.name}</span>}
                className="relative"
              >
                <div className="absolute top-6 right-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    survey.json?.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : survey.json?.status === 'draft' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {survey.json?.status || 'brouillon'}
                  </span>
                </div>

                <div className="mt-2 text-sm text-muted-foreground">
                  {survey.json?.description?.fr || survey.json?.description || survey.description || 'Aucune description'}
                </div>

                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <FileTextIcon className="h-4 w-4 mr-1" />
                  <span>{responsesCount[survey.id] ?? 0} réponse{responsesCount[survey.id] !== 1 ? 's' : ''}</span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => navigate(`/formulaires/${survey.id}/reponses`)}
                  >
                    <FileTextIcon className="h-3 w-3" />
                    Réponses
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => navigate(`/formulaires/edit/${survey.id}`)}
                  >
                    <EditIcon className="h-3 w-3" />
                    Éditer
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleShare(survey.id)}
                  >
                    <ShareIcon className="h-3 w-3" />
                    Partager
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDelete(survey.id)}
                  >
                    <TrashIcon className="h-3 w-3" />
                    Supprimer
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const reps = await getReponsesFormulaire(survey.id);
                      if (reps.length === 0) return toast.error('Aucune réponse à exporter');
                      const form = await getFormulaireById(survey.id);
                      const formJson = form?.json;
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
                      const data = reps.map((rep:any) => {
                        const row: any = { soumis_le: rep.soumis_le || rep.created_at };
                        columns.slice(1).forEach(col => {
                          row[col.key] = rep.reponses?.[col.key] ?? '';
                        });
                        return row;
                      });
                      exportToCSV(`reponses_formulaire_${survey.id}.csv`, data, columns);
                    }}
                  >
                    Export CSV
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const reps = await getReponsesFormulaire(survey.id);
                      if (reps.length === 0) return toast.error('Aucune réponse à exporter');
                      const form = await getFormulaireById(survey.id);
                      const formJson = form?.json;
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
                      const data = reps.map((rep:any) => {
                        const row: any = { soumis_le: rep.soumis_le || rep.created_at };
                        columns.slice(1).forEach(col => {
                          row[col.key] = rep.reponses?.[col.key] ?? '';
                        });
                        return row;
                      });
                      exportToPDF(`reponses_formulaire_${survey.id}.pdf`, data, columns);
                    }}
                  >
                    Export PDF
                  </Button>
                </div>
              </CardWrapper>
            ))
          )}
        </div>
      </div>
    </>
  );
}
