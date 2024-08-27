<script lang="ts" setup>

const props = defineProps({
    index: Number
})

</script>
<template lang="pug">
.flex.gap-2.py-4.relative.transition-colors.items-center.group(class="hover:bg-muted")
    .grid.gap-2.px-6.grow
        .flex.gap-2.items-center
            TooltipProvider
                Tooltip(:delay-duration="100")
                    TooltipTrigger(as-child)
                        .flex.h-4.w-4.bg-green.rounded-full.text-background.items-center(class="p-0.5")
                            Icon(name="tabler:check")
                    TooltipContent
                        p Contenido cumplido
                h5.text-sm.font-medium Cont. 01
            Separator(orientation="vertical")
            TooltipProvider
                Tooltip(:delay-duration="100")
                    TooltipTrigger(as-child)
                        .max-w-40
                            p.truncate.no-wrap.text-sm Título del contenido de la  planificación
                    TooltipContent
                        p Título del contenido de la  planificación completa
        .flex.gap-2.items-center
            Badge(variant="outline")
                Icon.text-purple(name="tabler:heart-handshake", size="18")
            Badge(v-for="i in 3", variant="secondary")
                span.text-primary OA 01
        .flex.gap-4
            p.text-xs.text-muted-foreground 22/07 - 31/07
            p.text-xs.text-muted-foreground Clases: 1, 2, 3
    .flex-1.more-option.px-2
        DropdownMenu
            DropdownMenuTrigger
                Button(variant="icon", class="group-hover:opacity-100 opacity-0")
                    Icon(name="tabler:dots-vertical")
            DropdownMenuContent
                DropdownMenuLabel Menú
                DropdownMenuSeparator
                DropdownMenuItem.flex.gap-2.items-center
                    Icon(name="tabler:circle-check")
                    span Marcar como cumplido
                DropdownMenuItem.flex.gap-2.items-center
                    Icon(name="tabler:copy")
                    span Duplicar
                DropdownMenuItem.flex.gap-2.items-center
                    Icon(name="tabler:replace")
                    span Reemplazar
                DropdownMenuItem.flex.gap-2.items-center
                    Icon(name="tabler:lock")
                    span Deshabilitar
    .bg-primary.w-1.absolute.top-0.bottom-0(v-if="index == 1")
</template>
