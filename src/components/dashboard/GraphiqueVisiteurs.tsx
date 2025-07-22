import CardWrapper from '../card-wrapper';
import PieChartComponent from './pie-chart-component';

const GraphiqueVisiteurs = () => (
  <CardWrapper className="col-span-1 lg:col-span-3" title="Visiteurs">
    <PieChartComponent />
  </CardWrapper>
);

export default GraphiqueVisiteurs; 