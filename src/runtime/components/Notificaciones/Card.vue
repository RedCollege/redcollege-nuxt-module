<script lang="ts" setup>
    import { useNuxtApp, useRouter } from "#imports";
    import type { INotificacion } from "@/src/runtime/models/Notificacion/notificacion";
    import { formatearFechaNotificacion } from "../../utils/notificaciones";

    const { notificacion: notificacionModule } = useNuxtApp().$apis.notificacion;

    const props = defineProps<{
        notificacion: INotificacion;
    }>();

    const emit = defineEmits<{
        "notificacion-leida": [notificacionId: number];
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
        window.open(`${props.notificacion.tipo.baseUrl}${props.notificacion.finalUrl}`, "_blank")
    }

</script>

<template lang="pug">
.flex.flex-row.items-center.p-2.pr-4.gap-4(:class="`border-y border-y-muted-foreground/5 cursor-pointer hover:bg-primary/10 transition-colors duration-100 ease-in-out ${!props.notificacion.isLeido ? 'bg-white' : 'bg-transparent'}`" @click="marcarComoLeidoRedireccion")
    Avatar(class="h-16 w-16 bg-white border border-muted-foreground/40")
        AvatarImage(:src="notificacion.tipo.icono" class="scale-50 bg-white overflow-visible")

    div(class="flex-1 flex flex-col gap-0.5")
        div(class="truncate flex-1 max-w-[380px]").font-semibold 
            span {{ notificacion.asunto }}
        p(class="text-justify break-words ") {{ notificacion.mensaje }}
        div.flex.flex-row.items-center.gap-2
            small(class="font-medium text-muted-foreground") {{ formatearFechaNotificacion(notificacion.createdAt.toString()) }}
            div(class="rounded-full w-3 h-3 bg-green" v-if="!notificacion.isLeido")
    div(@click="(e) => { e.stopPropagation(); marcarComoLeido() }")
        Icon(name="tabler:circle-check" size=26 v-if="!notificacion.isLeido" class="text-muted-foreground")
        Icon(name="tabler:circle-check-filled" size=26 v-else class="text-green")
</template>
