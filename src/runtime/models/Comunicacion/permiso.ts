import { DateTime } from "luxon";

export interface IPermiso {
    id?: number;
    establecimientoId: number;
    isProfAllowedInternalToTeachers: boolean;
    isProfAllowedExternalToApod: boolean;
    isProfAllowedResponseToAdmin: boolean;
    isApodAllowedMessageToTeachers: boolean;
    isApodAllowedMessageToAdmin: boolean;
    isApodAllowedResponse: boolean;
    createdAt?: DateTime;
    updatedAt?: DateTime;
}
