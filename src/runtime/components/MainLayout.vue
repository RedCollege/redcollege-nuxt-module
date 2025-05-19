<script lang="ts" setup>
import { useNavbar, useSidebar } from  "../composables/states"
import { storeToRefs } from 'pinia'
import { ref, watch, onMounted } from 'vue';
import { useMagicKeys } from '@vueuse/core'
import { useAuthStore } from "../stores/authStore";
import { useDebugReportGenerator } from "../composables/useDebugReportGenerator";
import { useNuxtApp } from "#app";

const sidebar = useSidebar()
const navbarStore = useNavbar()
const { isOpen } = storeToRefs(sidebar)
const { hideCursos, hidePeriodos } = storeToRefs(navbarStore)
const isCommandOpen = ref(false)
const isModalStatusOpen = ref(false)
const { isSuperAdmin, user } = storeToRefs(useAuthStore())
const { copyDebugReportToClipboard } = useDebugReportGenerator()
const { $clientPosthog } = useNuxtApp();

interface Props {
    logoUrl: string;
    titulo: string;
}

defineProps<Props>()

const { Meta_B, Ctrl_B } = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (e.key === 'b' && (e.metaKey || e.ctrlKey))
            e.preventDefault()
    },
})

const handleOpenChange = () => {
    isCommandOpen.value = !isCommandOpen.value
}

const openStatusPlataforma = () => {
    isCommandOpen.value = false
    isModalStatusOpen.value = true
}

const generarReporte = async () => {
    await copyDebugReportToClipboard(false)
}

watch([Meta_B, Ctrl_B], (v) => {
    if (v[0] || v[1])
        handleOpenChange()
})

onMounted(() => {
    if(user.value){
        $clientPosthog?.identify(String(user.value.id), {
            correo: user.value.correo,
            nombre: user.value.nombreCompleto,
            establecimiento: user.value.establecimientos.length > 0 ? user.value.establecimientos.at(0)?.nombre : "Usuario Sin Establecimiento"
        })
    }
})

</script>

<template lang="pug">
div
    Sidebar(class="print:hidden")
    main(class="min-h-[calc(100vh_-_0px)] print:m-0 print:p-0 bg-muted print:bg-white dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300", :class="[isOpen === false ? 'lg:ml-[70px]' : 'lg:ml-72']")
        Navbar(class="print:hidden" :logoUrl="logoUrl", :titulo="titulo", :hideCursos="hideCursos", :hidePeriodos="hidePeriodos")
        div(class="container print:m-0 print:p-0 print:w-screen")
            slot
    template(v-if="isSuperAdmin")
        CommandDialog(v-model:open="isCommandOpen")
            CommandInput(placeholder="Busca alguno de los comandos disponibles")
            CommandList
                CommandEmpty No se encontraron resultados
                CommandGroup(heading="Debugging")
                    CommandItem(value="Ver Estadisticas de Plataforma", @click="openStatusPlataforma") Ver Estadísticas de Plataforma
                    CommandItem(value="Logs", @click="generarReporte") Copiar Logs De Reporte de Error

        Dialog(v-model:open="isModalStatusOpen")
            DialogScrollContent.w-96(class="lg:max-w-[796px]")
                UtilsHealth
</template>
