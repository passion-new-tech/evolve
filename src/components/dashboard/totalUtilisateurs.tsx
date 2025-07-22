import { useEffect, useState } from 'react';
import { getUtilisateurs } from '@/services/utilisateur.api';

const StatUtilisateurs = () => {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUtilisateurs()
      .then((data) => {
        setTotal(Array.isArray(data) ? data.length : 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Erreur lors de la récupération des utilisateurs');
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">
          {loading ? 'Chargement...' : error ? 'Erreur' : total}
        </span>
      </div>
      <p className="text-muted-foreground text-sm">Total des utilisateurs</p>
    </div>
  );
};

export default StatUtilisateurs;
