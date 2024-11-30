<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { applicationModules as modules } from '../config/modules'
import type { IPeriodoEscolar } from '../models'
//import type { ICursoEstablecimientoResponse } from '../models/Curso'
import { useAuthStore } from '../stores/authStore'
import { useRuntimeConfig, useRoute, useRouter, useNuxtApp } from '#app'
import { useNavbar } from '../composables/states'

interface Props {
    logoUrl: string,
    titulo: string,
    hideCursos?: boolean,
    hidePeriodos?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    logoUrl: '',
    titulo: '',
    hideCursos: false,
    hidePeriodos: false,
})

const { $apis } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const selectedEstablecimientoId = ref("")
const selectedPeriodoId = ref("")
const selectedCursoId = ref("")
const authStore = useAuthStore()
const { user, isLoggedIn } = storeToRefs(authStore)
const { redirectTo } = useRuntimeConfig().public.redcollege
const periodos = ref<Array<IPeriodoEscolar>>([])
//const cursos = ref<Array<ICursoEstablecimientoResponse>>([])

const arePeriodosLoaded = ref(false)
const areCursosLoaded = ref(false)

const emit = defineEmits(['sucessLogout', 'selectedFilters'])

// Función para actualizar la ruta
const updateRoute = (establecimientoId: string, periodoId: string) => {
    if (establecimientoId) {
        const currentPath = route.path
        const pathParts = currentPath.split('/')

        // Si estamos en la ruta inicial o solo con establecimiento
        if (pathParts.length <= 2) {
            const newPath = periodoId
                ? `/${establecimientoId}/${periodoId}/${redirectTo}`
                : `/${establecimientoId}/0`

            if (currentPath !== newPath) {
                router.push(newPath)
            }
        } else {
            // Si estamos en una subruta (ej: /establecimiento/periodo/blog)
            // Solo actualizamos los parámetros de establecimiento y periodo
            const remainingPath = pathParts.slice(3).join('/')
            const newPath = periodoId
                ? `/${establecimientoId}/${periodoId}/${remainingPath}`
                : `/${establecimientoId}/0/${remainingPath}`

            if (currentPath !== newPath) {
                router.push(newPath)
            }
        }
    }
}

// Función para cargar periodos
const loadPeriodos = async (establecimientoId: number) => {
    try {
        periodos.value = await $apis.establecimiento.periodoEscolar.getByEstablecimiento(establecimientoId)
        arePeriodosLoaded.value = true
    } catch (error) {
        console.error('Error al cargar periodos:', error)
        periodos.value = []
        arePeriodosLoaded.value = true
    }
}

// Función para cargar cursos
const loadCursos = async (establecimientoId: number, year: string) => {
    try {
        //cursos.value = await $apis.establecimiento.curso.getByEstablecimiento(establecimientoId, year)
        areCursosLoaded.value = true
    } catch (error) {
        console.error('Error al cargar cursos:', error)
        //cursos.value = []
        areCursosLoaded.value = true
    }
}

// Función para resetear los selects
const resetSelects = (resetPeriodo: boolean = true, resetCurso: boolean = true) => {
    if (resetPeriodo) {
        selectedPeriodoId.value = ""
        useNavbar().setSelectedPeriodo(0)
    }
    if (resetCurso) {
        selectedCursoId.value = ""
        //cursos.value = []
        areCursosLoaded.value = false
    }
}

// Inicialización desde los parámetros de la ruta
onMounted(async () => {
    const establecimientoIdParam = Number(route.params.establecimientoid)
    const periodoParam = Number(route.params.periodo)

    if (establecimientoIdParam > 0) {
        selectedEstablecimientoId.value = String(establecimientoIdParam)
        useNavbar().setSelectedEstablecimientoId(establecimientoIdParam)

        // Cargar periodos primero
        await loadPeriodos(establecimientoIdParam)

        // Si hay un periodo en la ruta y existe en los periodos cargados
        if (periodoParam > 0 && periodos.value.some(p => p.periodo === periodoParam)) {
            selectedPeriodoId.value = String(periodoParam)
            useNavbar().setSelectedPeriodo(periodoParam)
        }
    }
})

// Watch para establecimiento
watch(selectedEstablecimientoId, async (newVal) => {
    if (newVal) {
        resetSelects()
        useNavbar().setSelectedEstablecimientoId(Number(newVal))
        await loadPeriodos(Number(newVal))
        updateRoute(newVal, selectedPeriodoId.value)
        emit('selectedFilters', newVal, selectedPeriodoId.value, selectedCursoId.value)
    }
})

// Watch para periodo
watch(selectedPeriodoId, async (newVal) => {
    if (newVal) {
        resetSelects(false, true)
        useNavbar().setSelectedPeriodo(Number(newVal))
        if (selectedEstablecimientoId.value) {
            await loadCursos(Number(selectedEstablecimientoId.value), newVal)
            updateRoute(selectedEstablecimientoId.value, newVal)
        }
        emit('selectedFilters', selectedEstablecimientoId.value, newVal, selectedCursoId.value)
    }
})

