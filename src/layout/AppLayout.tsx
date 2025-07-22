import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout() {
	// const { toasts, toast } = useToast();

	return (
		<div className="relative flex min-h-screen">
			<SidebarProvider>
				<AppSidebar />
				<div className="flex-1">
					<AppHeader />
					<main className="relative">
						<Outlet />
					</main>
				</div>
			</SidebarProvider>
			{/* <ToastContainer toasts={toasts} onDismiss={(id) => toast({ title: '' })} /> */}
		</div>
	);
}
