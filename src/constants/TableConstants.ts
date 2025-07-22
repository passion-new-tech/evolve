// import { IEmployee } from '@/types/IEmployee';

export enum EmployeeStatus {
	Assigned = 'Assigned',
	NotAssigned = 'Not Assigned',
	DriverAssigned = 'Driver Assigned'
}

// Le tableau employees est commenté car il ne correspond pas à l'interface IEmployee et cause des erreurs de build.
/*
export const employees: IEmployee[] = [
	{
		id: '234239864',
		name: 'Siegfried Kaiser',
		position: 'Accountant',
		office: 'Tokyo',
		age: 33,
		vehicle: {
			type: 'Gold08 (SUV)',
			code: 'SP2053'
		},
		status: EmployeeStatus.Assigned,
		level: 'Level 1',
		doj: '2022-03-15'
	},
	{
		id: '23784629',
		name: 'Xavier Graden',
		position: 'Chief Executive Officer',
		office: 'London',
		age: 34,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP5853' },
		status: EmployeeStatus.Assigned,
		level: 'Level 1',
		doj: '2018-01-10'
	},
	{
		id: '97453992',
		name: 'Randolph Kassim',
		position: 'Junior Technical Author',
		office: 'San Francisco',
		age: 42,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2053' },
		status: EmployeeStatus.Assigned,
		level: 'Level 2',
		doj: '2021-06-20'
	},
	{
		id: '23728375',
		name: 'Derk Schartz',
		position: 'Software Engineer',
		office: 'London',
		age: 37,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2053' },
		status: EmployeeStatus.NotAssigned,
		level: 'Level 2',
		doj: '2020-09-05'
	},
	{
		id: '25348894',
		name: 'Ned Quire',
		position: 'Software Engineer',
		office: 'New York',
		age: 26,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2053' },
		status: EmployeeStatus.DriverAssigned,
		level: 'Level 2',
		doj: '2021-11-30'
	},
	{
		id: '34781749',
		name: 'Franklin Boenisch',
		position: 'Integration Specialist',
		office: 'New York',
		age: 41,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2053' },
		status: EmployeeStatus.NotAssigned,
		level: 'Level 2',
		doj: '2019-04-12'
	},
	{
		id: '45673891',
		name: 'Sarah Chen',
		position: 'Data Analyst',
		office: 'Singapore',
		age: 29,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP4567' },
		status: EmployeeStatus.Assigned,
		level: 'Level 3',
		doj: '2020-02-18'
	},
	{
		id: '56789012',
		name: 'Michael Torres',
		position: 'Product Manager',
		office: 'Berlin',
		age: 36,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP7890' },
		status: EmployeeStatus.DriverAssigned,
		level: 'Level 3',
		doj: '2019-08-22'
	},
	{
		id: '67890123',
		name: 'Emma Watson',
		position: 'UX Designer',
		office: 'Paris',
		age: 31,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP3456' },
		status: EmployeeStatus.NotAssigned,
		level: 'Level 3',
		doj: '2021-01-15'
	},
	{
		id: '78901234',
		name: 'James Smith',
		position: 'Senior Developer',
		office: 'Sydney',
		age: 39,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP8901' },
		status: EmployeeStatus.Assigned,
		level: 'Level 4',
		doj: '2017-11-05'
	},
	{
		id: '89012345',
		name: 'Lisa Johnson',
		position: 'Marketing Manager',
		office: 'Toronto',
		age: 34,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2345' },
		status: EmployeeStatus.DriverAssigned,
		level: 'Level 4',
		doj: '2018-05-20'
	},
	{
		id: '90123456',
		name: 'David Kim',
		position: 'System Architect',
		office: 'Seoul',
		age: 43,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP6789' },
		status: EmployeeStatus.Assigned,
		level: 'Level 4',
		doj: '2016-09-10'
	},
	{
		id: '12345678',
		name: 'Anna Martinez',
		position: 'Quality Assurance',
		office: 'Madrid',
		age: 28,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP1234' },
		status: EmployeeStatus.NotAssigned,
		level: 'Level 4',
		doj: '2020-07-30'
	},
	{
		id: '23456789',
		name: 'Thomas Anderson',
		position: 'DevOps Engineer',
		office: 'Amsterdam',
		age: 35,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP9012' },
		status: EmployeeStatus.Assigned,
		level: 'Level 4',
		doj: '2018-12-15'
	},
	{
		id: '34567890',
		name: 'Maria Garcia',
		position: 'Business Analyst',
		office: 'Barcelona',
		age: 32,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP5678' },
		status: EmployeeStatus.DriverAssigned,
		level: 'Level 4',
		doj: '2019-03-25'
	},
	{
		id: '45678901',
		name: 'Robert Taylor',
		position: 'Frontend Developer',
		office: 'Dublin',
		age: 27,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP3457' },
		status: EmployeeStatus.NotAssigned,
		level: 'Level 4',
		doj: '2021-04-10'
	},
	{
		id: '56789123',
		name: 'Sophie Brown',
		position: 'HR Manager',
		office: 'Melbourne',
		age: 38,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP7891' },
		status: EmployeeStatus.Assigned,
		level: 'Level 4',
		doj: '2017-06-18'
	},
	{
		id: '67891234',
		name: 'Alex Wong',
		position: 'Mobile Developer',
		office: 'Hong Kong',
		age: 30,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP4321' },
		status: EmployeeStatus.DriverAssigned,
		level: 'Level 4',
		doj: '2020-10-05'
	},
	{
		id: '78912345',
		name: 'Isabella Silva',
		position: 'Project Manager',
		office: 'São Paulo',
		age: 36,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP8765' },
		status: EmployeeStatus.NotAssigned,
		level: 'Level 4',
		doj: '2019-02-12'
	},
	{
		id: '89123456',
		name: 'Daniel Lee',
		position: 'Cloud Engineer',
		office: 'Tokyo',
		age: 33,
		vehicle: { type: 'Gold08 (SUV)', code: 'SP2468' },
		status: EmployeeStatus.Assigned,
		level: 'Level 4',
		doj: '2018-08-22'
	}
];
*/

