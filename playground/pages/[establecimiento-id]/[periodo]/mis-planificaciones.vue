<script setup lang="ts">
const { $apis } = useNuxtApp()
const { data } = await useAsyncData('matriculas',  () => {
    return $apis.curriculum.itemEntradaCurricular.delete(185568)
})

</script>

<template lang="pug">
h1 hola
</template>
