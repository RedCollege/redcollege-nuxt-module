<script lang="ts" setup>

const { $apis } = useNuxtApp()


useNavbar().setHideCursos(true)
</script>

<template lang="pug">
div
    NuxtLayout(name="dashboard")
        NuxtPage
</template>
