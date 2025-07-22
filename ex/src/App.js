import './App.css';
import GraphiqueAnomalies from './GraphiqueAnomalies';
import GraphiqueEntreeSortie from './GraphiqueEntreeSortie';
import GraphiquePresence     from './GraphiquePresence';
import CalendrierEvenements from './CalendrierEvenements';
import GraphiqueCandidatures from './GraphiqueCandidatures';
import GraphiqueStatuts from './GraphiqueStatuts';
import './organisation.css'; 
export default function App() {
  return (
      <div class="grid">
        <GraphiqueCandidatures/>
        <GraphiqueStatuts/>
        <GraphiqueEntreeSortie />
       <GraphiquePresence />
        <CalendrierEvenements />
        <GraphiqueAnomalies />
      </div>
  );
}

