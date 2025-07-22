import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import AppLayout from './layout/AppLayout';
import FormView from './pages/FormView/FormView';
import Typography from './pages/Typography/Typography';
import Buttons from './pages/Buttons/Buttons';
import Tables from './pages/Utilisateurs/utilisateurs';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';
import Profile from './pages/Profile/Profile';
import CalendarPage from './pages/Calendar/Calendar';
import FAQPage from './pages/Faq/Faq';
import Formulaires from './pages/Formulaires/Formulaires';
import DetailUtilisateur from './pages/Utilisateurs/DetailUtilisateur';
import PublicFormulaire from './pages/Formulaires/PublicFormulaire';
//import ReponsesFormulaire from './pages/Formulaires/ReponsesFormulaire';
import ListeReponsesFormulaire from './pages/Formulaires/ReponsesFormulaire';
import EditFormulaire from './pages/Formulaires/EditFormulaire';
import ShareFormulaire from './pages/Formulaires/ShareFormulaire';
import DetailReponseFormulaire from './pages/Formulaires/DetailReponseFormulaire';
import DashboardFormulaire from './pages/Formulaires/DashboardFormulaire';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/recover-password" element={<RecoverPassword />} />
				<Route path="/Utilisateurs/:id" element={<DetailUtilisateur />} />
				<Route path="/formulaires/public/:id" element={<PublicFormulaire />} />
				
				<Route element={<AppLayout />}>
					<Route index path="/" element={<Dashboard />} />
					<Route path="/form-view" element={<FormView />} />
					<Route path="/typography" element={<Typography />} />
					<Route path="/buttons" element={<Buttons />} />
					<Route path="/Utilisateurs" element={<Tables />} />
					<Route path="/Formulaires" element={<Formulaires />} />
					<Route path="/faq" element={<FAQPage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/calendar" element={<CalendarPage />} />
					<Route path="/formulaires/reponses/:id" element={<DetailReponseFormulaire />} />
				<Route path="/formulaires/:id/reponses" element={<ListeReponsesFormulaire />} />
				<Route path="/formulaires/edit/:id" element={<EditFormulaire />} />
				<Route path="/formulaires/share/:id" element={<ShareFormulaire />} />
				<Route path="/formulaires/dashboard/:id" element={<DashboardFormulaire />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
