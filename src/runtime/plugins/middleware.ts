import { addRouteMiddleware, defineNuxtPlugin, navigateTo, useRoute, useRuntimeConfig } from "#app";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { DateTime } from 'luxon';

export default defineNuxtPlugin(() => {
    const { redirectTo, redirectToAdmin, shouldRedirect } = useRuntimeConfig().public.redcollege;

    addRouteMiddleware('auth', (to, from) => {
        const route = useRoute();
        const { isLoggedIn, periodos, bearerToken, isAdmin, isSuperAdmin, isProfesor, user } = storeToRefs(useAuthStore());
        const excludedRoutes: string[] = ["/login-admin"];

        // Obtener el parámetro moveTo si existe
        const moveTo = to.query.moveTo as string | undefined;

        // Omite el middleware para las rutas excluidas
        if (excludedRoutes.includes(to.path)) {
            return;
        }

        // Redirigir a la página principal si el usuario está logueado e intenta acceder a /login
        if (bearerToken.value && to.path === '/login') {
            return navigateTo('/');
        }

        // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
        if (!bearerToken.value && to.path !== '/login') {
            // Conservar el parámetro moveTo en la redirección al login
            const loginQuery = moveTo ? { moveTo } : {};
            return navigateTo({ path: '/login', query: loginQuery });
        }

        if (bearerToken.value && shouldRedirect && to.name === 'index') {
            const establecimiento = user.value?.establecimientos?.at(0);

            // Asegurar que currentYear tenga un valor válido
            let currentYear: number;

            if (periodos.value && periodos.value.length > 0 && periodos.value[0]?.periodo) {
                currentYear = periodos.value[0].periodo;
            } else {
                // Si no hay periodos válidos, usar el año actual como respaldo
                currentYear = DateTime.now().year;
            }

            // Asegurarnos de que currentYear no sea 0
            if (!currentYear || currentYear === 0) {
                currentYear = DateTime.now().year;
            }

            if (establecimiento) {
                // Si hay un parámetro moveTo, redirigir a esa ruta específica
                if (moveTo) {
                    // Eliminar el slash inicial si existe para evitar rutas duplicadas
                    const formattedMoveTo = moveTo.startsWith('/') ? moveTo.substring(1) : moveTo;
                    return navigateTo(`/${establecimiento.id}/${currentYear}/${formattedMoveTo}`);
                }

                // Si no hay moveTo, redirigir según el rol del usuario
                return navigateTo(`/${establecimiento.id}/${currentYear}/${isAdmin.value || isSuperAdmin.value ? redirectToAdmin : redirectTo}`);
            }
        }

        // Procesar el parámetro moveTo para otras rutas cuando el usuario ya está autenticado
        if (bearerToken.value && moveTo && to.path !== '/login') {
            const establecimiento = user.value?.establecimientos?.at(0);

            if (establecimiento) {
                // Determinar el año actual de manera segura
                let currentYear: number;

                if (periodos.value && periodos.value.length > 0 && periodos.value[0]?.periodo) {
                    currentYear = periodos.value[0].periodo;
                } else {
                    currentYear = DateTime.now().year;
                }

                // Asegurarnos de que currentYear no sea 0
                if (!currentYear || currentYear === 0) {
                    currentYear = DateTime.now().year;
                }

                // Eliminar el slash inicial si existe para evitar rutas duplicadas
                const formattedMoveTo = moveTo.startsWith('/') ? moveTo.substring(1) : moveTo;
                return navigateTo(`/${establecimiento.id}/${currentYear}/${formattedMoveTo}`);
            }
        }
    },
        { global: true });
});
