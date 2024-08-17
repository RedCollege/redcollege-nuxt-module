<script lang="ts" setup>

const props = defineProps({
    index: Number
})

</script>
<template lang="pug">
.grid.gap-2.py-4.p-6.relative.transition-colors(class="hover:bg-muted")
    .flex.gap-2.items-center
        .flex.gap-2.items-center
            .flex.h-4.w-4.bg-green.rounded-full.text-background.items-center(class="p-0.5")
                Icon(name="tabler:check")
            h5.text-sm.font-medium Cont. 01
        Separator(orientation="vertical")
        .max-w-40
            p.truncate.no-wrap.text-sm Título del contenido de la  planificacióm
    .flex.gap-2.items-center
        Badge(variant="outline")
            Icon.text-purple(name="tabler:heart-handshake", size="18")
        Badge(v-for="i in 3", variant="secondary")
            span.text-primary OA 01
    .flex.gap-4
        p.text-xs.text-muted-foreground 22/07 - 31/07
        p.text-xs.text-muted-foreground Clases: 1, 2, 3
    .bg-primary.w-1.absolute.top-0.bottom-0(v-if="index == 1")
</template>
