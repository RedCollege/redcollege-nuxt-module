import { defineNuxtPlugin } from '#app';
import { QuillyEditor } from 'vue-quilly'
import 'quill/dist/quill.snow.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('QuillyEditor', QuillyEditor);
});
