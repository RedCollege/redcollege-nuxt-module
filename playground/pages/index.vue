<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
    <NuxtLayout name="dashboard">
        <div class="my-2">
            <!--<IAButton></IAButton>-->
            <ContenidosMain />
            <PlanificacionesTable />
        </div>
    </NuxtLayout>
</template>
