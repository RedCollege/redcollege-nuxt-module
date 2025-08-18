import { ref } from "#imports";
import { defineStore } from "pinia";
import type {
    INotificacion,
    INotificacionContadores,
} from "../models/Notificacion/notificacion";

export const useNotificacionStore = defineStore("notificacion", () => {
    const notificacion = ref<INotificacion | null>(null);
    const contadorNotificaciones = ref<INotificacionContadores>({
        noLeidas: 0,
        total: 0,
    });

    function setNotificacion(_notificacion: INotificacion) {
        notificacion.value = _notificacion;
    }

    function setContadores(contadores : INotificacionContadores) {
        contadorNotificaciones.value = contadores;
    }

    return {
        notificacion,
        contadorNotificaciones,
        setNotificacion,
        setContadores,
    };
});
