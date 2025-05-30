import type { IConfiguracionItem, IEstablecimiento, IUsuario } from "..";

export interface IAdministracionMedicamento {
    id: number;
    periodo: number;
    indicacionTratamiento: string;
    estado: 'en_curso' | 'finalizado' | 'suspendido';
    establecimientoId: number;
    establecimiento: IEstablecimiento;
    pacienteid: number;
    paciente: IUsuario;
    medicamentos: IConfiguracionItem[];
    responsables: IUsuario[];
}

export interface IAdministracionMedicamentoFilter {
    searchTerm?: string;
    page?: number;
    estado?: 'en_curso' | 'finalizado' | 'suspendido';
    trashed?: boolean;
    periodo?: number;
    establecimiento?: number;
    paciente?: number;
    medicamento?: number;
    responsable?: number;
}

export interface IAdministracionMedicamentoForm {
    pacienteid: number;
    periodo: number;
    estado: 'en_curso' | 'finalizado' | 'suspendido';
    establecimientoId: number;
    medicamentosId: number[];
    responsables: number[];
    indicacionTratamiento: string;
}