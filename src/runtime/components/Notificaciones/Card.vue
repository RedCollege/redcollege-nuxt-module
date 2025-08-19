<script lang="ts" setup>
import { useNuxtApp, navigateTo } from "#imports";
import type { INotificacion } from "@/src/runtime/models/Notificacion/notificacion";
import { formatearFechaNotificacion } from "../../utils/notificaciones";

const { notificacion: notificacionModule } = useNuxtApp().$apis.notificacion;

const props = defineProps<{
    notificacion: INotificacion;
}>();

const emit = defineEmits<{
    "notificacion-leida": [notificacionId: number];
    "update:is-open": [value: boolean];
}>();

const marcarComoLeido = async () => {
    if (props.notificacion.isLeido) return;
    try {
        await notificacionModule.marcarLeida(props.notificacion.id);
        emit("notificacion-leida", props.notificacion.id);
    } catch (e) {
        console.log(e);
    }
};

const marcarComoLeidoRedireccion = async () => {
    await marcarComoLeido()
    if (props.notificacion.plantilla.requiereEmisor) {
        emit("update:is-open", false)
        await navigateTo(`${props.notificacion.tipo.baseUrl}?moveTo=${props.notificacion.finalUrl}`, { external: true })
    }
}

</script>

<template lang="pug">
.flex.flex-row.items-center.p-2.pr-4.gap-4.px-6(:class="`border-y border-y-muted-foreground/5 cursor-pointer hover:bg-primary/10 transition-colors duration-100 ease-in-out ${!props.notificacion.isLeido ? 'bg-primary/5 ' : 'bg-transparent'}`" @click="marcarComoLeidoRedireccion")
    .relative
        Avatar(class="h-14 w-14 bg-muted border border-muted-foreground/20 shadow-xl")
            AvatarImage(:src="String(notificacion.emisor.avatarUrl)")
            AvatarFallback(class="text-xl") {{ notificacion.emisor.iniciales }}
        img(:src="notificacion.tipo.icono" class="border shadow-xl absolute w-6 h-6 rounded-full bg-white p-1 -bottom-1 -right-1")

    div(class="flex-1")
        div(class="font-semibold max-w-[360px]")
            h6.text-sm.truncate {{ notificacion.asunto }}
        p.text-xs(class="break-words") {{ notificacion.mensaje }}  
        div.flex.flex-row.items-center.gap-2
            small(class="font-medium text-muted-foreground") {{ formatearFechaNotificacion(notificacion.createdAt.toString()) }}
            div(class="rounded-full w-2 h-2 bg-green mt-0.5" v-if="!notificacion.isLeido")
    TooltipProvider
        Tooltip
            TooltipTrigger(as-child)
                div(@click="(e) => { e.stopPropagation(); marcarComoLeido() }")
                    Icon(name="tabler:circle-check" size=26 v-if="!notificacion.isLeido" class="text-muted-foreground")
                    Icon(name="tabler:circle-check-filled" size=26 v-else class="text-green")
            TooltipContent(v-if="!notificacion.isLeido")
                p Marcar como leída
</template>
