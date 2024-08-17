<script lang="ts" setup>
import { useSidebar } from  "../composables/states"
import { storeToRefs } from 'pinia'
const sidebar = useSidebar()
const { isOpen } = storeToRefs(sidebar)
</script>

<template lang="pug">
div
    Sidebar
    main(class="min-h-[calc(100vh_-_0px)] bg-muted dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300", :class="[isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72']")
        Navbar(logoUrl="https://redcollege.nyc3.digitaloceanspaces.com/docs/components/planificaciones-logo.svg", titulo="Planificaciones")
        .container
            slot
</template>
