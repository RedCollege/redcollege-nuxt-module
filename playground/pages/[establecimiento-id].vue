<script lang="ts" setup>

const { $apis } = useNuxtApp()

const { data } = await useAsyncData('planificaciones', () => {
    return $apis.planificaciones.planificacion.getAll()
})

useNavbar().setHideCursos(true)
</script>

<template lang="pug">
NuxtLayout(name="dashboard")
    .w-32.h-32.bg-card-foreground
    pre {{ data.data }}
    div {{ useRoute().params }}
</template>
