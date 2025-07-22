import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphiquePresence() {
  const [presentes, setPresentes] = useState([]);   // tableaux de personnes présentes
  const [absentes,  setAbsentes]  = useState([]);   // et absentes
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    fetch('/presence.json')   /*   à remplacer */
      .then(r => r.json())
      .then(list => {
        setPresentes(list.filter(p => p.present));
        setAbsentes (list.filter(p => !p.present));
        setLoading(false);
      })
      .catch(err => (console.error(err), setLoading(false)));
  }, []);

  if (loading) return <p>Chargement…</p>;

  
  const data = {
    labels: ['Présents', 'Absents'],
    datasets: [{
      data: [presentes.length, absentes.length],
      backgroundColor: ['rgba(255,140,0,0.9)', 'rgba(200,200,200,0.6)']
    }]
  };

 
  const totalJour   = presentes.length ; // effectif du jour
  const totalGlobal = totalJour + absentes.length;  // effectif total 

  return (
    <div style={{ width: 380, margin: '2rem auto', textAlign: 'center' }}>
      <h3>Présence du jour</h3>
      <Doughnut data={data} />

      
      <table style={{ margin:'1.5rem auto', borderCollapse:'collapse', minWidth:260 }}>
        <thead>
          <tr style={{ background:'#f8f8f8' }}>
            <th style={{ border:'1px solid #ccc', padding:6 }}>Statut</th>
            <th style={{ border:'1px solid #ccc', padding:6 }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border:'1px solid #ccc', padding:6 }}>Présents</td>
            <td style={{ border:'1px solid #ccc', padding:6 }}>{presentes.length}</td>
          </tr>
          <tr>
            <td style={{ border:'1px solid #ccc', padding:6 }}>Absents</td>
            <td style={{ border:'1px solid #ccc', padding:6 }}>{absentes.length}</td>
          </tr>
          <tr>
            <td style={{ border:'1px solid #ccc', padding:6 }}>Effectif du jour</td>
            <td style={{ border:'1px solid #ccc', padding:6 }}>{totalJour}</td>
          </tr>
          <tr>
            <td style={{ border:'1px solid #ccc', padding:6 }}>Effectif total</td>
            <td style={{ border:'1px solid #ccc', padding:6 }}>{totalGlobal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
