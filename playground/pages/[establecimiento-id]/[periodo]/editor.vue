<script lang="ts" setup>

const editorData = ref("")

</script>

<template lang="pug">
.container.mx-auto.py-4
    Card
        CardHeader
            CardTitle Editor
            CardDescription Ingresa el comunicado aqui
        CardContent
            ScrollArea(class="h-[calc(100vh_-_280px)]")
                .grid.gap-2
                    .min-h-32
                        Editor(v-model="editorData")
                    Button hola mundo
</template>
