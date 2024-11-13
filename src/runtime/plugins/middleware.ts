import { addRouteMiddleware, defineNuxtPlugin, navigateTo } from "#app";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";

export default defineNuxtPlugin(() => {
    addRouteMiddleware('auth', (to, from) => {
        const { isLoggedIn } = storeToRefs(useAuthStore())

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
    },
        { global: true }
    )
})
