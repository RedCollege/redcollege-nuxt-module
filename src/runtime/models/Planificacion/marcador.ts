import { DateTime } from 'luxon';

export interface IMarcador {
    id: number;
    fecha: DateTime;
    color: string;
    icon: string;
    iconColor: string;
    nombre: string;
    descripcion: string;
    unidadId: number;
    deletedBy: number | null;
    deletedAt: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
}
