import CardWrapper from '../card-wrapper';
import BarChartComponent from './bar-chart-component';

const GraphiqueRevenuMensuel = () => (
  <CardWrapper className="col-span-1 lg:col-span-4" title="Revenu mensuel brut">
    <BarChartComponent />
  </CardWrapper>
);

export default GraphiqueRevenuMensuel; 