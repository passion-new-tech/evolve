import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphiqueStatuts() {
  const [labels, setLabels]   = useState([]);
  const [values, setValues]   = useState([]);
  const [statuts, setStatuts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.252.86:3001/api/candidatures')
      .then(r => r.json())
      .then(list => {
        const map = list.reduce((acc, c) => {
          const k = c.statut_candidature || 'inconnu';
          (acc[k] = acc[k] || []).push(c);
          return acc;
        }, {});
        setStatuts(map);
        setLabels(Object.keys(map));          // ['soumise']
        setValues(Object.values(map).map(a => a.length)); // [1]
        setLoading(false);
      })
      .catch(err => (console.error(err), setLoading(false)));
  }, []);

  if (loading) return <p>Chargement…</p>;
  if (!labels.length) return <p>Aucune donnée</p>;

  /* palette ajustée au nombre de statuts */
  const palette = ['#F9112C','#50964E','#e15759','#76b7b2',
                   '#59a14f','#edc949','#af7aa1','#ff9da7'];
  const background = labels.map((_, i) => palette[i % palette.length]);

  const data = { labels, datasets:[{ data: values, backgroundColor: background }] };

  return (
    <div style={{ width:420, margin:'0 auto', textAlign:'center' }}>
      <h3>Candidatures par statut</h3>
      <Pie data={data} />

      <table style={{ margin:'1rem auto', borderCollapse:'collapse', minHeight:40 }}>
        <thead><tr><th>Statut</th><th>Total</th></tr></thead>
        <tbody>
          {labels.map(l => (
            <tr key={l}>
              <td style={{ border:'1px solid #ccc', padding:4 }}>{l}</td>
              <td style={{ border:'1px solid #ccc', padding:4 }}>
                {statuts[l].length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
