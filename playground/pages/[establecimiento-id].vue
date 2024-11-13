<script lang="ts" setup>

const { $apis } = useNuxtApp()

const { data } = await useAsyncData('planificaciones', () => {
    return $apis.planificaciones.planificacion.getAll()
})

useNavbar().setHideCursos(true)
</script>

<template lang="pug">
NuxtLayout(name="dashboard")
    NuxtPage
</template>
