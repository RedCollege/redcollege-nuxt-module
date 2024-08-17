<template lang="pug">
Card
    CardContent.py-4
        .flex.justify-between
            .flex.gap-2.items-center
                Icon.text-primary(name="tabler:arrow-left")
                div
                    h6.text-sm Nombre de la planificación
                    div.flex.gap-2.items-center
                        p.text-sm.text-muted-foreground 2 Enseñanza Básica A - Matemática
                        span.text-sm.text-muted-foreground /
                        a.text-primary.text-sm.font-medium(variant="link") Unidad 01
            .flex.gap-2
                Tabs(default-value="dua")
                    .flex.justify-center
                        TabsList
                            TabsTrigger(value="contenido") Unidad
                            TabsTrigger(value="dua") Contenidos
                            TabsTrigger(value="adecuacion") Cronograma
                            TabsTrigger(value="componentes") Adecuación

</template>
