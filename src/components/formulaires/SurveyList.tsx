import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
  
interface Survey {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  responsesCount: number;
  status?: 'active' | 'draft' | 'closed';
  json?:any;

}

interface SurveyListProps {
  title: string;
  surveys: Survey[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView?: (id: string) => void;
  onNameClick?: (id: string) => void;
}

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const SurveyList: React.FC<SurveyListProps> = ({ title, surveys, onEdit, onDelete, onView, onNameClick }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleCopy = (id: string) => {
    const url = `${window.location.origin}/#/formulaires/public/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  // Log du contenu reçu
  console.log('SurveyList - surveys:', surveys);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="w-full">
        <Table>
          <TableHeader className="table-row-background">
            <TableRow className="!border-none">
              <TableHead className="rounded-l-md !border-none pl-4">Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Réponses</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="rounded-r-md !border-none pr-1">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="!px-3">
            {surveys.map((survey) => (
              <TableRow key={survey.id} className="!border-none">
                <TableCell className="pl-4 font-medium">
                  {onNameClick ? (
                    <button className="text-primary underline hover:text-primary/80 transition" onClick={() => onNameClick(survey.id)}>
                      {survey.name}
                    </button>
                  ) : (
                    survey.name
                  )}
                </TableCell>
                <TableCell>
                  {survey.json?.description?.fr
                    || survey.json?.description
                    || survey.description
                    || 'N/D'}
                </TableCell>
                <TableCell className="text-center">{survey.responsesCount}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${survey.json.status === 'active' ? 'bg-green-100 text-green-800' : survey.json.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-700'}`}>{survey.status}</span>
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(survey.id)}>Éditer</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(survey.id)}>Supprimer</button>
                  {onView && <button className="btn btn-sm btn-outline-secondary" onClick={() => onView(survey.id)}>Voir</button>}
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleCopy(survey.id)}>
                    {copiedId === survey.id ? 'Lien copié !' : 'Partager'}
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate(`/formulaires/${survey.id}/reponses`)}>
                    Voir les réponses
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {surveys.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">Aucun formulaire trouvé.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SurveyList; 