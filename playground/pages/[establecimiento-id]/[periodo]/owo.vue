<script setup lang="ts">
import { storeToRefs } from 'pinia';
const { isSuperAdmin } = storeToRefs(useAuthStore())

</script>

<template lang="pug">
    h1 h
</template>
