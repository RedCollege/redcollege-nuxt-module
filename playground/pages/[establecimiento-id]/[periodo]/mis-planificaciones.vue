<script setup lang="ts">
const { $apis } = useNuxtApp()
const { data } = await useAsyncData('matriculas',  () => {
    return $apis.matriculas.matricula.getByEstablecimiento({
        establecimiento: 103,
        periodo: String(2024)
    })
})

</script>

<template lang="pug">
h1 hola
pre {{ data }}
</template>
