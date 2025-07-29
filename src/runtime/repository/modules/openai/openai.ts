import type { $Fetch } from 'ofetch';
import type { ExecutePromptSSEResponse } from '~/src/runtime/models/OpenAI/openai';


export default class OpenAIModule {
    constructor(private fetcher: $Fetch) { }

    async executePromptSSE(
        establecimientoId: number,
        projectId: number,
        routeName: string,
        variables: Record<string, string>,
        options?: {
            max_output_tokens?: number
            input?: any[]
            reasoning?: Record<string, any>
            store?: boolean
        }
    ): Promise<ExecutePromptSSEResponse> {
        return this.fetcher(`openai/establecimiento/${establecimientoId}/projects/${projectId}/prompts/${routeName}/sse`, {
            method: 'POST',
            body: {
                variables,
                ...options
            }
        });
    }


    /*async duplicarCompartirPlanificacion(planificacionId: number, titulo: string, periodo: string, cursoId: number, isColaborativa: boolean, asignaturasIds: number[], colaboradoresIds: number[], action: 1 | 2): Promise<IPlanificacion> {
        return this.fetcher(`/planificacion/duplicarCompartirPlanificacion/${planificacionId}?action=${action}`, {
            method: 'POST',
            body: {
                titulo: titulo,
                isColaborativa: isColaborativa,
                cursoId: cursoId,
                periodo: periodo,
                asignaturasIds: asignaturasIds,
                colaboradoresIds: colaboradoresIds
            }
        })
    }*/

}
