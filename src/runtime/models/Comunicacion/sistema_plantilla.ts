import { DateTime } from 'luxon';

export interface ISistemaPlantilla {
    id: number;
    nombre: string;
    img: string;
    tipoId: number;
    mensaje: string;
    asunto: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}