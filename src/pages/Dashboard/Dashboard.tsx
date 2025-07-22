import PageHeader from '@/components/navigation/page-header';
import MetricsCard from '@/components/dashboard/metrics-card';
import CardWrapper from '@/components/card-wrapper';
import StatUtilisateurs from '@/components/dashboard/totalUtilisateurs';
import SubscriptionOverviewCard from '@/components/dashboard/subscription-overview-card';
import CreditScoreCard from '@/components/dashboard/credit-score-chart';
import GraphiqueRevenuMensuel from '@/components/dashboard/GraphiqueRevenuMensuel';
import GraphiqueVisiteurs from '@/components/dashboard/GraphiqueVisiteurs';
import GraphiqueRevenuGlobal from '@/components/dashboard/GraphiqueRevenuGlobal';

const Dashboard = () => {
	return (
		<>
			<PageHeader
				items={[
					{ label: 'Accueil', href: '/' },
					{ label: 'Tableau de bord', href: '/' }
				]}
				heading="Bonjour! Orange est la ! Oubien?"
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<MetricsCard />
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
				<CardWrapper className="col-span-1 lg:col-span-4" title="Monthly Target">
					<CreditScoreCard score={77} />
				</CardWrapper>

				<CardWrapper className="col-span-1 lg:col-span-4" title="Total Utilisateurs">
					<StatUtilisateurs />
				</CardWrapper>

				<CardWrapper className="col-span-1 lg:col-span-4" title="Subscription Overview">
					<SubscriptionOverviewCard />
				</CardWrapper>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
				<GraphiqueRevenuMensuel />
				<GraphiqueVisiteurs />
			</div>

			<GraphiqueRevenuGlobal />
		</>
	);
};

export default Dashboard;
