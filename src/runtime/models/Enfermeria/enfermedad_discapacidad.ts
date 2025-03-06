interface TipoEnfermedad {
    id: number
    nombre: string
}

export interface IEnfermedadDiscapacidad {
    id: number
    nombre: string
    establecimientoId: number
    tipoId: number
    tipo: TipoEnfermedad
}

export interface IEnfermedadDiscapacidadForm {
    establecimientoId: number
    nombre: string
    alias: string
    tipoId: number | string
}