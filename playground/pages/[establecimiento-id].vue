<script lang="ts" setup>
useNavbar().setHideCursos(true)
</script>

<template lang="pug">
NuxtLayout(name="dashboard")
    .w-32.h-32.bg-card-foreground
    div {{ useRoute().params }}
</template>
