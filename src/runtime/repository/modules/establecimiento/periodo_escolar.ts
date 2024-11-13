import type { $Fetch } from 'ofetch';
import type { IPeriodoEscolar } from '../../../models';


export default class PeriodoEscolarModule {
    constructor(private fetcher: $Fetch) { }

    async getByEstablecimiento(establecimientoId: number): Promise<IPeriodoEscolar[]> {
        return this.fetcher(`/establecimiento/periodos/${establecimientoId}`, {
            method: 'GET'
        })
    }

}
