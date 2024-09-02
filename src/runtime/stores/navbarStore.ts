import { ref } from "#imports";
import { defineStore } from "pinia";

export const useNavbarStore = defineStore('navbar', () => {
    const hideCursos = ref(false)
    const hidePeriodos = ref(false)


    function setHideCursos(hide: boolean) {
        hideCursos.value = hide
    }

    function setHidePeriodos(hide: boolean) {
        hidePeriodos.value = hide
    }

    return {
        hideCursos,
        hidePeriodos,
        setHideCursos,
        setHidePeriodos
    }
})
