import type { DateTime } from "luxon";

export interface IRegistroAtencionAdjunto {
    id: number;
    registroAtencionId: number;
    nombre: string;
    url: string;
    tipo: string;
    deletedBy?: number;
    deletedAt?: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
}
