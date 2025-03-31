<script setup lang="ts">



const { $apis } = useNuxtApp()
const { data } = await useAsyncData('matriculas', () => {
    return $apis.comunicaciones.usuarioMensaje.getAll()
})

</script>

<template lang="pug">
Card.p-4
    p Test
    Progress.h-12(as-progress :model-value="50" variant="success" )
</template>
