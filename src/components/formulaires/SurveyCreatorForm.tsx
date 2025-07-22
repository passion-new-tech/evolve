import React from 'react';
import SurveyCreatorWidget from '@/components/formulaires/SurveyCreator';
import "survey-core/i18n/french";
import "survey-creator-core/i18n/french";
import { surveyLocalization } from 'survey-core';
import { editorLocalization } from 'survey-creator-core';

surveyLocalization.currentLocale = "fr";
editorLocalization.currentLocale = "fr";
interface SurveyCreatorFormProps {
  initialData?: any;
  surveyId?: string;
  onBack: () => void;
  onSave: (json: any) => void;
}

const SurveyCreatorForm: React.FC<SurveyCreatorFormProps> = ({ initialData, surveyId, onBack, onSave }) => {
  // Récupère le JSON initial pour SurveyCreatorWidget
  const initialJson = initialData?.json || undefined;

  const handleSave = (json: any) => {
    // On peut passer d'autres infos si besoin (id, etc.)
    onSave({ ...initialData, json });
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{surveyId ? 'Éditer le formulaire' : 'Nouveau formulaire'}</h2>
        <button className="btn btn-secondary" onClick={onBack}>Retour</button>
      </div>
      <SurveyCreatorWidget json={initialJson} onSave={handleSave} />
    </div>
  );
};

export default SurveyCreatorForm; 