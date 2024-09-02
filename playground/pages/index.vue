<script setup lang="ts">
import { DateTime } from 'luxon'
import type { TUsuario } from '@redcollege/ui-nuxt-module/module';

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
