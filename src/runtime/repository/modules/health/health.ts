import type { $Fetch } from 'ofetch';
import type { IHealth } from '../../../models';


export default class HealthModule {
    constructor(private fetcher: $Fetch) { }

    async get(): Promise<IHealth> {
        return this.fetcher(`health`, {
            method: 'GET'
        })
    }

}
