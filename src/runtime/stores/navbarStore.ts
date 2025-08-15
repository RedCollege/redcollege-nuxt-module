import { ref } from "#imports";
import { DateTime } from "luxon";
import { defineStore } from "pinia";

export const useNavbarStore = defineStore("navbar", () => {
    const hideCursos = ref(false);
    const hidePeriodos = ref(false);
    const hideEstablecimientos = ref(false);
    const hideNotificationsBell = ref(false);
    const selectedEstablecimientoId = ref(0);
    const selectedPeriodo = ref(0);

    function setHideCursos(hide: boolean) {
        hideCursos.value = hide;
    }

    function setHidePeriodos(hide: boolean) {
        hidePeriodos.value = hide;
    }

    function setHideEstablecimientos(hide: boolean) {
        hideEstablecimientos.value = hide;
    }

    function setHideNotificationsBell(hide: boolean) {
        hideNotificationsBell.value = hide;
    }

    function setSelectedEstablecimientoId(id: number) {
        selectedEstablecimientoId.value = id;
    }

    function setSelectedPeriodo(periodo: number) {
        selectedPeriodo.value = periodo;
    }

    return {
        hideCursos,
        hidePeriodos,
        hideEstablecimientos,
        hideNotificationsBell,
        setHideCursos,
        setHidePeriodos,
        setHideEstablecimientos,
        setHideNotificationsBell,
        setSelectedEstablecimientoId,
        selectedEstablecimientoId,
        selectedPeriodo,
        setSelectedPeriodo,
    };
});
