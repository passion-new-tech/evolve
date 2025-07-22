import PageHeader from '@/components/navigation/page-header';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import CustomSearch from '@/components/custom-controls/custom-search';
import { DateRange } from 'react-day-picker';
import CustomDateRangePicker from '@/components/custom-controls/custom-date-range-picker';
import { IEmployee } from '@/types/IEmployee';
import CustomDialogWrapper from '@/components/custom-controls/custom-dialog-wrapper';
import DataTable from '@/components/Utilisateurs/data-table';
import AddEmployee from '@/components/Utilisateurs/ajoutUtilisateur';
import { getUtilisateurs, addUtilisateur, updateUtilisateur, deleteUtilisateur } from '@/services/utilisateur.api';
//import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


//const ITEMS_PER_PAGE = 10;

const Tables = () => {
  const [employeesData, setEmployeesData] = useState<IEmployee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedData, setPaginatedData] = useState<IEmployee[]>([]);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>();
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);
  const [isEditEmployeeDialogOpen, setIsEditEmployeeDialogOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<IEmployee | null>(null);
  const [pageSize, setPageSize] = useState(10);

  // Récupération des utilisateurs depuis l'API
  useEffect(() => {
    getUtilisateurs().then(data => {
      setEmployeesData(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(employeesData.length / pageSize));
    setPaginatedData(employeesData.slice((currentPage - 1) * pageSize, currentPage * pageSize));
  }, [currentPage, employeesData, pageSize]);

  // Recherche
  useEffect(() => {
    if (search?.length > 0) {
      setCurrentPage(1);
      const filteredData = employeesData.filter((employee) =>
        (`${employee.nom} ${employee.prenoms}`.toLowerCase().includes(search.toLowerCase()))
      );
      setPaginatedData(filteredData.slice(0, pageSize));
      setTotalPages(Math.ceil(filteredData.length / pageSize));
    } else {
      setPaginatedData(employeesData.slice((currentPage - 1) * pageSize, currentPage * pageSize));
      setTotalPages(Math.ceil(employeesData.length / pageSize));
    }
  }, [search, employeesData, currentPage, pageSize]);

  // Filtre par date
  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      setCurrentPage(1);
      const filteredData = employeesData.filter((employee) => {
        const dateInscription = new Date(employee.dateInscription);
        return dateInscription >= dateRange.from! && dateInscription <= dateRange.to!;
      });
      setPaginatedData(filteredData.slice(0, pageSize));
      setTotalPages(Math.ceil(filteredData.length / pageSize));
    } else if (!dateRange?.from && !dateRange?.to) {
      setPaginatedData(employeesData.slice((currentPage - 1) * pageSize, currentPage * pageSize));
      setTotalPages(Math.ceil(employeesData.length / pageSize));
    }
  }, [dateRange, employeesData, currentPage, pageSize]);

  // Ajout d'un utilisateur
  const handleAddEmployee = async (newEmployee: IEmployee) => {
    try {
      const created = await addUtilisateur(newEmployee);
      setEmployeesData((prev) => [...prev, created]);
      setIsAddEmployeeDialogOpen(false);
      toast.success('Utilisateur ajouté avec succès');
    } catch (e) {
      toast.error('Erreur lors de l\'ajout de l\'utilisateur');
    }
  };

  // Suppression d'un utilisateur
  const handleDeleteEmployee = async (id: string | number) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    const intId = typeof id === 'string' ? parseInt(id, 10) : id;
    try {
      await deleteUtilisateur(intId);
      setEmployeesData((prev) => prev.filter((emp) => Number(emp.id_utilisateur) !== intId));
      toast.success('Utilisateur supprimé avec succès');
    } catch (e) {
      toast.error('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  // Edition d'un utilisateur
  const handleEditEmployee = async (updatedEmployee: IEmployee) => {
    try {
      const updated = await updateUtilisateur(updatedEmployee);
      setEmployeesData((prev) => prev.map((emp) => emp.id === updated.id ? updated : emp));
      setIsEditEmployeeDialogOpen(false);
      setEmployeeToEdit(null);
      toast.success('Utilisateur modifié avec succès');
    } catch (e) {
      toast.error('Erreur lors de la modification de l\'utilisateur');
    }
  };

  // Ajout des boutons d'action dans le tableau
  const renderActions = (employee: IEmployee) => (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); setEmployeeToEdit(employee); setIsEditEmployeeDialogOpen(true); }}>
        <EditIcon size={16} />
      </Button>
      <Button size="sm" variant="destructive" onClick={e => { e.stopPropagation(); if (employee.id_utilisateur !== undefined) handleDeleteEmployee(employee.id_utilisateur); }}>
        <TrashIcon size={16} />
      </Button>
    </div>
  );

  return (
    <>
      <PageHeader
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Utilisateurs', href: '/tables' }
        ]}
        heading="Utilisateurs"
      >
        <div className="space-y-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row md:items-center">
            <CustomSearch
              value={search}
              onChange={setSearch}
              className="w-full sm:w-[200px]"
              placeholder="Rechercher par nom"
            />

            <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
              <CustomDateRangePicker
                date={dateRange}
                onDateChange={setDateRange}
                className="w-full !border-none sm:w-[250px]"
                placeholder="Filtrer par date"
              />
            </div>
            <div>
              <Button
                variant="default"
                variantClassName="primary"
                leftIcon={<PlusIcon />}
                className="w-full sm:w-auto"
                onClick={() => setIsAddEmployeeDialogOpen(true)}
              >
                Ajouter un utilisateur
              </Button>
            </div>
          </div>
        </div>
      </PageHeader>

      <div>
        <DataTable
          data={paginatedData as unknown as IEmployee[]}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          renderActions={renderActions}
          pageSize={pageSize}
          onPageSizeChange={size => { setPageSize(size); setCurrentPage(1); }}
        />
      </div>

      <CustomDialogWrapper
        isOpen={isAddEmployeeDialogOpen}
        onOpenChange={setIsAddEmployeeDialogOpen}
        title="Ajouter un utilisateur"
      >
        <AddEmployee onOpenChange={setIsAddEmployeeDialogOpen} onSubmit={handleAddEmployee} />
      </CustomDialogWrapper>

      <CustomDialogWrapper
        isOpen={isEditEmployeeDialogOpen}
        onOpenChange={setIsEditEmployeeDialogOpen}
        title="Modifier l'utilisateur"
      >
        {employeeToEdit && (
          <AddEmployee
            onOpenChange={setIsEditEmployeeDialogOpen}
            onSubmit={handleEditEmployee}
            initialData={employeeToEdit}
          />
        )}
      </CustomDialogWrapper>
    </>
  );
};

export default Tables;
