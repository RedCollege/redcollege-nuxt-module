import type { $Fetch } from 'ofetch';
import type { IItemEntradaCurricular } from '~/src/runtime/models/Curriculum';


interface ItemEntradaProps {
    establecimientoId?: number;
    descripcion: string;
    entradaCurricularId: number;
}

export default class ItemEntradaCurricularModule {
    constructor(private fetcher: $Fetch) { }

    async store(props: ItemEntradaProps): Promise<IItemEntradaCurricular> {
        return this.fetcher('itemEntradaCurricular', {
            params: props,
            method: 'POST'
        });
    }

    async update(id: number, props: ItemEntradaProps): Promise<IItemEntradaCurricular> {
        return this.fetcher(`itemEntradaCurricular/${id}`, {
            params: props,
            method: 'PATCH'
        });
    }

    async delete(id: number): Promise<IItemEntradaCurricular> {
        return this.fetcher(`itemEntradaCurricular/${id}`, {
            method: 'DELETE'
        });
    }
}
