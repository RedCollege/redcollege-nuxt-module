<script setup lang="ts">

const { $apis } = useNuxtApp()
const { data } = await useAsyncData('matriculas', () => {
    return $apis.comunicaciones.usuarioMensaje.getAll()
})

</script>

<template lang="pug">
    div 
        p Hola
</template>
