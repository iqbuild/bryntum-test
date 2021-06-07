export interface SubProcess {
	id: string;
	className: string;
	name: string;
	start: string | Date;
	end: string | Date;
}

export interface Process {
	id: string;
	className: string;
	name: string;
	specialty: string;
	subProcesses: Array<SubProcess>;
}

export interface Specialty {
	id: string;
	name: string;
	className: string;
	processes: Array<Process>;
}

export interface BuilderData {
	specialties: Array<Specialty>;
}
