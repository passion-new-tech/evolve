import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphiqueCandidatures() {
  const [total, setTotal] = useState(null);    // null = en attente

  useEffect(() => {
    // URL exacte 
    const url = 'http://192.168.252.86:3001/api/candidatures';

    fetch(url)
      .then(r => r.json())
      .then(data => {
        console.log('Réponse API ➜', data);   // pour vérifier
        setTotal(Array.isArray(data) ? data.length : 0);
      })
      .catch(err => {
        console.error('Erreur API :', err);
        setTotal(0);
      });
  }, []);

  if (total === null) return <p>Chargement…</p>;

  const chartData = {
    labels: ['Candidatures'],
    datasets: [{
      data: [total],
      backgroundColor: ['#F27F0C'],
      hoverBackgroundColor: ['#FF6E00'],
    }]
  };

  return (
    <div style={{ width: 320, margin: '0 auto', textAlign: 'center' }}>
      <h2>Total Candidatures</h2>
      <Doughnut data={chartData} />
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{total}</p>
    </div>
  );
}
