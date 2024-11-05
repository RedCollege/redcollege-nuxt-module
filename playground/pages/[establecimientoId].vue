<script lang="ts" setup>
useNavbar().setHideCursos(true)
</script>

<template lang="pug">
NuxtLayout(name="dashboard")
    div {{ useRoute().params }}
</template>
