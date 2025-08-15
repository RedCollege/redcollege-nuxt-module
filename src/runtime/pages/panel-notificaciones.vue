<script setup lang="ts">
    import { onMounted, onUnmounted, ref, useNavbar } from '#imports';
    const navbar = useNavbar()

    const hideCursos = ref<boolean>(navbar.hideCursos)
    const hidePeriodos = ref<boolean>(navbar.hidePeriodos)
    const hideEstablecimientos = ref<boolean>(navbar.hideEstablecimientos)
    const hideNotificationsBell = ref<boolean>(navbar.hideNotificationsBell)

    onMounted(()=>{
        navbar.setHideCursos(true)
        navbar.setHidePeriodos(true)
        navbar.setHideEstablecimientos(true)
        navbar.setHideNotificationsBell(true)
    })

    onUnmounted(()=>{
        navbar.setHideCursos(hideCursos.value)
        navbar.setHidePeriodos(hidePeriodos.value)
        navbar.setHideEstablecimientos(hideEstablecimientos.value)
        navbar.setHideNotificationsBell(hideNotificationsBell.value)
    })
</script>
<template lang="pug">
section
    NuxtLayout(name="dashboard")
        .py-4
            NotificacionesPanel
</template>