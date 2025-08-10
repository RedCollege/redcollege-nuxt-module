<script setup lang="ts">
    import { useAsyncData, useNuxtApp } from '#app';
    import { ref } from 'vue';
    import type { INotificacionContadores } from '../../models/Notificacion/notificacion';

    const isOpen = ref<boolean>(false);

    const { notificacion } = useNuxtApp().$apis.notificacion;

    const { data: contador } = await useAsyncData<INotificacionContadores>(async () => {
        const result = await notificacion.obtenerContadores();
        return result;
    });

    const abrirNotificaciones = () => (isOpen.value = true);

    const decrementarContadorNoLeidas = () => {
        if (contador.value)
            contador.value = {
                noLeidas: contador.value?.noLeidas - 1,
                total: contador.value?.total
            }
    }
</script>

<template lang="pug">
    BadgeCounter(:total="contador?.noLeidas")
        Button(variant="ghost" size="icon" @click="abrirNotificaciones")
            Icon.text-primary(name="tabler:bell")
    NotificacionesContainer(v-model:is-open="isOpen" :contador="contador" @decrementar-contador-no-leidas="decrementarContadorNoLeidas")
</template>
