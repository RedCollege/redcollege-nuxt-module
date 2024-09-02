<script setup lang="ts">
import { useRuntimeConfig } from '#app';

const { logoURL, nombreModulo } = useRuntimeConfig().public.redcollege

</script>

<template lang="pug">
div
    MainLayout(:logoUrl="logoURL", :titulo="nombreModulo")
        slot
</template>
