import { computed, unref, type Ref, type ComputedRef } from "vue";

export interface CardConfig {
    titulo: string;
    cantidad: number;
    ToolTipContenido: string;
    icon: string;
}

export interface CardTotales {
    accidente?: {
        total?: number;
        enTrayecto?: number;
        enEstablecimiento?: number;
    };
    atencion?: {
        total?: number;
        finalizadas?: number;
        abiertas?: number;
    };
    actividad?: {
        total?: number;
        finalizadas?: number;
        programadas?: number;
        suspendidas?: number;
    };
}

export function useCardConfig(
    tabTypeOrRef:
        | "accidente"
        | "atencion"
        | "actividad"
        | Ref<string>
        | ComputedRef<string>,
    cardsTotales: ComputedRef<CardTotales | undefined>
): { cards: ComputedRef<CardConfig[]> } {
    const cardConfigs = {
        accidente: (data: CardTotales["accidente"]): CardConfig[] => [
            {
                titulo: "Total Accidentes",
                cantidad: data?.total || 0,
                ToolTipContenido:
                    "Accidentes atendidos en el establecimiento durante este año escolar",
                icon: "tabler:ambulance",
            },
            {
                titulo: "En Trayecto",
                cantidad: data?.enTrayecto || 0,
                ToolTipContenido: "Total de accidentes en trayecto",
                icon: "tabler:car-crash",
            },
            {
                titulo: "En Establecimiento",
                cantidad: data?.enEstablecimiento || 0,
                ToolTipContenido: "Total de accidentes en establecimiento",
                icon: "tabler:building-hospital",
            },
        ],

        atencion: (data: CardTotales["atencion"]): CardConfig[] => [
            {
                titulo: "Total Atenciones",
                cantidad: data?.total || 0,
                ToolTipContenido:
                    "Atenciones realizadas en el establecimiento durante este año escolar",
                icon: "tabler:first-aid-kit",
            },
            {
                titulo: "Finalizadas",
                cantidad: data?.finalizadas || 0,
                ToolTipContenido: "Total de atenciones finalizadas",
                icon: "tabler:circle-check",
            },
            {
                titulo: "Abiertas",
                cantidad: data?.abiertas || 0,
                ToolTipContenido: "Total de atenciones abiertas",
                icon: "tabler:clock",
            },
        ],

        actividad: (data: CardTotales["actividad"]): CardConfig[] => [
            {
                titulo: "Total Actividades",
                cantidad: data?.total || 0,
                ToolTipContenido:
                    "Conoce el total de actividades registradas en el rango de fecha indicado. Por defecto se muestra el año en curso",
                icon: "tabler:calendar-event",
            },
            {
                titulo: "Finalizadas",
                cantidad: data?.finalizadas || 0,
                ToolTipContenido:
                    "Conoce el total de actividades finalizadas en el rango de fecha indicado. Por defecto se muestra el año en curso",
                icon: "tabler:circle-check",
            },
            {
                titulo: "Programadas",
                cantidad: data?.programadas || 0,
                ToolTipContenido:
                    "Conoce el total de actividades programadas en el rango de fecha indicado. Por defecto se muestra el año en curso",
                icon: "tabler:hourglass",
            },
            {
                titulo: "Suspendidas",
                cantidad: data?.suspendidas || 0,
                ToolTipContenido:
                    "Conoce el total de actividades suspendidas en el rango de fecha indicado. Por defecto se muestra el año en curso",
                icon: "tabler:calendar-x",
            },
        ],
    };

    const defaultCards: CardConfig[] = [
        {
            titulo: "Sin Datos",
            cantidad: 0,
            ToolTipContenido: "No hay datos disponibles para mostrar",
            icon: "tabler:info-circle",
        },
    ];

    const cards = computed<CardConfig[]>(() => {
        const currentCardsTotales = cardsTotales.value;

        if (typeof tabTypeOrRef === "string") {
            return cardConfigs[tabTypeOrRef](
                currentCardsTotales?.[tabTypeOrRef]
            );
        }

        const tabName = unref(tabTypeOrRef).toLowerCase();

        if (tabName.includes("accidente")) {
            return cardConfigs.accidente(currentCardsTotales?.accidente);
        }

        if (tabName.includes("atencion")) {
            return cardConfigs.atencion(currentCardsTotales?.atencion);
        }

        if (tabName.includes("actividad")) {
            return cardConfigs.actividad(currentCardsTotales?.actividad);
        }

        return defaultCards;
    });

    return {
        cards,
    };
}
