import { defineNuxtPlugin } from '#app'
import ConfettiExplosion from "vue-confetti-explosion";
export default defineNuxtPlugin((_nuxtApp) => {
    _nuxtApp.vueApp.component('ConfettiExplosion', ConfettiExplosion)
})
