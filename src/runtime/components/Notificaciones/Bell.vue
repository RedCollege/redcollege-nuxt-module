<script setup lang="ts">
import { useNuxtApp } from "#app";
import { onMounted, ref } from "vue";
import { useNotificacion } from "../../composables/useNotificacion";
import { useNotificacionStore } from "../../stores/notificacionStore";
import { storeToRefs } from "pinia";

const isOpen = ref<boolean>(false);

const { notificacion } = useNuxtApp().$apis.notificacion;

const { subscribe } = useNotificacion()

const notificacionStore = useNotificacionStore()
const {contadorNotificaciones } = storeToRefs(notificacionStore)
const {setContadores} = notificacionStore

const abrirNotificaciones = () => (isOpen.value = true);

onMounted(async () => {
    await notificacion.obtenerContadores().then((contadores)=>{
        setContadores(contadores)
    })
    await subscribe()
});
</script>

<template lang="pug">
    BadgeCounter(:total="contadorNotificaciones.noLeidas")
        Button(variant="ghost" size="icon" @click="abrirNotificaciones")
            Icon.text-primary(name="tabler:bell" class="scale-125")
    NotificacionesContainer(v-model:is-open="isOpen" :contador="contadorNotificaciones")
</template>