export const statusOptions = [
	{ value: EmployeeStatus.Assigned, label: 'Assigned', color: 'text-blue-500' },
	{ value: EmployeeStatus.NotAssigned, label: 'Not Assigned', color: 'text-red-500' },
	{ value: EmployeeStatus.DriverAssigned, label: 'Driver Assigned', color: 'text-blue-500' }
] as const;

export const positionOptions = [
	{ value: 'Accountant', label: 'Accountant' },
	{ value: 'Chief Executive Officer', label: 'Chief Executive Officer' },
	{ value: 'Software Engineer', label: 'Software Engineer' },
	{ value: 'Data Analyst', label: 'Data Analyst' },
	{ value: 'Product Manager', label: 'Product Manager' },
	{ value: 'UX Designer', label: 'UX Designer' },
	{ value: 'Senior Developer', label: 'Senior Developer' },
	{ value: 'Marketing Manager', label: 'Marketing Manager' },
	{ value: 'System Architect', label: 'System Architect' },
	{ value: 'Quality Assurance', label: 'Quality Assurance' },
	{ value: 'DevOps Engineer', label: 'DevOps Engineer' },
	{ value: 'Business Analyst', label: 'Business Analyst' },
	{ value: 'Frontend Developer', label: 'Frontend Developer' },
	{ value: 'HR Manager', label: 'HR Manager' },
	{ value: 'Mobile Developer', label: 'Mobile Developer' },
	{ value: 'Project Manager', label: 'Project Manager' },
	{ value: 'Cloud Engineer', label: 'Cloud Engineer' }
];

export const officeOptions = [
	{ value: 'Tokyo', label: 'Tokyo' },
	{ value: 'London', label: 'London' },
	{ value: 'San Francisco', label: 'San Francisco' },
	{ value: 'New York', label: 'New York' },
	{ value: 'Singapore', label: 'Singapore' },
	{ value: 'Berlin', label: 'Berlin' },
	{ value: 'Paris', label: 'Paris' },
	{ value: 'Sydney', label: 'Sydney' },
	{ value: 'Toronto', label: 'Toronto' },
	{ value: 'Seoul', label: 'Seoul' },
	{ value: 'Madrid', label: 'Madrid' },
	{ value: 'Amsterdam', label: 'Amsterdam' },
	{ value: 'Barcelona', label: 'Barcelona' },
	{ value: 'Dublin', label: 'Dublin' },
	{ value: 'Melbourne', label: 'Melbourne' },
	{ value: 'Hong Kong', label: 'Hong Kong' },
	{ value: 'São Paulo', label: 'São Paulo' }
];

export const levelOptions = [
	{ value: 'Level 1', label: 'Level 1' },
	{ value: 'Level 2', label: 'Level 2' },
	{ value: 'Level 3', label: 'Level 3' },
	{ value: 'Level 4', label: 'Level 4' }
];
