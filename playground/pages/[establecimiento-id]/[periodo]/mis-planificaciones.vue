<script setup lang="ts">
const { $apis } = useNuxtApp()
const { data } = await useAsyncData('matriculas',  () => {
    return $apis.matriculas.matricula.getByEstablecimiento()
})

</script>

<template lang="pug">
h1 hola
pre {{ data }}
</template>
