import { useEffect, useRef } from "react";
import { Model } from "survey-core";
import { Tabulator } from "survey-analytics/survey.analytics.tabulator";
import "survey-analytics/survey.analytics.tabulator.css";
import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import * as XLSX from "xlsx";

applyPlugin(jsPDF);

interface SurveyTableViewProps {
  surveyJson: any;
  responses: any[];
}

export default function SurveyTableView({ surveyJson, responses }: SurveyTableViewProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!surveyJson || !responses || !tableRef.current) return;
    const survey = new Model(surveyJson);
    const table = new Tabulator(survey, responses, { jspdf: jsPDF, xlsx: XLSX });
    table.render(tableRef.current);
    return () => {
      tableRef.current!.innerHTML = "";
    };
  }, [surveyJson, responses]);

  return <div ref={tableRef} />;
} 