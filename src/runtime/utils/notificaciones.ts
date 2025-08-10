import { DateTime } from "luxon";

export const formatearFecha = (fecha: string): string => {
    let fechaObj = DateTime.fromISO(fecha, { zone: "UTC" }).setLocale("es");
    const hoy = DateTime.now().setLocale("es");
    const ayer = hoy.minus({ days: 1 });
    if (fechaObj.hasSame(hoy, "day")) {
        return "Hoy";
    } else if (fechaObj.hasSame(ayer, "day")) {
        return "Ayer";
    } else {
        const fechaFormateada = fechaObj.toFormat("MMM, dd yyyy");
        return (
            fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1)
        );
    }
};

export const formatearFechaNotificacion = (fecha: string): string => {
    const fechaNotificacion = new Date(fecha);
    const ahora = new Date();
    const diferenciaMs = ahora.getTime() - fechaNotificacion.getTime();
    const diferenciaMinutos = Math.floor(diferenciaMs / (1000 * 60));

    if (diferenciaMinutos < 60) {
        return `hace ${diferenciaMinutos} min`;
    }

    return fechaNotificacion
        .toLocaleString("es-CL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        .replace(/-/g, "/")
        .replace(",", " -");
};
