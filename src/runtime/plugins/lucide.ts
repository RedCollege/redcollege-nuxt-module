import { defineNuxtPlugin } from '#app'
import { Loader2 } from 'lucide-vue-next'
export default defineNuxtPlugin((_nuxtApp) => {
    _nuxtApp.vueApp.component('Loader', Loader2)
})
