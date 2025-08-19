<script setup lang="ts">
import type {
    ICurso,
    IUsuario,
    IUsuarioEstablecimientoResponse,
} from "~/src/runtime/models";
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import type { ScrollArea } from "#components";
import { useNuxtApp } from "#app";

interface Props {
    periodo: number;
    establecimientoId: number;
    usuarios: IUsuarioEstablecimientoResponse;
    selectedUsers?: IUsuario[]; // Array de objetos IUsuario completos
    allCursos?: ICurso[];
}

const props = defineProps<Props>();
const scrollarea = ref<InstanceType<typeof ScrollArea> | null>(null);
const emit = defineEmits<{
    (e: "selectUsuario", usuario: IUsuario, isEnabled: boolean): void;
    (e: "search", search: string): void;
    (e: "searchCurso", cursoId: number) : void;
}>();

// Estado interno para mantener los IDs seleccionados (solo para UI)
const selectedUserIds = ref<Set<string>>(new Set());

// Variables para controlar el infinite scroll
const isInfiniteScrollSetup = ref<boolean>(false);
const isLoadingMore = ref<boolean>(false);
const isSearchLoading = ref<boolean>(false);

// Filtros de búsqueda
const searchTerm = ref<string>("");
const selectedCurso = ref<string>("all");
const { establecimiento } = useNuxtApp().$apis;

const showInitialLoader = computed<boolean>(() => {
    return isSearchLoading.value;
});

const allAvailableCursos = ref<Set<string>>(new Set());

// Función para extraer el label del curso
const getCursoLabel = (curso: ICurso): string => {
    const tipoEnsenanzaId = curso?.sige?.tipoEnsenanzaId ?? "";
    const tag = curso?.sige?.tag ?? "";
    const seccion = curso?.seccion?.trim() ?? "";
    return `${tipoEnsenanzaId} - ${tag} ${seccion}`.trim();
};

// Si recibimos todos los cursos por props, poblar el set con ellos
if (props.allCursos && Array.isArray(props.allCursos)) {
    props.allCursos.forEach((curso: ICurso) => {
        const label = getCursoLabel(curso);
        if (
            label &&
            label.trim() !== "" &&
            label !== "- " &&
            label !== "undefined - undefined"
        ) {
            allAvailableCursos.value.add(label);
        }
    });
}

// Inicializar con los usuarios ya seleccionados
if (props.selectedUsers) {
    props.selectedUsers.forEach((user) => {
        const userId = user.id?.toString() || user.nombreCompleto;
        selectedUserIds.value.add(userId);
    });
}

const filteredUsuarios = computed<IUsuario[]>(() => {
    if (!props.usuarios?.data) return [];
    console.log(props.usuarios.data)
    let filtered = [...props.usuarios.data]; // Crear copia para no mutar el original

    // Aplicar ambos filtros de manera independiente
    /*filtered = filtered.filter((usuario) => {
        // Filtro por término de búsqueda
        const matchesSearch =
            !searchTerm.value ||
            usuario.nombreCompleto
                .toLowerCase()
                .includes(searchTerm.value.toLowerCase()) ||
            (usuario.cursos &&
                usuario.cursos.length > 0 &&
                usuario.cursos.some((curso: ICurso) => {
                    const label = getCursoLabel(curso);
                    return label
                        .toLowerCase()
                        .includes(searchTerm.value.toLowerCase());
                }));

        // Filtro por curso seleccionado
        const matchesCurso =
            selectedCurso.value === "all" ||
            (usuario.cursos &&
                usuario.cursos.length > 0 &&
                usuario.cursos.some((curso: ICurso) => {
                    const label = getCursoLabel(curso);
                    return label
                        .toLowerCase()
                        .includes(selectedCurso.value.toLowerCase());
                }));

        return matchesSearch && matchesCurso;
    });*/

    return filtered;
});

// Computed para el estado del "Seleccionar todos"
const selectAllState = computed<boolean | "indeterminate">(() => {
    const filteredUsers = filteredUsuarios.value;
    if (filteredUsers.length === 0) return false;

    const selectedCount = filteredUsers.filter((usuario) => {
        const userId = usuario.id?.toString() || usuario.nombreCompleto;
        return selectedUserIds.value.has(userId);
    }).length;

    if (selectedCount === 0) return false;
    if (selectedCount === filteredUsers.length) return true;
    return "indeterminate"; // Estado intermedio
});

const uniqueCursos = computed<string[]>(() => {
    return Array.from(allAvailableCursos.value).sort();
});

