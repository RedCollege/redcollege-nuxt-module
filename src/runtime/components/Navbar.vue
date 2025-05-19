<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { applicationModules as modules } from '../config/modules'
import type { IEstablecimiento, IPeriodoEscolar } from '../models'
import { useAuthStore } from '../stores/authStore'
import { useRuntimeConfig, useRoute, useRouter, useNuxtApp } from '#app'
import { useNavbar, useNotification } from '../composables/states'

interface Props {
    logoUrl: string,
    titulo: string,
    hideCursos?: boolean,
    hidePeriodos?: boolean,
    hideEstablecimientos?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    logoUrl: '',
    titulo: '',
    hideCursos: false,
    hidePeriodos: false,
    hideEstablecimientos: false
})

const { $apis } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)
const establecimientosResultados = ref<Array<IEstablecimiento>>([])
const selectedEstablecimientoId = ref("")
const selectedPeriodoId = ref("")
const selectedCursoId = ref("")
const isUploadingAvatar = ref(false)
const authStore = useAuthStore()
const { user, isLoggedIn, isSuperAdmin } = storeToRefs(authStore)
const { redirectTo } = useRuntimeConfig().public.redcollege
const periodos = ref<Array<IPeriodoEscolar>>([])
const isBuscadorEstablecimientoOpen = ref(false)
const isSearching = ref(false)
const isChangelogOpen = ref(false)

const arePeriodosLoaded = ref(false)
const areCursosLoaded = ref(false)

const emit = defineEmits(['sucessLogout', 'selectedFilters'])

