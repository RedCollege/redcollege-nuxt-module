<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useNotification, useRouter } from '#imports';
import { useMagicKeys } from '@vueuse/core'

const emit = defineEmits(['successLogin'])
const correo = ref("")
const password = ref("")
const authStore = useAuthStore()
const isLoginLoading = ref(false)
const showErrorMessage = ref(false)
const open = ref(false)



const { Meta_B, Ctrl_B } = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (e.key === 'b' && (e.metaKey || e.ctrlKey))
            e.preventDefault()
    },
})

watch([Meta_B, Ctrl_B], (v) => {
    if (v[0] || v[1])
        handleOpenChange()
})

function handleOpenChange() {
    open.value = !open.value
}

async function login() {
    isLoginLoading.value = true
    showErrorMessage.value = false
    try {

        const isLogged = await authStore.login(correo.value, password.value)
        if (isLogged) {
            showErrorMessage.value = false
            emit('successLogin')
        } else {
            showErrorMessage.value = true
            isLoginLoading.value = false
        }
    } catch (e) {
        console.log(e);
    }
}



const redirect = () => {
    useRouter().push('/login-admin')
}

</script>

<template lang="pug">
div.w-full.bg-muted.relative.h-screen.place-items-center.overflow-hidden
    .absolute.top-0.bottom-0.left-0.right-0
        Tetris(class="w-full h-full [mask-image:radial-gradient(550px_circle_at_center,#00C16A,transparent)]", :base="15", square-color="#0369a1")
    .relative.container.h-full.z-1(class="lg:grid  lg:grid-cols-6")
        div.flex.items-center.justify-center.py-12.h-screen(class="lg:h-full lg:col-span-2")
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
                    Button.w-full.flex.gap-2(type="submit")
                        Loader.w-4.h-4.mr-2.animate-spin(v-if="isLoginLoading")
                        span Iniciar Sesión
                    p.text-center.text-sm.text-red-500.font-medium(v-if="showErrorMessage")  Credenciales incorrectas
                div.mt-4.text-center.text-sm
                    | ¿Aún no eres partes de RedCollege?
                    a.underline(href="https://www.redcollege.cl/") Contáctanos
        div.hidden.h-screen(class="lg:block lg:col-span-4")
            div.flex.justify-center.items-center.h-full
                img(src="https://nido.redcollege.net/_nuxt/bgLogin.QiXsjYcd.svg" alt="Image"  class="object-cover dark:brightness-[0.2] dark:grayscale")
    CommandDialog(v-model:open="open")
        CommandInput(placeholder="Busca alguno de los comandos disponibles")
        CommandList
            CommandEmpty No se encontraron resultados
            CommandGroup(heading="Accesos Rápidos")
                CommandItem(value="Login SuperAdmin", @click="redirect") Login SuperAdmin
            CommandGroup(heading="Debugging")
                CommandItem(value="Logs", :disabled="true") Copiar Logs
</template>
