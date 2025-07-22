import React, { useEffect, useRef, useState } from "react";
import { Model } from "survey-core";
import { VisualizationPanel } from "survey-analytics";
import "survey-analytics/survey.analytics.min.css";

interface TabInfo {
  name: string;
  questions: string[];
  vizPanel?: any;
}

interface SurveyDashboardProps {
  surveyJson: any;
  responses: any[];
  tabsInfo?: TabInfo[]; // Optionnel : pour custom tabs
}

const SurveyDashboard: React.FC<SurveyDashboardProps> = ({ surveyJson, responses, tabsInfo }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const mainDiv = useRef<HTMLDivElement>(null);
  const vizPanelContainer = useRef<HTMLDivElement>(null);
  const [tabs, setTabs] = useState<TabInfo[]>([]);

  useEffect(() => {
    if (!surveyJson || !responses) return;
    const survey = new Model(surveyJson);
    const allQuestions = survey.getAllQuestions();
    let tabsToUse: TabInfo[];

    if (tabsInfo && tabsInfo.length > 0) {
      // Utilise la config custom si fournie
      tabsToUse = tabsInfo.map(tab => ({
        ...tab,
        vizPanel: new VisualizationPanel(
          allQuestions.filter(q => tab.questions.includes(q.name)),
          responses.map(r => r.reponses)
        )
      }));
    } else {
      // Un seul onglet avec toutes les questions
      tabsToUse = [{
        name: "Toutes les réponses",
        questions: allQuestions.map(q => q.name),
        vizPanel: new VisualizationPanel(allQuestions, responses.map(r => r.reponses))
      }];
    }
    setTabs(tabsToUse);

    // Affiche le premier onglet par défaut
    setTimeout(() => {
      if (vizPanelContainer.current && tabsToUse[0]) {
        vizPanelContainer.current.innerHTML = "";
        tabsToUse[0].vizPanel.render(vizPanelContainer.current);
      }
    }, 0);
    // eslint-disable-next-line
  }, [surveyJson, responses]);

  // Changement d’onglet
  const handleTabChange = (idx: number) => {
    setTabIndex(idx);
    if (vizPanelContainer.current && tabs[idx]) {
      vizPanelContainer.current.innerHTML = "";
      tabs[idx].vizPanel.render(vizPanelContainer.current);
    }
  };

  return (
    <div ref={mainDiv}>
      <div className="tabs flex gap-2 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            className={`tablinks px-4 py-2 rounded ${tabIndex === i ? "bg-primary text-white" : "bg-gray-100"}`}
            onClick={() => handleTabChange(i)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="tabcontent" ref={vizPanelContainer} />
    </div>
  );
};

export default SurveyDashboard; 