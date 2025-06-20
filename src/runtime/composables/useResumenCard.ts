import { computed, unref, type Ref, type ComputedRef } from "vue";
import type { IEstadisticasIndividuales, IResumenCard } from "../models";

export function useResumenCard(
    tipoDescargable: Ref<string> | ComputedRef<string>,
    estadisticasIndividuales: ComputedRef<IEstadisticasIndividuales | undefined>
) {
    const resumenConfigs = {
        actividad: (
            data: IEstadisticasIndividuales["actividad"]
        ): IResumenCard[] => [
            {
                titulo: "Resumen por Tipo de actividad",
                ToolTipContenido:
                    "Conoce el total de actividades realizadas, clasificadas según el tipo de actividad",
                variant: undefined,
                progressItems: data?.resumenPorTipoActividad ?? [],
            },
            {
                titulo: "Resumen por Responsable",
                ToolTipContenido:
                    "Conoce el total de actividades realizadas, clasificadas según el Responsable de la misma",
                variant: "text-green",
                progressItems: data?.resumenPorResponsable ?? [],
            },
            {
                titulo: "Resumen por Lugar",
                ToolTipContenido:
                    "Conoce el total de actividades realizadas, clasificadas según el lugar en que se efectuaron",
                variant: "text-purple",
                progressItems: data?.resumenPorLugar ?? [],
            },
        ],

        accidente: (
            data: IEstadisticasIndividuales["accidente"]
        ): IResumenCard[] => [
            {
                titulo: "Resumen por Nivel",
                ToolTipContenido:
                    "Atenciones realizadas/Accidentes atendidos segmentados por cada Nivel de Enseñanza",
                variant: undefined,
                progressItems: data?.resumenPorNivel ?? [],
            },
            {
                titulo: "Resumen por Lugar del Accidente",
                ToolTipContenido:
                    "Accidentes atendidos segmentados según el lugar en el que ocurrieron",
                variant: "text-green",
                progressItems: data?.resumenPorLugar ?? [],
            },
            {
                titulo: "Resumen por Gravedad",
                ToolTipContenido:
                    "Atenciones realizadas/Accidentes atendidos segmentados según el nivel de gravedad",
                variant: "text-orange",
                progressItems: data?.resumenPorGravedad ?? [],
            },
            {
                titulo: "Resumen por Bloques de Horario",
                ToolTipContenido:
                    "Atenciones realizadas/Accidentes atendidos segmentados según el horario en el que ocurrieron",
                variant: "text-purple",
                progressItems: data?.resumenPorBloqueHorario ?? [],
            },
        ],

        atencion: (
            data: IEstadisticasIndividuales["atencion"]
        ): IResumenCard[] => [
            {
                titulo: "Resumen por Nivel",
                ToolTipContenido:
                    "Atenciones realizadas/Accidentes atendidos segmentados por cada Nivel de Enseñanza",
                variant: undefined,
                progressItems: data?.resumenPorNivel ?? [],
            },
            {
                titulo: "Resumen por Lugar de Origen",
                ToolTipContenido:
                    "Atenciones realizadas y segmentadas según el Lugar de origen",
                variant: "text-green",
                progressItems: data?.resumenPorLugar ?? [],
            },
            {
                titulo: "Resumen por Bloques de Horario",
                ToolTipContenido:
                    "Atenciones realizadas/Accidentes atendidos segmentados según el horario en el que ocurrieron",
                variant: "text-purple",
                progressItems: data?.resumenPorBloqueHorario ?? [],
            },
            {
                titulo: "Resumen por Motivo",
                ToolTipContenido:
                    "Atenciones realizadas/Accidentes atendidos segmentados según el Motivo de la misma",
                variant: "text-orange",
                progressItems: data?.resumenPorMotivo ?? [],
            },
            {
                titulo: "Resumen por Destinos",
                ToolTipContenido:
                    "Atenciones realizadas y segmentadas según el Lugar de Destino",
                variant: "text-gold",
                progressItems: data?.resumenPorDestino ?? [],
            },
            {
                titulo: "Resumen por Tratamiento",
                ToolTipContenido:
                    "Atenciones realizadas/Accidentes atendidos segmentados según el tratamiento aplicado",
                variant: "text-destructive",
                progressItems: data?.resumenPorTratamiento ?? [],
            },
        ],
    } as const;

    const defaultResumenes: IResumenCard[] = [];

    const resumenes = computed<IResumenCard[]>(() => {
        const currentEstadisticas = estadisticasIndividuales.value;
        const tipo = unref(tipoDescargable) as keyof typeof resumenConfigs;

        if (!currentEstadisticas || !resumenConfigs[tipo]) {
            return defaultResumenes;
        }

        // Solución 1: Usar switch para manejar cada caso específicamente
        switch (tipo) {
            case "actividad":
                return resumenConfigs.actividad(currentEstadisticas.actividad);
            case "accidente":
                return resumenConfigs.accidente(currentEstadisticas.accidente);
            case "atencion":
                return resumenConfigs.atencion(currentEstadisticas.atencion);
            default:
                return defaultResumenes;
        }
    });

    // Computed adicionales para otros elementos dinámicos
    const chartData = computed(() => {
        const estadisticas = estadisticasIndividuales.value;
        const tipo = unref(tipoDescargable) as
            | "actividad"
            | "accidente"
            | "atencion";

        return estadisticas?.[tipo]?.chartData;
    });

    const tabName = computed(() => {
        const tipo = unref(tipoDescargable);

        switch (tipo) {
            case "actividad":
                return "actividades";
            case "accidente":
                return "accidentes";
            case "atencion":
                return "atenciones";
            default:
                return "actividades";
        }
    });

    const tituloResumen = computed(() => {
        const tipo = unref(tipoDescargable);

        switch (tipo) {
            case "actividad":
                return "RESUMEN DE ACTIVIDADES";
            case "accidente":
                return "RESUMEN DE ACCIDENTES";
            case "atencion":
                return "RESUMEN DE ATENCIONES";
            default:
                return "RESUMEN DE ACTIVIDADES";
        }
    });

    return {
        resumenes,
        chartData,
        tabName,
        tituloResumen,
    };
}
