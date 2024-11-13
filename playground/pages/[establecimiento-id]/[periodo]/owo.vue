<script setup lang="ts">
import { storeToRefs } from 'pinia';
const { isSuperAdmin } = storeToRefs(useAuthStore())
console.log(isSuperAdmin.value)
</script>

<template lang="pug">
    h1 h
</template>
