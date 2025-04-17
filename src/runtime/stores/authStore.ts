import { ref } from 'vue'
import { defineStore } from 'pinia';
import type { IAuthUsuarioResponse } from '../models/Auth'
import type { IUsuario } from '../types/auth/usuario';
import type { IPeriodoEscolar } from '../models/Establecimiento/periodo_escolar'
import { navigateTo, useCookie, useNuxtApp, useRouter, useRuntimeConfig, useRoute } from '#app';
import { DateTime } from 'luxon'
import { useNotification } from '#imports';

export const useAuthStore = defineStore('auth', () => {

    const { $apis } = useNuxtApp()
    interface ITokenMainResponse {
        type: string;
        token: string;
    }

    interface ITokenAuthResponse {
        type: string;
        token: string;
    }

    interface IAuthMainResponse {
        estado: string;
        data: IAuthUsuarioResponse;
    }

    const { baseURL, redirectTo, redirectToAdmin } = useRuntimeConfig().public.redcollege
    const cookieDomain = process.env.NODE_ENV == 'production' ? '.redcollege.net' : 'localhost'
    const user = ref<IAuthUsuarioResponse>()
    const userId = useCookie<number>('userId', { domain: cookieDomain })
    const isLoggedIn = useCookie<boolean>('isLoggedIn', { domain: cookieDomain })
    const bearerToken = useCookie<string>('auth._token.local_redcollege', { domain: cookieDomain })
    const isSuperAdmin = ref(false)
    const isAdmin = ref(false)
    const isProfesor = ref(false)
    const periodosEstablecimiento = ref<IPeriodoEscolar[]>([])

    // Función de inicialización asíncrona
    async function init() {
        if (bearerToken.value && isLoggedIn.value && userId.value > 0) {
            try {
                await loadUser()
            } catch (error) {
                await logout()
            }
        }
    }

    async function login(correo: string, password: string): Promise<boolean> {
        try {
            const data = await $fetch<ITokenMainResponse>(`${baseURL}/auth/login`, {
                method: 'POST',
                body: {
                    correo: correo,
                    clave: password
                }
            });
            if (data) {
                bearerToken.value = `Bearer ${data.token}`
                await loadUser()
                return true
            }
            return false
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async function loginPasswordless(correo: string, password: string, correoUsuario: string) {
        try {
            const data = await $fetch<ITokenMainResponse>(`${baseURL}/auth/loginPasswordless`, {
                method: 'POST',
                body: {
                    correo: correo,
                    clave: password,
                    correoUsuario: correoUsuario
                }
            });
            if (data) {
                bearerToken.value = `Bearer ${data.token}`
                await loadUser()
                return true
            }
            return false
        } catch (e) {
            return false
        }
    }

    function updateAvatar(url: string) {
        if (user.value) {
            user.value.avatarUrl = url
        }
    }

    async function loadUser() {
        const route = useRoute();
        // Obtener el parámetro moveTo de la ruta actual
        const moveTo = route.query.moveTo as string | undefined;

        const usuario = await $fetch<IAuthUsuarioResponse>(`${baseURL}/auth/usuario/logged`, {
            method: 'GET',
            headers: {
                Authorization: bearerToken.value
            },
        });

        if (usuario) {
            isLoggedIn.value = true
            user.value = usuario
            userId.value = usuario.id

            //Setear los roles al store
            isAdmin.value = usuario.roles.some(r => r.nombre === 'Admin')
            isSuperAdmin.value = usuario.roles.some(r => r.nombre === 'SuperAdmin')
            isProfesor.value = usuario.roles.some(r => r.nombre === 'Profesor')

            const startEstablecimiento = user.value.establecimientos?.at(0)
            if (startEstablecimiento && Number(startEstablecimiento.id) > 0) {
                const periodos = await $fetch<IPeriodoEscolar[]>(`${baseURL}/establecimiento/periodos/${startEstablecimiento.id}`, {
                    headers: {
                        Authorization: bearerToken.value
                    }
                })

                if (periodos?.length > 0) {
                    periodosEstablecimiento.value = periodos

                    // Determinar el período actual de manera segura
                    let currentYear: number;
                    const currentPeriodo = periodos.find(p => p.periodo === DateTime.now().year);

                    if (currentPeriodo) {
                        currentYear = currentPeriodo.periodo;
                    } else if (periodos[0]?.periodo) {
                        currentYear = periodos[0].periodo;
                    } else {
                        currentYear = DateTime.now().year;
                    }

                    // Asegurarnos de que currentYear no sea 0
                    if (!currentYear || currentYear === 0) {
                        currentYear = DateTime.now().year;
                    }

                    // Si hay un parámetro moveTo, redirigir a esa ruta específica
                    if (moveTo) {
                        // Eliminar el slash inicial si existe para evitar rutas duplicadas
                        const formattedMoveTo = moveTo.startsWith('/') ? moveTo.substring(1) : moveTo;
                        return navigateTo(`/${startEstablecimiento.id}/${currentYear}/${formattedMoveTo}`);
                    }

                    // Si no hay moveTo, usar la redirección predeterminada
                    return navigateTo(`/${startEstablecimiento.id}/${currentYear}/${isAdmin.value || isSuperAdmin.value ? redirectToAdmin : redirectTo}`);
                }

                return navigateTo(`/${startEstablecimiento.id}/`);
            }

            return useRouter().push({
                name: 'index'
            });
        }
    }

    async function logout() {

        await $fetch(`${baseURL}/auth/logout`, {
            method: 'POST',
            headers: {
                Authorization: bearerToken.value
            },
        });

        user.value = {} as IAuthUsuarioResponse
        isLoggedIn.value = false
        userId.value = 0
        bearerToken.value = ""
        return useRouter().push({
            name: 'login'
        })
    }

    return {
        user, loadUser, logout, isLoggedIn, login, init, bearerToken,
        isAdmin, isSuperAdmin, isProfesor, loginPasswordless, updateAvatar,
        periodos: periodosEstablecimiento
    }
})