// Función para actualizar la ruta
const updateRoute = (establecimientoId: string, periodoId: string) => {
    if (establecimientoId) {
        const currentPath = route.path
        const pathParts = currentPath.split('/')

        // Importante: nunca usar 0 como periodoId en la URL
        const safePerioId = periodoId && periodoId !== "0" ? periodoId :
            (periodos.value.length > 0 ? String(periodos.value[0].periodo) : String(new Date().getFullYear()))

        // Si estamos en la ruta inicial o solo con establecimiento
        if (pathParts.length <= 2) {
            const newPath = `/${establecimientoId}/${safePerioId}/${redirectTo}`

            if (currentPath !== newPath) {
                router.push(newPath)
            }
        } else {
            const remainingPath = pathParts.slice(3).join('/')
            const newPath = `/${establecimientoId}/${safePerioId}/${remainingPath}`

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

        // Si después de cargar los periodos, el periodo seleccionado no está en la lista o es 0
        // seleccionamos el primer periodo disponible para evitar el 0
        if (selectedPeriodoId.value === "0" || selectedPeriodoId.value === "" ||
            !periodos.value.some(p => String(p.periodo) === selectedPeriodoId.value)) {
            if (periodos.value.length > 0) {
                selectedPeriodoId.value = String(periodos.value[0].periodo)
                useNavbar().setSelectedPeriodo(periodos.value[0].periodo)
            }
        }
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

// Función para resetear los selects - modificada para NO usar 0 como valor
const resetSelects = (resetPeriodo: boolean = true, resetCurso: boolean = true) => {
    if (resetPeriodo) {
        // En lugar de usar valor vacío, verificamos si hay periodos disponibles
        if (periodos.value.length > 0) {
            // Usamos el primer periodo disponible en lugar de valor vacío
            selectedPeriodoId.value = String(periodos.value[0].periodo)
            useNavbar().setSelectedPeriodo(periodos.value[0].periodo)
        } else {
            // Si no hay periodos, utilizamos el año actual como respaldo
            const currentYear = new Date().getFullYear()
            selectedPeriodoId.value = String(currentYear)
            useNavbar().setSelectedPeriodo(currentYear)
        }
    }
    if (resetCurso) {
        selectedCursoId.value = ""
        //cursos.value = []
        areCursosLoaded.value = false
    }
}

const openFilePicker = (): void => {
    fileInput.value?.click()
}

// Maneja la carga de archivos
const handleFileUpload = async (event: Event) => {
    isUploadingAvatar.value = true
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
        try {
            const { url } = await $apis.auth.usuario.actualizarAvatar(file)
            authStore.updateAvatar(url)
            isUploadingAvatar.value = false
            useNotification().toast({
                title: 'Avatar Actualizado'
            })
        } catch (error) {
            isUploadingAvatar.value = false
            useNotification().toast({
                title: 'Revisa la imagen adjuntada, no puede pesar más de 10mb',
                variant: 'destructive'
            })
        }
    }
}

const buscarEstablecimiento = (async(event: KeyboardEvent) => {
    const busqueda = (event.target as HTMLInputElement).value
    try{
        isSearching.value = true
        const data = await $apis.establecimiento.establecimiento.obtenerEstablecimientos(busqueda, 1)
        establecimientosResultados.value = data.data
        isSearching.value = false
    }catch(error){

    }
})

// Inicialización desde los parámetros de la ruta
onMounted(async () => {
    const establecimientoIdParam = Number(route.params.establecimientoid)
    const periodoParam = Number(route.params.periodo)

    if (establecimientoIdParam > 0) {
        selectedEstablecimientoId.value = String(establecimientoIdParam)
        useNavbar().setSelectedEstablecimientoId(establecimientoIdParam)

        // Cargar periodos primero
        await loadPeriodos(establecimientoIdParam)

        // Si hay un periodo en la ruta
        if (periodoParam > 0) {
            // Verificar si existe en los periodos cargados
            if (periodos.value.some(p => p.periodo === periodoParam)) {
                selectedPeriodoId.value = String(periodoParam)
                useNavbar().setSelectedPeriodo(periodoParam)
            } else if (periodos.value.length > 0) {
                // Si el periodo no existe pero hay periodos disponibles, usar el primero
                selectedPeriodoId.value = String(periodos.value[0].periodo)
                useNavbar().setSelectedPeriodo(periodos.value[0].periodo)

                // Actualizar la URL para reflejar el periodo correcto
                updateRoute(String(establecimientoIdParam), selectedPeriodoId.value)
            }
        } else {
            // Si el periodo es 0 o undefined y hay periodos disponibles
            if (periodos.value.length > 0) {
                selectedPeriodoId.value = String(periodos.value[0].periodo)
                useNavbar().setSelectedPeriodo(periodos.value[0].periodo)

                // Actualizar la URL para reflejar el periodo correcto
                updateRoute(String(establecimientoIdParam), selectedPeriodoId.value)
            }
        }

        // Cargar cursos si necesario
        if (selectedPeriodoId.value) {
            await loadCursos(establecimientoIdParam, selectedPeriodoId.value)
        }
    }
})

// Watch para establecimiento
watch(selectedEstablecimientoId, async (newVal) => {
    if (newVal) {
        useNavbar().setSelectedEstablecimientoId(Number(newVal))
        await loadPeriodos(Number(newVal))

        // Solo resetear los selects después de cargar los periodos
        resetSelects()

        // Asegurarse de que selectedPeriodoId tenga un valor válido antes de actualizar la ruta
        updateRoute(newVal, selectedPeriodoId.value)
        emit('selectedFilters', newVal, selectedPeriodoId.value, selectedCursoId.value)
    }
})

// Watch para periodo
watch(selectedPeriodoId, async (newVal, oldVal) => {
    // Solo proceder si hay un nuevo valor y es diferente de 0
    if (newVal && newVal !== "0") {
        resetSelects(false, true)
        useNavbar().setSelectedPeriodo(Number(newVal))
        if (selectedEstablecimientoId.value) {
            await loadCursos(Number(selectedEstablecimientoId.value), newVal)
            updateRoute(selectedEstablecimientoId.value, newVal)
        }
        emit('selectedFilters', selectedEstablecimientoId.value, newVal, selectedCursoId.value)
    } else if (newVal === "0" && periodos.value.length > 0) {
        // Si el nuevo valor es 0 y hay periodos disponibles, establecer al primer periodo
        selectedPeriodoId.value = String(periodos.value[0].periodo)
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
div
    .bg-background.py-2.shadow-sm
        .container.mx-auto(v-if="isLoggedIn && user")
            .flex.items-center.gap-4
                .grow
                    .flex.gap-4.items-center
                        SidebarSheetMenu(:logo-url="logoUrl", :titulo="titulo")
                        .flex.gap-2.items-center
                            img(:src="logoUrl", width="30")
                            h5.text-primary.font-bold(class="hidden md:block") {{ titulo }}
                        NavigationMenu(class="hidden md:block")
                            NavigationMenuList
                                NavigationMenuItem
                                    NavigationMenuTrigger
                                        .flex.gap-2.items-center.text-primary
                                            Icon(name="tabler:layout-2", size="20")
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
                                NavigationMenuItem(v-if="isSuperAdmin")
                                    Button.flex.gap-2.items-center.text-primary(variant="ghost", @click="isChangelogOpen = true")
                                        Icon.text-primary(name="tabler:brand-github")
                                        p.text-sm.font-medium Changelog

                .flex-none
                    NavigationMenu
                        NavigationMenuList(class="gap-2")
                            NavigationMenuItem
                                Button(variant="secondary", as-child)
                                    a.flex.gap-2.items-center(href="https://redcollege.freshdesk.com/support/solutions", target="_blank")
                                        img.w-4.h-4(src="../assets/images/help.svg")
                                        span Tutoriales
                            //-NavigationMenuItem(v-if="isSuperAdmin")
                                Popover(v-model:open="isBuscadorEstablecimientoOpen")
                                    PopoverTrigger.w-full(as-child)
                                        Button.w-full.flex.gap-2.items-center.font-normal(type="button", variant="outline")
                                            span Buscar establecimiento
                                            Icon.opacity-50(name="tabler:selector", size="18")
                                    PopoverContent
                                        Command(:should-filter="false")
                                            .relative.w-full
                                                CommandInput(placeholder="Buscar establecimiento", @input="buscarEstablecimiento")
                                                CommandList
                                                    template(v-if="establecimientosResultados.length === 0")
                                                        CommandEmpty No se encontraron resultados
                                                    template(v-else)
                                                        CommandGroup(heading="Establecimientos")
                                                            CommandItem(v-for="establecimiento in establecimientosResultados", :key="establecimiento.id")
                                                                .flex.gap-2.items-center
                                                                    Avatar.w-8.h-8
                                                                        AvatarImage(:src="establecimiento.logo", v-if="establecimiento.logo")
                                                                        AvatarFallBack(v-else)
                                                                            Icon.text-gray-400(name="tabler:school", size="18")
                                                                    p.truncate.max-w-48
                                                                        span {{ establecimiento.nombre }}
                            NavigationMenuItem(v-if="!hideEstablecimientos")
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
                                            Loader.animate-spin(v-if="isUploadingAvatar")
                                            Avatar(class="h-8 w-8", v-else)
                                                AvatarImage(:src="user.avatarUrl")
                                                AvatarFallback {{ user.iniciales }}
                                    DropdownMenuContent.w-56
                                        DropdownMenuLabel Mi Cuenta
                                        DropdownMenuSeparator
                                        DropdownMenuGroup
                                            DropdownMenuItem
                                                a.flex.gap-2.items-center(href="https://login.redcollege.net/")
                                                    Icon(name="tabler:home", size="20")
                                                    span Inicio
                                            DropdownMenuItem
                                                .cursor-pointer.flex.gap-2.items-center(href="https://login.redcollege.net/", @click="openFilePicker")
                                                    Icon(name="tabler:photo", size="20")
                                                    span Subir Avatar
                                                input.hidden(type="file", ref="fileInput", accept="image/*", @change="handleFileUpload")
                                            DropdownMenuItem
                                                a.flex.gap-2.items-center(href="https://redcollege.freshdesk.com/support/home", target="_blank")
                                                    Icon(name="tabler:help", size="20")
                                                    span Ayuda
                                            DropdownMenuSeparator
                                            DropdownMenuItem
                                                div.flex.gap-2.items-center(@click="logout")
                                                    Icon(name="tabler:logout", size="20")
                                                    span Cerrar Sesión
    Dialog(v-model:open="isChangelogOpen")
        DialogContent(class="sm:max-w-[825px]")
            DialogHeader
                DialogTitle Changelog
            ScrollArea(class="max-h-[80dvh]")
                RedCollegeChangelogContainer
</template>
