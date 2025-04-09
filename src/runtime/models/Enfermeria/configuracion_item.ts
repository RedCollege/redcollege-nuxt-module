export enum ConfigItemEnum {
    GRAVEDAD_ACCIDENTE = 'gravedad_accidente',
    OCUPACION = 'ocupacion',
    TIPO_ACCIDENTE = 'tipo_accidente',
    TIPO_ACTIVIDAD = 'tipo_actividad',
    TRATAMIENTO = 'tratamiento',
    MEDICAMENTO = 'medicamento',
    ALERGIA = 'alergia',
    MOTIVO = 'motivo',
    EN_TRAYECTO = 'en_trayecto',
    EN_ESTABLECIMIENTO = 'en_establecimiento'

}

export interface IConfiguracionItem {
    id: number
    nombre: string
    context: ConfigItemEnum
    establecimientoId: number
    deletedBy: number | null
    deletedAt: string | null
    createdAt: string
    updatedAt: string
}

export type IConfiguracionItemGrouped = {
    [K in ConfigItemEnum]?: IConfiguracionItem[]
}

export interface IConfiguracionItemForm {
    establecimientoId: number
    nombre: string
    context: ConfigItemEnum
}