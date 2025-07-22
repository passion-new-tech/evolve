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
import { FC, useState, useEffect } from 'react';
import { getProfils } from '@/services/profil.api';

interface IDataTableProps {
	data: IEmployee[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	renderActions?: (employee: IEmployee) => React.ReactNode;
	pageSize?: number;
	onPageSizeChange?: (size: number) => void;
}

const DataTable: FC<IDataTableProps> = ({
	data,
	currentPage,
	totalPages,
	onPageChange,
	renderActions,
	pageSize = 10,
	onPageSizeChange
}) => {
	const [profils, setProfils] = useState<any[]>([]);
	useEffect(() => {
		getProfils().then(setProfils);
	}, []);

	const pageSizeOptions = [5, 10, 20, 50, 100];

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between mb-2">
				<div></div>
				<div>
					<label className="mr-2">Éléments par page :</label>
					<select
						value={pageSize}
						onChange={e => onPageSizeChange ? onPageSizeChange(Number(e.target.value)) : null}
						className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
					>
						{pageSizeOptions.map(size => (
							<option key={size} value={size}>{size}</option>
						))}
					</select>
				</div>
			</div>
			<div className="w-full">
				<Table>
					<TableHeader className="table-row-background">
						<TableRow className="!border-none">
							<TableHead className="rounded-l-md !border-none pl-4">Nom</TableHead>
							<TableHead>Prénom</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Contact</TableHead>
							<TableHead>Fonction</TableHead>
							<TableHead>Profil</TableHead>
							<TableHead>Date de naissance</TableHead>
							<TableHead>Sexe</TableHead>
							<TableHead>Statut</TableHead>
							<TableHead className="rounded-r-md !border-none pr-1">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="!px-3">
						{data.map((user, idx) => (
							<TableRow
								key={user.id || idx}
								className="!border-none cursor-pointer hover:bg-gray-100"
							>
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
								<TableCell>{profils.find(p => p.id_profil === user.profil)?.nom_profil || "Profil inconnu"}</TableCell>
									<TableCell>{user.dateNaissance && !isNaN(new Date(user.dateNaissance).getTime()) ? format(new Date(user.dateNaissance), 'dd MMM yyyy') : '—'}</TableCell>
									<TableCell>{user.sexe}</TableCell>
									<TableCell>{user.statuts}</TableCell>
									<TableCell>{renderActions ? renderActions(user) : null}</TableCell>
								</TableRow>
						))}
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
