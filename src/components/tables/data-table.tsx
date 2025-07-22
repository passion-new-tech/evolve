import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IEmployee } from '@/types/IEmployee';
import { format } from 'date-fns';
import { FC } from 'react';

interface IDataTableProps {
	data: IEmployee[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	renderActions?: (employee: IEmployee) => React.ReactNode;
}

const DataTable: FC<IDataTableProps> = ({
	data,
	currentPage,
	totalPages,
	onPageChange,
	renderActions
}) => {
	return (
		<div className="space-y-4">
			<div className="w-full">
				<Table>
					<TableHeader className="table-row-background">
						<TableRow className="!border-none">
							<TableHead className="rounded-l-md !border-none pl-4">Nom</TableHead>
							<TableHead>Prénom</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Contact</TableHead>
							<TableHead>Fonction</TableHead>
							<TableHead>Date d'inscription</TableHead>
							<TableHead>Dernière connexion</TableHead>
							<TableHead>Profil</TableHead>
							<TableHead>Date de naissance</TableHead>
							<TableHead>Sexe</TableHead>
							<TableHead>Statut</TableHead>
							<TableHead className="rounded-r-md !border-none pr-1">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="!px-3">
						{data.map((user, idx) => {
							console.log("Utilisateur :", user);
							return (
								<TableRow key={user.id || idx} className="!border-none">
									<TableCell className="pl-4">
										<h6 className="text-sm font-medium">{user.nom}</h6>
										<h6 className="text-muted-foreground mt-[4px]">{user.id}</h6>
									</TableCell>
									<TableCell>{user.prenoms}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.contact}</TableCell>
									<TableCell>{user.fonction}</TableCell>
									<TableCell>{user.dateInscription && !isNaN(new Date(user.dateInscription).getTime()) ? format(new Date(user.dateInscription), 'dd MMM yyyy') : '—'}</TableCell>
									<TableCell>{user.derniereConnexion && !isNaN(new Date(user.derniereConnexion).getTime()) ? format(new Date(user.derniereConnexion), 'dd MMM yyyy') : '—'}</TableCell>
									<TableCell>{user.profil}</TableCell>
									<TableCell>{user.dateNaissance && !isNaN(new Date(user.dateNaissance).getTime()) ? format(new Date(user.dateNaissance), 'dd MMM yyyy') : '—'}</TableCell>
									<TableCell>{user.sexe}</TableCell>
									<TableCell>{user.statuts}</TableCell>
									<TableCell>{renderActions ? renderActions(user) : null}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2">
				<div className="text-muted-foreground text-sm">
					{currentPage} - {totalPages} of {totalPages}
				</div>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					leftIcon={<ChevronLeft className="h-4 w-4" />}
				/>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					leftIcon={<ChevronRight className="h-4 w-4" />}
				/>
			</div>
		</div>
	);
};

export default DataTable;
