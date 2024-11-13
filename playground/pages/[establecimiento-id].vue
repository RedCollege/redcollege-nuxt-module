<script lang="ts" setup>

const { $apis } = useNuxtApp()


useNavbar().setHideCursos(true)
</script>

<template lang="pug">
NuxtLayout(name="dashboard")
    NuxtPage
</template>
