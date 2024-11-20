<script lang="ts" setup>
import { ref, storeToRefs } from '#imports';
import { useAuthStore } from '#imports';
const authStore = useAuthStore()
const { user, isLoggedIn } = storeToRefs(authStore)

const tipos : {  nombre: string  }[] = [
    {
        nombre: "planificacion_invitacion"
    },
    {
        nombre: "mensaje"
    },
    {
        nombre: "planificacion_mensaje"
    },
    {
        nombre: "planificacion_solicitud_acceso"
    }
]

const tipo = ref("planificacion_solicitud_acceso")

</script>

<template lang="pug">
.rounded-lg.p-2.border.border-transparent(class="hover:bg-card hover:border-border transition-colors duration-300 ease-in-out")
    .flex.gap-2
        Avatar(class="!h-8 !w-8")
            AvatarImage(:src="user.avatarUrl")
            AvatarFallback
        template(v-if="tipo === 'planificacion_mensaje'")
            div.grid.gap-1
                p.line-clamp-2.text-sm.text-popover-foreground Hailey Garza dejó un mensaje en Planificación Anual Diciembre
                .text-xs.flex.items-center.gap-2.text-muted-foreground
                    p 1 min. ago
                    Icon(name="tabler:point-filled", size="10")
                    p Easy 2023 Project
                .flex.gap-1
                    Badge(variant="outline") Planificación
                    Badge(variant="secondary") Monitoreo
            .text-primary
                Icon(name="tabler:point-filled", size="20")
        template(v-else-if="tipo === 'planificacion_solicitud_acceso'")
            div.grid.gap-1
                p.line-clamp-2.text-sm.text-popover-foreground Hailey Garza solicitó acceso a Planificación Anual Diciembre
                .text-xs.flex.items-center.gap-2.text-muted-foreground
                    p 1 min. ago
                    Icon(name="tabler:point-filled", size="10")
                    p Easy 2023 Project
                .flex.gap-1
                    Badge(variant="outline") Planificación
                    Badge(variant="secondary") Solicitud
            .text-primary
                Icon(name="tabler:point-filled", size="20")
        template(v-else-if="tipo === 'planificacion_invitacion'")
            div.grid.gap-1
                p.line-clamp-2.text-sm.text-popover-foreground Hailey Garza te invito a colaborar en Planificación Anual Diciembre
                .text-xs.flex.items-center.gap-2.text-muted-foreground
                    p 1 min. ago
                    Icon(name="tabler:point-filled", size="10")
                    p Easy 2023 Project
                .flex.gap-1
                    Badge(variant="outline") Planificación
                    Badge(variant="secondary") Invitación
            .text-primary
                Icon(name="tabler:point-filled", size="20")
</template>
