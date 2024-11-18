import type { DateTime } from 'luxon'
import type { ICurso } from '../Establecimiento'
import type { IUsuario } from '../../types'

export interface ILibro {
    id: number,
    nombreLibro: string,
    cursoId: number,
    tipoEducacioneslesPaisId: number,
    nivelesEducacionalesPaisId: number,
    gradoEducacionalesPaisId: number,
    establecimientoId: number,
    usuarioId: number,
    createdAt: DateTime,
    updatedAt: DateTime,
    doRegistraEvaluacionesLogro: boolean,
    curso: ICurso,
    usuario: IUsuario
}