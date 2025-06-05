<script setup lang="ts">

const { periodo, establecimientoid } = useRoute().params
const selectedUsers = ref([])
</script>

<template lang="pug">
div
    UsersMultiSelect(placeholder="Buscar usuarios", v-model="selectedUsers", :options="[]" :periodo="Number(periodo)", :establecimiento-id="Number(establecimientoid)")
</template>
