<script lang="ts" setup>
</script>
<template lang="pug">
div.grid.gap-2
    PlanificacionesHeader
    .grid.grid-cols-8.gap-4
        .col-span-2
            Card
                CardHeader.py-2
                    .flex.justify-between.items-center
                        CardTitle Contenidos
                        Button(variant="link", size="icon")
                            Icon(name="tabler:plus")
                Separator
                CardContent.p-0
                    ScrollArea(class="h-[calc(100vh_-_230px)]")
                        .grid.divide-y
                            ContenidosCard(v-for="i in 20", :index="i")
        .col-span-6
            Card
                Tabs(default-value="contenido")
                    CardHeader.py-2
                        .flex.justify-center
                            TabsList
                                TabsTrigger(value="contenido") Contenido
                                TabsTrigger(value="dua") DUA
                                TabsTrigger(value="adecuacion") Adecuación Curricular
                                TabsTrigger(value="componentes") Componentes Curriculares
                    Separator
                    CardContent
                        TabsContent(value="contenido")
                            ContenidosSeccionContenido
                        TabsContent(value="dua")
                        TabsContent(value="adecuacion")
                        TabsContent(value="componentes")
</template>
