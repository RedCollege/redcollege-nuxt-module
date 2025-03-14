export enum ContextEnum {
    GRAVEDAD_ACCIDENTE = 'gravedad_accidente',
    OCUPACION = 'ocupacion',
    TIPO_ACCIDENTE = 'tipo_accidente',
    TIPO_ACTIVIDAD = 'tipo_actividad',
    TRATAMIENTO = 'tratamiento',
    MEDICAMENTO = 'medicamento',
    ALERGIA = 'alergia',
    MOTIVO = 'motivo',
    LUGAR = 'lugar'
}

export interface IConfiguracionItem {
    id: number
    nombre: string
    context: ContextEnum
    establecimientoId: number
}

export interface IConfiguracionItemForm {
    establecimientoId: number
    nombre: string
    context: ContextEnum
}