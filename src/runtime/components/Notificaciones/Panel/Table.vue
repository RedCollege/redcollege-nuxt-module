<script setup lang="ts">
    import type { INotificacion } from "../../../models/Notificacion/notificacion";
    import { formatearFechaNotificacion } from "../../../utils/notificaciones";

    interface Props {
        notificaciones: INotificacion[] | null | undefined;
        areAllSelected: boolean | null | undefined;
        selectedNotifications: Set<number>;
    }

    const props = defineProps<Props>();

    const emit = defineEmits<{
        "toggle-all-notifications": [value: boolean | string];
        "toggle-notification": [state: boolean | string, id: number];
        "marcar-leida": [notificacion: INotificacion]
    }>();

    const headers: { title: string }[] = [
        { title: "Asunto de la notificación" },
        { title: "Descripción" },
        { title: "Fecha" },
        { title: "Estado" },
    ];
</script>

<template lang="pug">
Table
    TableHeader
        TableRow
            TableHead
                Checkbox(:model-value="areAllSelected" @update:model-value="(value) => emit('toggle-all-notifications', value)")
            TableHead(v-for="header in headers") {{ header.title }}
    TableBody(v-auto-animate)
        TableRow(v-if="notificaciones?.length !== 0" v-for="notificacion, i in notificaciones", :key="notificacion.id" :class="`${i % 2 == 0 ? '' : 'bg-muted'}`")
            TableCell
                Checkbox(:model-value="selectedNotifications.has(notificacion.id)" @update:model-value="(state) => emit('toggle-notification', state, notificacion.id)")
            TableCell.flex.flex-row.items-center.gap-2
                div(class="relative")
                    Avatar(class="h-8 w-8 bg-muted border border-muted-foreground/40 shadow-lg")
                        AvatarImage(:src="String(notificacion.emisor.avatarUrl)")
                        AvatarFallback {{ notificacion.emisor.iniciales }}
                    img(:src="notificacion.tipo.icono" class="border shadow-xl absolute w-5 h-5 rounded-full bg-white p-1 -bottom-1 -right-1")
                span {{ notificacion.asunto }}
            TableCell
                p {{ notificacion.mensaje }}
            TableCell
                span {{ formatearFechaNotificacion(notificacion.createdAt.toString()) }}
            TableCell
                TooltipProvider
                    Tooltip
                        TooltipTrigger(as-child)
                            div.flex.flex-row.items-center.justify-center.cursor-pointer(@click="emit('marcar-leida', notificacion)")
                                Icon(name="tabler:circle-check" size=26 v-if="!notificacion.isLeido" class="text-muted-foreground")
                                Icon(name="tabler:circle-check-filled" size=26 v-else class="text-green")
                        TooltipContent(v-if="!notificacion.isLeido")
                            p Marcar como leída
        TableEmpty(v-else class="" :colspan="5")
            .flex.flex-col.items-center.justify-center.gap-2
                img(src="../../../assets/images/emptyNotificaciones.svg")
                h6.text-sm.text-muted-foreground No hay notificaciones
</template>
