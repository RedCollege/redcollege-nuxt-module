import { addRouteMiddleware, defineNuxtPlugin, navigateTo, useRuntimeConfig } from "#app";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { DateTime } from 'luxon'

export default defineNuxtPlugin(() => {
    const { redirectTo, redirectToAdmin, shouldRedirect } = useRuntimeConfig().public.redcollege
    addRouteMiddleware('auth', (to, from) => {
        const { isLoggedIn, isAdmin, isSuperAdmin, isProfesor, user } = storeToRefs(useAuthStore())

        const excludedRoutes = ["/login-admin"];

        // Omite el middleware para las rutas excluidas
        if (excludedRoutes.includes(to.path)) {
            return;
        }

        // Redirigir a la página principal si el usuario está logueado e intenta acceder a /login
        if (isLoggedIn.value && to.path === '/login') {
            return navigateTo('/')
        }

        // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
        if (!isLoggedIn.value && to.path !== '/login') {
            return navigateTo('/login')
        }

        if(isLoggedIn.value && shouldRedirect && to.name === 'index'){
            const establecimiento = user.value?.establecimientos?.at(0)
            const currentYear =  DateTime.now().year

            if(establecimiento){
                return navigateTo(`/${establecimiento.id}/${currentYear}/${ isAdmin.value || isSuperAdmin.value ? redirectToAdmin : redirectTo }`)
            }
        }

    },
        { global: true }
    )
})