// Usar la información del meta del padre
const currentPage = computed<number>(
    () => props.usuarios?.meta?.currentPage ?? 1,
);
const lastPage = computed<number>(() => props.usuarios?.meta?.lastPage ?? 1);
const total = computed<number>(() => props.usuarios?.meta?.total ?? 0);
const perPage = computed<number>(() => props.usuarios?.meta?.perPage ?? 15);

// Calcular la siguiente página que debe cargar el hijo
const nextPageToLoad = computed<number>(() => currentPage.value + 1);

// Verificar si puede cargar más páginas
const canLoadMore = computed<boolean>(() => {
    return (
        currentPage.value < lastPage.value &&
        props.usuarios?.data?.length < total.value
    );
});



// Función para verificar si un usuario está seleccionado
const isUserSelected = (userId: string): boolean => {
    return selectedUserIds.value.has(userId);
};

// Función para manejar el cambio de checkbox
const updateSelector = (isChecked: boolean, usuario: IUsuario): void => {
    const userId = usuario.id?.toString() || usuario.nombreCompleto;

    if (isChecked) {
        selectedUserIds.value.add(userId);
    } else {
        selectedUserIds.value.delete(userId);
    }

    emit("selectUsuario", usuario, isChecked);
};

// Función para seleccionar/deseleccionar todos
const toggleSelectAll = (isChecked: boolean): void => {
    filteredUsuarios.value.forEach((usuario) => {
        const userId = usuario.id?.toString() || usuario.nombreCompleto;
        const isCurrentlySelected = selectedUserIds.value.has(userId);

        if (isChecked && !isCurrentlySelected) {
            selectedUserIds.value.add(userId);
            emit("selectUsuario", usuario, true);
        } else if (!isChecked && isCurrentlySelected) {
            selectedUserIds.value.delete(userId);
            emit("selectUsuario", usuario, false);
        }
    });
};

// Función para configurar el infinite scroll
const setupInfiniteScroll = async () => {
    if (isInfiniteScrollSetup.value) return;

    await nextTick();
    const viewport = scrollarea.value?.$el?.querySelector(
        "[data-reka-scroll-area-viewport]",
    );
    if (!viewport) return;

    useInfiniteScroll(
        viewport,
        async () => {
            // Verificar si puede cargar más usando la información del meta
            if (!canLoadMore.value || isLoadingMore.value) return;

            isLoadingMore.value = true;

            try {
                const data =
                    await establecimiento.establecimiento.obtenerUsuariosPorRol(
                        props.establecimientoId,
                        {
                            rolId: 7,
                            search: searchTerm.value,
                            page: nextPageToLoad.value,
                            periodo: props.periodo,
                            ...(Number(selectedCurso.value) > 0 && { cursoId: Number(selectedCurso.value) })
                        },
                    );

                if (
                    data?.data &&
                    Array.isArray(data.data) &&
                    data.data.length > 0
                ) {
                    // Agregar los nuevos datos
                    props.usuarios.data.push(...data.data);

                    // Actualizar el meta con la información de la nueva página cargada
                    if (props.usuarios.meta) {
                        props.usuarios.meta.currentPage = nextPageToLoad.value;
                    }

                    //-isSearchLoading.value = false

                    // Si después de cargar esta página ya no hay más, terminar el loading de búsqueda
                    if (!canLoadMore.value) {
                        isSearchLoading.value = false;
                    }
                }
            } catch (error) {
                console.error("Error loading more users:", error);
            } finally {
                isLoadingMore.value = false;
            }
        },
        {
            distance: 250,
            canLoadMore: () => canLoadMore.value && !isLoadingMore.value,
        },
    );

    isInfiniteScrollSetup.value = true;
};

const search = (search: string): void => {
    emit("search", search);
};

// Watcher para detectar cuando cambian los datos desde el padre
watch(
    () => props.usuarios,
    async (newUsuarios, oldUsuarios) => {


        if (
            newUsuarios &&
            newUsuarios.meta &&
            oldUsuarios &&
            oldUsuarios.meta
        ) {
            // Solo reconfigurar si es realmente una nueva búsqueda, no cuando agregamos datos
            const isNewSearch =
                newUsuarios.meta.total !== oldUsuarios.meta.total ||
                (newUsuarios.meta.currentPage === 1 &&
                    oldUsuarios.meta.currentPage !== null &&
                    oldUsuarios.meta.currentPage > 1) ||
                newUsuarios.data.length <= (newUsuarios.meta.perPage ?? 15); // Solo tiene una página de datos

            if (isNewSearch) {
                // Resetear el infinite scroll para la nueva búsqueda
                isInfiniteScrollSetup.value = false;

                // Reconfigurar el infinite scroll
                await nextTick();
                await setupInfiniteScroll();

                // Una vez que se reciben los datos de la búsqueda, verificar si hay más páginas
                // Si no hay más páginas por cargar, terminar el loading
                if (!canLoadMore.value) {
                    isSearchLoading.value = false;
                }
            }
        }
    },
    { deep: true },
);

