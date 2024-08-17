import { defineNuxtPlugin } from '#app'
import { FlexRender } from '@tanstack/vue-table'
export default defineNuxtPlugin((_nuxtApp) => {
    _nuxtApp.vueApp.component('FlexRender', FlexRender)
})