// Watch para curso
watch(selectedCursoId, (newVal) => {
    emit('selectedFilters', selectedEstablecimientoId.value, selectedPeriodoId.value, newVal)
})

const logout = () => {
    authStore.logout()
}
</script>

<template lang="pug">
.bg-background.py-2.shadow-sm
    .container.mx-auto(v-if="isLoggedIn && user")
        .flex.items-center.gap-4
            .grow
                .flex.gap-4.items-center
                    SidebarSheetMenu(:logo-url="logoUrl", :titulo="titulo")
                    .flex.gap-2.items-center
                        img(:src="logoUrl", width="30")
                        h5.text-primary.font-bold {{ titulo }}
                    NavigationMenu
                        NavigationMenuList
                            NavigationMenuItem
                                NavigationMenuTrigger
                                    .flex.gap-2.items-center.text-primary
                                        Icon(name="tabler:layout-2", size="25")
                                        p Mis Módulos
                                NavigationMenuContent
                                    ul(class="grid w-[500px] gap-2 p-4 grid-cols-2")
                                        li(v-for="module in modules", :key="module.title")
                                            NavigationMenuLink(as-child)
                                                a.relative(:href="module.link", class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")
                                                    .flex.gap-2.items-center
                                                        img(:src="module.img", width="30px")
                                                        div
                                                            .text-sm.font-medium.leading-none {{  module.title  }}
                                                            p.line-clamp-2.text-sm.leading-snug.text-muted-foreground {{  module.subtitle  }}
                                                    .absolute.top-2.right-2(v-if="module.doHighlight")
                                                        p.bg-sky-700.text-white.font-medium.rounded-md.uppercase.px-2.py-1.animate-bounce(class="text-[.4rem]") Nuevo Módulo
            .flex-none
                NavigationMenu
                    NavigationMenuList(class="gap-2")
                        NavigationMenuItem
                            Select(v-model="selectedEstablecimientoId")
                                SelectTrigger
                                    SelectValue(placeholder="Elige un establecimiento")
                                SelectContent
                                    SelectGroup
                                        SelectLabel Mis Establecimientos
                                        SelectItem(:value="String(establecimiento.id)", v-for="establecimiento in user.establecimientos", :key="establecimiento.id")
                                            .flex.gap-2.items-center
                                                img(:src="establecimiento.logo", width="25px")
                                                span {{  establecimiento.nombre }}
                        NavigationMenuItem(v-if="!hidePeriodos")
                            Select(:disabled="!arePeriodosLoaded ", v-model="selectedPeriodoId")
                                SelectTrigger
                                    SelectValue(placeholder="Elige un año escolar")
                                SelectContent
                                    SelectGroup
                                        SelectLabel Años Escolares
                                        SelectItem(:value="String(periodo.periodo)", v-for="periodo in periodos", :key="periodo.periodo") {{ periodo.periodo }}

                        NavigationMenuItem.max-w-64(v-if="!hideCursos")
                            Select(:disabled="!areCursosLoaded", v-model="selectedCursoId")
                                SelectTrigger
                                    SelectValue(placeholder="Elige un curso")
                                SelectContent
                                    SelectGroup
                                        SelectLabel Cursos
                                        SelectItem(:value="String(curso.id)", v-for="curso in cursos") {{ curso?.sige.tipo_ensenanza_id }} | {{  curso?.sige.descripcion_grado  }} {{ curso?.sige.descripcion }} {{ curso.seccion }}

                        NavigationMenuItem
                            Separator(orientation="vertical", class="h-10")
                        NavigationMenuItem
                            DropdownMenu
                                DropdownMenuTrigger(as-child)
                                    Button(variant="ghost", size="icon")
                                        Avatar(class="!h-8 !w-8")
                                            AvatarImage(:src="user.avatarUrl")
                                            AvatarFallback
                                DropdownMenuContent.w-56
                                    DropdownMenuLabel Mi Cuenta
                                    DropdownMenuSeparator
                                    DropdownMenuGroup
                                        DropdownMenuItem
                                            a.flex.gap-2.items-center(href="https://login.redcollege.net/")
                                                Icon(name="tabler:home", size="20")
                                                span Inicio
                                        DropdownMenuItem
                                            a.flex.gap-2.items-center(href="https://redcollege.freshdesk.com/support/home", target="_blank")
                                                Icon(name="tabler:help", size="20")
                                                span Ayuda
                                        DropdownMenuSeparator
                                        DropdownMenuItem
                                            div.flex.gap-2.items-center(@click="logout")
                                                Icon(name="tabler:logout", size="20")
                                                span Cerrar Sesión
</template>
