import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '../stores/authStore'

export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore()
    await authStore.init()
})
