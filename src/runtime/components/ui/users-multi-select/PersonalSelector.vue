<script setup lang="ts">


</script>

<template lang="pug">
.grid.gap-2
    .flex.px-2.items-center.gap-2
        .relative.w-full.items-center
            Input#search(type="text" placeholder="Buscar por nombre..." class="pl-10")
            span.absolute.start-0.inset-y-0.flex.items-center.justify-center.px-2
                Icon.size-5.text-muted-foreground(name="tabler:search")
        Select
            SelectTrigger.w-32
                SelectValue(placeholder="Perfil")
            SelectContent
                SelectGroup
                    SelectLabel Niveles
                    SelectItem
    ScrollArea(class="h-64")
        .grid
            .flex.items-center.space-x-2.py-2.px-2.rounded(class="hover:bg-sky/5")
                Checkbox
                label.text-sm.font-medium.leading-none(class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70") Seleccionar todos
            .flex.justify-between.items-center.py-2.px-2.rounded(v-for="i in 20", class="hover:bg-sky/5")
                .flex.items-center.space-x-2
                    Checkbox
                    label.text-sm.font-medium.leading-none(class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70") 110 - 4C
                p.text-xs.text-gray-500 20 alumnos
</template>
