import { defineStore } from 'pinia';
import { ref } from 'vue'
import type { MenuGroup } from '../types/components/sidebar';

export const useSidebarStore = defineStore('sidebar', () => {

    const isOpen = ref(false)
    const menuList = ref<MenuGroup[]>([])

    function updateState(newOpenState: boolean){
        isOpen.value = newOpenState
    }

    function setMenuList(menuLinks: MenuGroup[]){
        menuList.value = menuLinks
    }

    return {
        isOpen, updateState, menuList, setMenuList
    }
})
