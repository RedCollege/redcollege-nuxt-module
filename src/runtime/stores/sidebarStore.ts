import { defineStore } from 'pinia';
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {

    const isOpen = ref(false)

    function updateState(newOpenState: boolean){
        isOpen.value = newOpenState
    }

    return {
        isOpen, updateState
    }
})
