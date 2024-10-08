import { ref } from 'vue'
import { defineStore } from 'pinia';
import type { IAuthUsuarioResponse } from '../models/Auth'
import type { IUsuario } from '../types/auth/usuario';
import { useCookie, useRouter, useRuntimeConfig } from '#app';

export const useAuthStore = defineStore('auth', () => {

    interface ITokenMainResponse {
        type: string;
        token: string;
    }

    interface ITokenAuthResponse  {
        type: string;
        token: string;
    }

    interface IAuthMainResponse {
        estado: string;
        data: IAuthUsuarioResponse;
    }

    const { baseURL } = useRuntimeConfig().public.redcollege
    const user = ref<IUsuario>()
    const userId = useCookie<number>('userId')
    const isLoggedIn = useCookie<boolean>('isLoggedIn')
    const bearerToken = useCookie<string>('auth._token.local')

    // Función de inicialización asíncrona
    async function init() {
        console.log("Inicializando store")
        if(bearerToken.value && isLoggedIn.value && userId.value > 0){
            try {
                await loadUser()
            } catch (error) {
                await logout()
            }
        }
    }

    async function login(correo: string, password: string){
        const data = await $fetch<ITokenMainResponse>(`${baseURL}/auth/login`, {
            method: 'POST',
            body: {
                correo: correo,
                clave: password
            }
        });

        if(data){
            bearerToken.value = `Bearer ${data.token}`
            await loadUser()
        }

    }

    async function loadUser(){
        const usuario = await $fetch<IUsuario>(`${baseURL}/auth/usuario/logged`, {
            method: 'GET',
            headers: {
                Authorization: bearerToken.value
            },
        });

        if(usuario){
            isLoggedIn.value = true
            user.value = usuario
            userId.value = usuario.id
            return useRouter().push({
                name: 'index'
            })
        }
    }

    async function logout(){

        await $fetch(`${baseURL}/auth/logout`, {
            method: 'POST',
            headers: {
                Authorization: bearerToken.value
            },
        });

        user.value = {} as IUsuario
        isLoggedIn.value = false
        userId.value = 0
        bearerToken.value = ""
        return useRouter().push({
            name: 'login'
        })
    }

    return {
        user, loadUser, logout, isLoggedIn, login, init, bearerToken
    }
})
