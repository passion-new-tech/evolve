import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Export CSV générique
export function exportToCSV(filename: string, data: any[], columns?: {key: string, label: string}[]) {
  let csv = '';
  if (columns) {
    csv = Papa.unparse({
      fields: columns.map(c => c.label),
      data: data.map(row => columns.map(c => row[c.key]))
    });
  } else {
    csv = Papa.unparse(data);
  }
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : filename + '.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export PDF générique (tableau simple)
export function exportToPDF(filename: string, data: any[], columns: {key: string, label: string}[]) {
  const doc = new jsPDF();
  const colLabels = columns.map(c => c.label);
  const rows = data.map(row => columns.map(c => String(row[c.key] ?? '')));
  // Simple table rendering
  let y = 20;
  doc.text(filename.replace(/\.pdf$/, ''), 10, 10);
  (doc as any).autoTable({
    head: [colLabels],
    body: rows,
    startY: y
  });
  doc.save(filename.endsWith('.pdf') ? filename : filename + '.pdf');
}

// Préparation pour DOCX (à venir)
export function exportToDocx(/* ... */) {
  // TODO: à implémenter plus tard
} 