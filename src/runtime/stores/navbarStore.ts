import { ref } from "#imports";
import { DateTime } from 'luxon';
import { defineStore } from "pinia";

export const useNavbarStore = defineStore('navbar', () => {
    const currentPeriodo = DateTime.now().year
    const hideCursos = ref(false)
    const hidePeriodos = ref(false)
    const selectedEstablecimientoId = ref(0)
    const selectedPeriodo = ref(currentPeriodo)

    function setHideCursos(hide: boolean) {
        hideCursos.value = hide
    }

    function setHidePeriodos(hide: boolean) {
        hidePeriodos.value = hide
    }

    function setSelectedEstablecimientoId(id: number) {
        selectedEstablecimientoId.value = id
    }

    function setSelectedPeriodo(periodo: number) {
        selectedPeriodo.value = periodo
    }

    return {
        hideCursos,
        hidePeriodos,
        setHideCursos,
        setHidePeriodos,
        setSelectedEstablecimientoId,
        selectedEstablecimientoId,
        selectedPeriodo,
        setSelectedPeriodo
    }
})
