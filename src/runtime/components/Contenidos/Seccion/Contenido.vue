<template lang="pug">
.grid.grid-cols-8.items-center.gap-2
    .col-span-2
        div
            Label(for="fecha") Fecha planificada
            Input
    .col-span-5
        div
            Label Clases donde se aplicará este contenido
            ContenidosSeccionContenidoClasesMultiSelect
    .col-span-1
    .col-span-8
        div
            Label(for="fecha") Título
            Input
    .col-span-8
        div
            Label(for="fecha") Contenido planificado de la clase
            Textarea
    .col-span-8
        div
            Label(for="fecha") Actividades a implementar
            Textarea
    .col-span-8
        div
            Label(for="fecha") Evaluación
            Textarea
    .col-span-8
        div
            Label Componentes Curriculares
            ContenidosSeccionContenidoClasesMultiSelect
    .col-span-8
        div
            Label(for="fecha") Indicadores de logros
            Textarea
    .col-span-8
        div
            Label Recursos
            ContenidosSeccionContenidoClasesMultiSelect
</template>
