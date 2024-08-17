<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSidebar } from "../../composables/states";

const sidebar = useSidebar()
const { isOpen } = storeToRefs(sidebar)

const rotateIcon = computed(() => {
    return isOpen.value === false ? 'rotate-180' : 'rotate-0'
})

function updateState(){
    sidebar.updateState(!isOpen.value)
}

</script>

<template lang="pug">
aside(class="fixed bg-background top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300", :class="[ isOpen ? 'w-72' : 'w-[90px]' ]")
    .invisible(class="lg:visible absolute top-[12px] -right-[16px] z-20")
        Button(class="w-8 h-8 p-2 text-sky-700", variant="outline", @click="updateState")
            Icon.h-4.w-4.transition-transform.ease-in-out.duration-700(:class="rotateIcon", name="tabler:chevron-left")
    .relative.h-full.flex.flex-col.px-3.py-4.overflow-y-auto.shadow-md(class="dark:shadow-zinc-800")
        SidebarMenu(:isOpen="isOpen")
</template>