// Watcher para sincronizar cambios externos
watch(
    () => props.selectedUsers,
    (newSelectedUsers) => {
        if (newSelectedUsers) {
            const newIds = new Set(
                newSelectedUsers.map(
                    (user) => user.id?.toString() || user.nombreCompleto,
                ),
            );
            selectedUserIds.value = newIds;
        }
    },
    { deep: true },
);

watch(
    () => searchTerm.value,
    (newSearchTerm) => {
        // Iniciar el loading cuando se hace una búsqueda
        isSearchLoading.value = true;

        // SOLO hacer scroll al top cuando el usuario cambia la búsqueda
        const viewport = scrollarea.value?.$el?.querySelector(
            "[data-reka-scroll-area-viewport]",
        );
        viewport?.scrollTo({ top: 0, behavior: "smooth" });

        emit("search", newSearchTerm);
    },
);

watch(
    () => selectedCurso.value,
    (newSearchTerm) => {
        // Iniciar el loading cuando se hace una búsqueda
        isSearchLoading.value = true;

        // SOLO hacer scroll al top cuando el usuario cambia la búsqueda
        const viewport = scrollarea.value?.$el?.querySelector(
            "[data-reka-scroll-area-viewport]",
        );
        viewport?.scrollTo({ top: 0, behavior: "smooth" });

        emit("searchCurso", Number(newSearchTerm));
    },
);

// Inicializar cursos disponibles y configurar infinite scroll cuando se monta el componente
onMounted(async () => {
    await setupInfiniteScroll();
});
</script>

<template lang="pug">
.grid.gap-2
    .flex.px-2.items-center.gap-2
        .relative.w-full.items-center
            Input#search(
                type="text"
                placeholder="Buscar por nombre..."
                class="pl-10"
                v-model="searchTerm"
            )
            span.absolute.start-0.inset-y-0.flex.items-center.justify-center.px-2
                Icon.size-5.text-muted-foreground(name="tabler:search")
        Select(v-model="selectedCurso")
            SelectTrigger.w-48
                SelectValue(placeholder="Curso")
            SelectContent
                SelectGroup
                    SelectLabel Curso
                    SelectItem(value="all") Todos los cursos
                    SelectItem(v-for="curso in allCursos", :key="curso.id", :value="curso.id")
                        .flex.items-center.gap-2
                            Badge {{ curso.sige?.tipoEnsenanzaId }}
                            span.px-1 /
                            | {{  curso.sige?.codigoGradoId  }} {{  curso.seccion  }}
    //-template(v-if="showInitialLoader") cargando
    div
        ScrollArea(class="h-48" ref="scrollarea")
            // Loader inicial
            //-.flex.items-center.justify-center.h-full(v-if="showInitialLoader")
                .flex.flex-col.items-center.gap-2
                    // Spinner/loader (puedes usar el componente de loader que tengas en tu proyecto)
                    .animate-spin.rounded-full.h-8.w-8.border-b-2.border-primary
                    p.text-sm.text-muted-foreground Cargando estudiantes...

            // Contenido principal (solo se muestra cuando no está cargando)
            .grid
                // Checkbox "Seleccionar todos"
                .flex.items-center.space-x-2.py-2.px-2.rounded(class="hover:bg-sky/5")
                    Checkbox(
                        :model-value="selectAllState === true"
                        :indeterminate="selectAllState === 'indeterminate'"
                        @update:model-value="toggleSelectAll"
                    )
                    label.text-sm.text-primary.leading-none(
                        class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    ) Seleccionar todos los visibles ({{ filteredUsuarios.length }})
                    Loader.text-primary.animate-spin(v-if="showInitialLoader && filteredUsuarios.length === 0")

                // Lista de estudiantes filtrados
                .flex.justify-between.items-center.py-2.px-2.rounded(
                    v-for="estudiante in filteredUsuarios",
                    :key="estudiante.id"
                    class="hover:bg-sky/5"
                )
                    .flex.items-center.space-x-2
                        Checkbox(
                            :model-value="isUserSelected(estudiante.id?.toString() || estudiante.nombreCompleto)"
                            @update:model-value="(checked:boolean) => updateSelector(checked, estudiante)"
                        )
                        div
                            label.text-sm.leading-none(
                                class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            ) {{ estudiante.nombreCompleto }}
                    p.text-xs.text-gray-500 {{ estudiante.cursos.length > 0 ? estudiante.cursos.at(0)?.nombreCompleto : '' }}
</template>
