import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GraphiqueEntreeSortie() {
  const [labels, setLabels] = useState([]);
  const [entrees, setEntrees] = useState([]);
  const [sorties, setSorties] = useState([]);

  useEffect(() => {
    fetch('/entrees_sorties.json')  // à remplacer
      .then(r => r.json())
      .then(j => {
        setLabels(j.map(d => d.jour));
        setEntrees(j.map(d => d.entrees));
        setSorties(j.map(d => d.sorties));
      });
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Entrées',
        data: entrees,
        backgroundColor: 'rgba(255,140,0,0.8)'   // orange vif
      },
      {
        label: 'Sorties',
        data: sorties,
        backgroundColor: 'rgba(255,195,115,0.8)' // orange clair
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <div style={{ width: 600, margin: '0 auto' }}>
      <h3>Flux Entrées / Sorties</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
