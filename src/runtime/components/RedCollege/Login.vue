<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from "../../stores/authStore";

const emit = defineEmits(['successLogin'])
const correo = ref("")
const password = ref("")
const correoUsuario = ref("")
const authStore = useAuthStore()
const isLoginLoading = ref(false)
const showErrorMessage = ref(false)

async function login() {
    isLoginLoading.value = true
    const isLogged = await authStore.loginPasswordless(correo.value, password.value, correoUsuario.value)
    if(isLogged){
        showErrorMessage.value = false
        emit('successLogin')
    }else{
        showErrorMessage.value = true
        isLoginLoading.value = false
    }
}

</script>

<template lang="pug">
div.w-full.bg-muted.relative
    .container(class="lg:grid  lg:grid-cols-6 ")
        div.flex.items-center.justify-center.py-12(class="lg:col-span-2")
            div.mx-auto.grid(class="gap-6")
                div.grid.gap-2.text-center
                    .flex.justify-center
                        img(src="https://www.redcollege.cl/wp-content/uploads/2023/07/LOGO-300x54.png", width="200")
                    h1.text-3xl.font-bold.text-sky-900
                        span ¡Nos encanta verte! 👋
                    p.text-balance.text-muted-foreground Por favor ingrese sus credenciales.
                form.grid.gap-4(@submit.prevent="login")
                    div.grid.gap-2
                        Label(for="email") Correo
                        Input#email(type="email" v-model="correo" placeholder="m@micolegio.com" required)
                    div.grid.gap-2
                        div.flex.items-center
                            Label(for="password") Contraseña
                            a.ml-auto.inline-block.text-sm.underline(href="https://login.redcollege.net/recover") ¿Olvidaste tu contraseña?
                        Input#password(type="password" v-model="password" required)
                    Separator
                    div.grid.gap-2
                        Label(for="email") Correo del Usuario
                        Input#email(type="email" v-model="correoUsuario" placeholder="m@micolegio.com" required)
                    Button.w-full.flex.gap-2(type="submit")
                        Loader.w-4.h-4.mr-2.animate-spin(v-if="isLoginLoading")
                        span Iniciar Sesión
                    p.text-center.text-sm.text-red-500.font-medium(v-if="showErrorMessage") Usted no tiene acceso o las credenciales son incorrectas
                div.mt-4.text-center.text-sm
                    | ¿Aún no eres partes de RedCollege?
                    a.underline(href="https://www.redcollege.cl/") Contáctanos
        div.hidden.h-screen(class="lg:block lg:col-span-4")
            div.flex.justify-center.items-center.h-full
                img(src="https://nido.redcollege.net/_nuxt/bgLogin.QiXsjYcd.svg" alt="Image"  class="object-cover dark:brightness-[0.2] dark:grayscale")
    .absolute.bottom-0.left-0.right-0.h-8.bg-sky-700
</template>
