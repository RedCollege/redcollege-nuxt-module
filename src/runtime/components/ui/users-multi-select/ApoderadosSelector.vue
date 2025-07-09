<script setup lang="ts">
import type {
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
    selectedUsers: IUsuario[]; // Array de objetos IUsuario completos
}

const props = defineProps<Props>();
const scrollarea = ref<InstanceType<typeof ScrollArea> | null>(null);
const emit = defineEmits<{
    (e: "selectUsuario", usuario: IUsuario, isEnabled: boolean): void;
    (e: "search", search: string): void;
}>();

// Filtros de búsqueda
const searchTerm = ref<string>("");
const selectedProfile = ref<string>("");
const isFirstLoading = ref<boolean>(true);

const localUsuarios = ref<IUsuarioEstablecimientoResponse>({
    data: [...(props.usuarios.data ?? [])],
    meta: { ...(props.usuarios.meta ?? {}) },
});
const { establecimiento } = useNuxtApp().$apis;

// Estado interno para mantener los IDs seleccionados (solo para UI)
const selectedUserIds = ref<Set<string>>(new Set());

// Variables para controlar el infinite scroll
const isInfiniteScrollSetup = ref(false);
const isLoadingMore = ref(false);

// Inicializar con los usuarios ya seleccionados
if (props.selectedUsers) {
    props.selectedUsers.forEach((user) => {
        const userId = user.id?.toString() || user.nombreCompleto;
        selectedUserIds.value.add(userId);
    });
}

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

// Usuarios filtrados
const filteredUsuarios = computed<IUsuario[]>(() => {
    if (!props.usuarios?.data) return [];
    return props.usuarios.data;
});

// Computed para el estado del "Seleccionar todos"
const selectAllState = computed<string | boolean>(() => {
    const filteredUsers = filteredUsuarios.value;
    if (filteredUsers.length === 0) return false;

    const selectedCount = filteredUsers.filter((apoderado) => {
        const userId = apoderado.id?.toString() || apoderado.nombreCompleto;
        return selectedUserIds.value.has(userId);
    }).length;

    if (selectedCount === 0) return false;
    if (selectedCount === filteredUsers.length) return true;
    return "indeterminate"; // Estado intermedio
});

// Función para seleccionar/deseleccionar todos
const toggleSelectAll = (isChecked: boolean): void => {
    filteredUsuarios.value.forEach((apoderado) => {
        const userId = apoderado.id?.toString() || apoderado.nombreCompleto;
        const isCurrentlySelected = selectedUserIds.value.has(userId);

        if (isChecked && !isCurrentlySelected) {
            selectedUserIds.value.add(userId);
            emit("selectUsuario", apoderado, true);
        } else if (!isChecked && isCurrentlySelected) {
            selectedUserIds.value.delete(userId);
            emit("selectUsuario", apoderado, false);
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
                            rolId: 6,
                            search: searchTerm.value,
                            page: nextPageToLoad.value,
                            periodo: props.periodo,
                        },
                    );

                if (
                    data?.data &&
                    Array.isArray(data.data) &&
                    data.data.length > 0
                ) {
                    // Agregar los nuevos datos a la variable local
                    localUsuarios.value.data.push(...data.data);

                    // Actualizar el meta con la información de la nueva página cargada
                    if (localUsuarios.value.meta) {
                        localUsuarios.value.meta.currentPage =
                            nextPageToLoad.value;
                    }
                }

                isFirstLoading.value = false;
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

// Watcher para detectar cuando cambian los datos desde el padre
watch(
    () => props.usuarios,
    async (newUsuarios, oldUsuarios) => {
        if (newUsuarios && oldUsuarios) {
            // Solo reconfigurar si es realmente una nueva búsqueda, no cuando agregamos datos
            const isNewSearch =
                newUsuarios.meta.total !== oldUsuarios.meta.total ||
                (newUsuarios.meta.currentPage === 1 &&
                    oldUsuarios.meta.currentPage !== null &&
                    oldUsuarios.meta.currentPage > 1) ||
                newUsuarios.data.length <= (newUsuarios.meta.perPage ?? 15); // Solo tiene una página de datos

            if (isNewSearch) {
                // Resetear el infinite scroll para la nueva búsqueda
                isFirstLoading.value = true;
                isInfiniteScrollSetup.value = false;

                // Reconfigurar el infinite scroll
                await nextTick();
                await setupInfiniteScroll();
            }
        }
    },
    { deep: true },
);

onMounted(async () => {
    await setupInfiniteScroll();
});

watch(
    () => searchTerm.value,
    (newSearchTerm) => {
        // SOLO hacer scroll al top cuando el usuario cambia la búsqueda
        const viewport = scrollarea.value?.$el?.querySelector(
            "[data-reka-scroll-area-viewport]",
        );
        viewport?.scrollTo({ top: 0, behavior: "smooth" });

        emit("search", newSearchTerm);
    },
);
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
        //-Select(v-model="selectedProfile")
            SelectTrigger.w-32
                SelectValue(placeholder="Perfil")
            SelectContent
                SelectGroup
                    SelectLabel Niveles
                    SelectItem(value="") Todos
                    // Agregar más opciones de perfil aquí

    ScrollArea(class="h-64", ref="scrollarea")
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
                ) Seleccionar todos

            // Lista de apoderados filtrados
            .flex.justify-between.items-center.py-2.px-2.rounded(
                v-for="apoderado in filteredUsuarios",
                :key="apoderado.id"
                class="hover:bg-sky/5"
            )
                .flex.items-center.space-x-2
                    Checkbox(
                        :model-value="isUserSelected(apoderado.id?.toString() || apoderado.nombreCompleto)"
                        @update:model-value="(checked:boolean) => updateSelector(checked, apoderado)"
                    )
                    div
                        label.text-sm.leading-none(
                            class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        ) {{ apoderado.nombreCompleto }}
                //-p.text-xs.text-gray-500 {{ apoderado }}
</template>
