<script lang="ts" setup>
import { useNavbar, useSidebar } from  "../composables/states"
import { storeToRefs } from 'pinia'
const sidebar = useSidebar()
const navbarStore = useNavbar()
const { isOpen } = storeToRefs(sidebar)
const { hideCursos, hidePeriodos } = storeToRefs(navbarStore)

interface Props {
    logoUrl: string;
    titulo: string;
}

defineProps<Props>()
</script>

<template lang="pug">
div
    Sidebar
    main(class="min-h-[calc(100vh_-_0px)] bg-muted dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300", :class="[isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72']")
        Navbar(:logoUrl="logoUrl", :titulo="titulo", :hideCursos="hideCursos", :hidePeriodos="hidePeriodos")
        .container
            slot
</template>
