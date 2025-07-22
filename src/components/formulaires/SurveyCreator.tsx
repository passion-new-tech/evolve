import { useState, useEffect, useRef } from 'react';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
//import { ICreatorOptions } from 'survey-creator-core';
import 'survey-core/survey-core.min.css';
import 'survey-creator-core/survey-creator-core.min.css';
import 'survey-core/i18n/french';
import 'survey-creator-core/i18n/french';
import { surveyLocalization } from 'survey-core';
import { editorLocalization } from 'survey-creator-core';

surveyLocalization.currentLocale = 'fr';
editorLocalization.currentLocale = 'fr';

const isDev = process.env.NODE_ENV === 'development';

interface CreatorOptions {
  showLogicTab?: boolean;
  showTranslationTab?: boolean;
  showJSONEditorTab?: boolean;
  isAutoSave?: boolean;
  [key: string]: any;
}

const defaultOptions: CreatorOptions = {
  showLogicTab: true,
  showTranslationTab: false,
  showJSONEditorTab: true,
  isAutoSave: false,
};

interface SurveyCreatorWidgetProps {
  json?: any;
  options?: CreatorOptions;
  onSave?: (json: any) => void;
}

const SurveyCreatorWidget: React.FC<SurveyCreatorWidgetProps> = ({ json, options = {}, onSave }) => {
  const [error, setError] = useState<string | null>(null);
  const [creator, setCreator] = useState<SurveyCreator | null>(null);
  const [isCreatorReady, setIsCreatorReady] = useState(false);
  //const containerRef = useRef<HTMLDivElement>(null);
  const creatorInstance = useRef<SurveyCreator | null>(null);
  const isMounted = useRef(true);

  // Nettoyage de l'instance
  const cleanupCreator = () => {
    if (creatorInstance.current) {
      try {
        // @ts-ignore
        creatorInstance.current.dispose();
        creatorInstance.current = null;
        if (isDev) console.log('SurveyCreator nettoyé');
      } catch (e) {
        console.error('Erreur lors du nettoyage du SurveyCreator:', e);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    cleanupCreator();

    const initializeCreator = async () => {
      try {
        if (isDev) {
          console.log('Initialisation du SurveyCreator avec les options:', { ...defaultOptions, ...options });
        }
        const newCreator = new SurveyCreator({
          ...defaultOptions,
          ...options,
          showPagesToolbox: true,
          showSidebar: true,
          showToolbox: true,
        });
        newCreator.toolbox.forceCompact = true;
        newCreator.showOptions = false;
        if (json) {
          try {
            if (isDev) console.log('Chargement du JSON initial:', json);
            newCreator.JSON = json;
          } catch (jsonError) {
            throw new Error('Erreur lors du chargement du JSON initial');
          }
        }
        if (onSave) {
          newCreator.saveSurveyFunc = (saveNo: number, callback: (no: number, success: boolean) => void) => {
            try {
              if (isDev) console.log('Sauvegarde du formulaire...');
              onSave(newCreator.JSON);
              callback(saveNo, true);
            } catch (error) {
              console.error('Erreur lors de la sauvegarde du formulaire', error);
              callback(saveNo, false);
            }
          };
        }
        if (isDev) {
          newCreator.onPropertyChanged.add((_, options) => {
            console.log('Propriété modifiée:', options.name, '=', options.value);
          });
        }
        if (isMounted.current) {
          creatorInstance.current = newCreator;
          setCreator(newCreator);
          setIsCreatorReady(true);
          setError(null);
          if (isDev) console.log('SurveyCreator initialisé avec succès');
        } else {
          // @ts-ignore
          newCreator.dispose();
        }
      } catch (err) {
        console.error("Erreur lors de l'initialisation du créateur de formulaire", err);
        if (isMounted.current) {
          setError("Erreur lors de l'initialisation du créateur de formulaire");
        }
      }
    };

    const timer = setTimeout(initializeCreator, 100);
    return () => {
      isMounted.current = false;
      clearTimeout(timer);
      cleanupCreator();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [json]);

  if (error) {
    return (
      <div className="alert alert-danger m-3">
        <h4>Erreur</h4>
        <p>{error}</p>
        <p>Veuillez recharger la page ou contacter le support technique.</p>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>
          Recharger la page
        </button>
      </div>
    );
  }

  if (!isCreatorReady || !creator) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '500px' }}>
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="h5">Chargement de l'éditeur de formulaire...</p>
        <p className="text-muted">Veuillez patienter...</p>
      </div>
    );
  }

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      {/* @ts-ignore */}
      <SurveyCreatorComponent creator={creator} />
    </div>
  );
};

export default SurveyCreatorWidget;