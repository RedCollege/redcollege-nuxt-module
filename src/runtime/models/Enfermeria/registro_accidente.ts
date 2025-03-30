import type { DateTime } from "luxon"
import type { IConfiguracionItem, ICurso, IUsuario } from ".."

export interface ITestigo {
    id: number
    nombre: string
    apellido: string
    cedula: string
    registroAccidenteId: number
    createdAt: string
    updatedAt: string
}

export interface ITestigoForm {
    nombre: string
    apellido: string
    cedula: string
}

export interface IRegistroAccidente {
    id: number
    usuarioId: number | string
    cursoId: number | string
    establecimientoId: number | string
    pacienteId: number | string
    fechaRegistro: DateTime
    fechaAccidente: DateTime
    lugarAccidenteId: number | string
    gravedadAccidenteId: number | string
    circunstancias: string
    haveTestigos: boolean
    periodo: number | string
    deletedBy: number | null
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    usuario: IUsuario
    lugarAccidente: IConfiguracionItem
    gravedadAccidente: IConfiguracionItem
    curso: ICurso
    paciente: IUsuario
    testigos: ITestigo[]
}

export interface IRegistroAccidenteResponse {
    meta: {
        total: number
        perPage: number
        currentPage: number
        en_trayecto: number
        en_establecimiento: number
    }
    data: IRegistroAccidente[]
}

export interface IRegistroAccidenteForm {
    pacienteId: number | string
    establecimientoId: number | string
    cursoId: number | string
    periodo: number | string
    fechaRegistro: DateTime | string | Date
    fechaAccidente: DateTime | string | Date
    lugarAccidenteId: number | string
    gravedadAccidenteId: number | string
    circunstancias: string
    haveTestigos: boolean
    testigos: ITestigoForm[]
}

interface IRangoFecha {
    start: Date | string
    end: Date | string
}
export interface IRegistroAccidenteFilter {
    trashed?: boolean;
    searchTerm?: string;
    page?: number;
    periodo?: string | number;
    establecimiento?: number | string;
    rangoFecha?: IRangoFecha;
    paciente?: number | string;
    curso?: string | number;
    gravedad?: string | number
    lugarAccidente?: string | number
}