import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphiqueAnomalies() {
  const [anomalies, setAnomalies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fichier à remplacer
    fetch('/anomalies.json')
      .then(r => r.json())
      .then(data => {
        const regroupement = data.reduce((acc, a) => {
          const type = a.type || 'inconnu';
          (acc[type] = acc[type] || []).push(a);
          return acc;
        }, {});
        setAnomalies(regroupement);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur API :', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement…</p>;

  const labels = Object.keys(anomalies);
  const values = labels.map(label => anomalies[label].length);

  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: ['#ffa94d', '#ff6b6b', '#fab005', '#ffd43b', '#f03e3e', '#d9480f']
    }]
  };

  return (
    <div style={{ width: 420, margin: '2rem auto', textAlign: 'center' }}>
      <h3>Répartition des anomalies</h3>
      <Pie data={data} />
    </div>
  );
}
