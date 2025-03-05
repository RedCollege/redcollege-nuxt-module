import type { $Fetch } from "ofetch";

interface GetAllProps {
    trashed?: boolean;
    periodo?: string;
    curso?: string;
    estado?: string;
    condicion?: boolean;
    page?: number;
    buscar?: string;
    establecimiento: number;
}

export default class AntecedenteSalud {
    constructor(private fetcher: $Fetch) {}
}
