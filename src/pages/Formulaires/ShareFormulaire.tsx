import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormulaireById } from '@/services/formulaires.api';
import PageHeader from '@/components/navigation/page-header';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, CopyIcon, EyeIcon } from 'lucide-react';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import CardWrapper from '@/components/card-wrapper';
import toast from 'react-hot-toast';

export default function ShareFormulaire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getFormulaireById(id)
      .then(setSurvey)
      .catch(() => setError("Erreur lors du chargement du formulaire"))
      .finally(() => setIsLoading(false));
  }, [id]);

  const publicUrl = `${window.location.origin}/#/formulaires/public/${id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      toast.success('Lien copié dans le presse-papier');
    } catch (err) {
      toast.error('Erreur lors de la copie du lien');
    }
  };

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
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
          { label: 'Partage', href: `/formulaires/share/${id}` }
        ]}
        heading={`Partager : ${survey?.name || 'Formulaire'}`}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardWrapper title="Options de partage">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium">Lien public</label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={publicUrl}
                    readOnly
                    className="flex-1 p-2 border rounded-md bg-muted"
                  />
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleCopyLink}
                  >
                    <CopyIcon className="h-4 w-4" />
                    Copier
                  </Button>
                </div>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handlePreviewToggle}
                >
                  <EyeIcon className="h-4 w-4" />
                  {showPreview ? 'Masquer' : 'Afficher'} la prévisualisation
                </Button>
              </div>
            </div>
          </CardWrapper>

          {showPreview && (
            <CardWrapper title="Prévisualisation">
              <div className="survey-container">
                <Survey
                  model={new Model(survey.json)}
                  mode="display"
                />
              </div>
            </CardWrapper>
          )}
        </div>
      </div>
    </>
  );
} 