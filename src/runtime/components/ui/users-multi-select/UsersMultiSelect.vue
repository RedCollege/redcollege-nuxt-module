<script setup lang="ts">
import ParticipantesSelector from "./ParticipantesSelector.vue";
import CursoSelector from "./CursoSelector.vue";
import PersonalSelector from "./PersonalSelector.vue";
import ApoderadosSelector from "./ApoderadosSelector.vue";
import EstudiantesSelector from "./EstudiantesSelector.vue";
import { computed, ref, watch } from "vue";
import { useAsyncData, useNuxtApp } from "#app";
import type { IUsuario } from "~/src/runtime/models";
import { cva, type VariantProps } from "class-variance-authority";

interface UsersMultiSelectProps {
    modelValue?: string[]; // Array de IDs como strings
    placeholder?: string;
    animation?: number;
    maxCount?: number;
    modalPopover?: boolean;
    asChild?: boolean;
    className?: string;
    variant?: "default" | "secondary" | "destructive" | "inverted";
    disabled?: boolean;
    periodo: number;
    establecimientoId: number;
}

const multiSelectVariants = cva(
    "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
    {
        variants: {
            variant: {
                default:
                    "border-foreground/10 text-foreground bg-card hover:bg-card/80",
                secondary:
                    "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                inverted: "inverted",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

const props = defineProps<UsersMultiSelectProps>();
const emit = defineEmits<{
    "update:modelValue": [value: string[]]; // Emite array de IDs
    select: [value: string[]]; // Emite array de IDs
}>();

const isPopoverOpen = ref(false);
const isAnimating = ref(false);
const { establecimiento } = useNuxtApp().$apis;
const searchEstudiante = ref<string>("");
const searchApoderado = ref<string>("");

// Async data para cargar información
const { data } = await useAsyncData("user-establecimiento-data", async () => {
    const [personal, cursos] = await Promise.all([
        establecimiento.establecimiento.getColaboradoresByEstablecimiento(
            props.establecimientoId,
        ),
        establecimiento.establecimiento.getAllCursosByEstablecimiento(
            props.establecimientoId,
            props.periodo,
            false,
        ),
    ]);
    return { personal, cursos };
});

const { data: estudiantes } = await useAsyncData(
    "estudiantes-establecimiento-multiselect",
    async () => {
        return establecimiento.establecimiento.obtenerUsuariosPorRol(
            props.establecimientoId,
            {
                rolId: 7,
                search: searchEstudiante.value,
                page: 1,
                periodo: props.periodo,
            },
        );
    },
    { watch: [searchEstudiante] },
);

const { data: apoderados } = await useAsyncData(
    "apoderados-establecimiento-multiselect",
    async () => {
        return establecimiento.establecimiento.obtenerUsuariosPorRol(
            props.establecimientoId,
            {
                rolId: 6,
                search: searchApoderado.value,
                page: 1,
                periodo: props.periodo,
            },
        );
    },
    { watch: [searchApoderado] },
);

// Estado interno para valores seleccionados como objetos IUsuario
const internalSelectedValues = ref<IUsuario[]>([]);

// Función para encontrar usuarios por IDs en todas las fuentes de datos
const findUsuarioById = (id: string): IUsuario | null => {
    // Buscar en personal
    const personalMatch = data.value?.personal?.find(
        (p) => p.id?.toString() === id,
    );
    if (personalMatch) return personalMatch;

    // Buscar en estudiantes
    const estudianteMatch = estudiantes.value?.data?.find(
        (e) => e.id?.toString() === id,
    );
    if (estudianteMatch) return estudianteMatch;

    // Buscar en apoderados
    const apoderadoMatch = apoderados.value?.data?.find(
        (a) => a.id?.toString() === id,
    );
    if (apoderadoMatch) return apoderadoMatch;

    return null;
};

// Inicializar usuarios internos basado en los IDs del modelValue
const initializeInternalUsers = (userIds: string[]) => {
    const usuarios: IUsuario[] = [];
    userIds.forEach((id) => {
        const usuario = findUsuarioById(id);
        if (usuario) {
            usuarios.push(usuario);
        }
    });
    internalSelectedValues.value = usuarios;
};

// Inicializar al montar si hay modelValue
if (props.modelValue && props.modelValue.length > 0) {
    // Esperar a que los datos estén cargados antes de inicializar
    watch(
        [data, estudiantes, apoderados],
        () => {
            if (data.value && estudiantes.value && apoderados.value) {
                initializeInternalUsers(props.modelValue || []);
            }
        },
        { immediate: true },
    );
}

// Computed que sincroniza con el v-model del padre
const selectedValues = computed({
    get: () => internalSelectedValues.value,
    set: (newValue: IUsuario[]) => {
        internalSelectedValues.value = newValue;
        // Emitir solo los IDs al padre
        const userIds = newValue.map(
            (user) => user.id?.toString() || user.nombreCompleto,
        );
        emit("update:modelValue", userIds);
        emit("select", userIds);
    },
});

// Array de IDs para comparaciones rápidas
const selectedUserIds = computed(() => {
    return new Set(
        selectedValues.value.map(
            (user) => user.id?.toString() || user.nombreCompleto,
        ),
    );
});

// Función para crear las opciones dinámicamente (simplificada)
const selectedOptions = computed(() => {
    return selectedValues.value.map((usuario) => ({
        label: usuario.nombreCompleto,
        value: usuario.id?.toString() || usuario.nombreCompleto,
        usuario: usuario, // Mantener referencia al objeto completo
    }));
});

// Watcher para sincronizar cambios externos (cuando el padre cambia el modelValue)
watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal && data.value && estudiantes.value && apoderados.value) {
            // Convertir IDs a objetos IUsuario
            const currentIds = internalSelectedValues.value.map(
                (u) => u.id?.toString() || u.nombreCompleto,
            );
            const newIds = newVal;

            // Solo actualizar si realmente cambió
            if (
                JSON.stringify(currentIds.sort()) !==
                JSON.stringify(newIds.sort())
            ) {
                initializeInternalUsers(newVal);
            }
        }
    },
    { deep: true },
);

const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        isPopoverOpen.value = true;
    } else if (
        event.key === "Backspace" &&
        !(event.target as HTMLInputElement).value
    ) {
        const newSelectedValues = [...selectedValues.value];
        newSelectedValues.pop();
        selectedValues.value = newSelectedValues;
    }
};

const setIsPopoverOpen = (value: boolean) => {
    isPopoverOpen.value = value;
};

const updateUsuarios = (usuario: IUsuario, isChecked: boolean): void => {
    const userId = usuario.id?.toString() || usuario.nombreCompleto;
    let newValues = [...selectedValues.value];

    if (isChecked) {
        // Agregar usuario si no está ya seleccionado
        const exists = newValues.some(
            (u) => (u.id?.toString() || u.nombreCompleto) === userId,
        );
        if (!exists) {
            newValues.push(usuario);
        }
    } else {
        // Quitar usuario si está seleccionado
        newValues = newValues.filter(
            (u) => (u.id?.toString() || u.nombreCompleto) !== userId,
        );
    }

    selectedValues.value = newValues;
};

const toggleOption = (value: string) => {
    // Encontrar el usuario completo para remover
    const usuarioToRemove = selectedValues.value.find(
        (u) => (u.id?.toString() || u.nombreCompleto) === value,
    );

    if (usuarioToRemove) {
        const newSelectedValues = selectedValues.value.filter(
            (u) => (u.id?.toString() || u.nombreCompleto) !== value,
        );
        selectedValues.value = newSelectedValues;
    }
};

const handleClear = () => {
    selectedValues.value = [];
};

const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.value.slice(
        0,
        props.maxCount ?? 3,
    );
    selectedValues.value = newSelectedValues;
};

// Funciones para manejar la pestaña de participantes
const removeUser = (usuario: IUsuario): void => {
    const newValues = selectedValues.value.filter(
        (u) =>
            (u.id?.toString() || u.nombreCompleto) !==
            (usuario.id?.toString() || usuario.nombreCompleto),
    );
    selectedValues.value = newValues;
};

const clearAllUsers = (): void => {
    selectedValues.value = [];
};

const filterEstudiante = (search: string): void => {
    searchEstudiante.value = search;
};

const filterApoderado = (search: string): void => {
    searchApoderado.value = search;
};
</script>

<template lang="pug">
div
    Popover
        PopoverTrigger(:disabled="disabled" class="w-full")
            Button(:disabled="disabled" type="button", class="flex w-full p-1 rounded-md border border-input min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit")
                .flex.justify-between.items-center.w-full(v-if="selectedValues.length > 0")
                    .flex.flex-wrap.items-center
                            Badge(v-for="option in selectedOptions.slice(0, maxCount || 3)", :key="option.value", :class="[ isAnimating ? 'animate-bounce' : '', multiSelectVariants({ variant })]"
                                :style="{ animationDuration: `${animation}s` }"
                            )
                                | {{ option.label }}
                                span(@click.stop="toggleOption(option.value)")
                                    Icon(name="tabler:circle-x", class="ml-2 h-4 w-4 cursor-pointer")
                            Badge(v-if="selectedValues.length > (maxCount || 3)" :class="['bg-transparent text-foreground border-foreground/1 hover:bg-transparent', isAnimating ? 'animate-bounce' : '', multiSelectVariants({ variant }) ]"
                                :style="{ animationDuration: `${animation}s` }"
                                )
                                | + {{ selectedValues.length - (maxCount || 3) }} más
                                span(@click.stop="clearExtraOptions")
                                    Icon(name="tabler:circle-x", class="ml-2 h-4 w-4 cursor-pointer")
                    .flex.items-center.justify-between
                        Icon(name="tabler:x", class="h-4 mx-2 cursor-pointer text-muted-foreground", @click.stop="handleClear")
                        Separator(orientation="vertical", class="flex min-h-6 h-full")
                        Icon(name="tabler:chevron-down", class="h-4 mx-2 cursor-pointer text-muted-foreground")
                .flex.items-center.justify-between.w-full.mx-auto(v-else)
                    span.text-sm.text-muted-foreground.mx-3 {{ placeholder }}
                    Icon(name="tabler:chevron-down", class="h-4 cursor-pointer text-muted-foreground mx-2")
        PopoverContent.p-2(align="start", class="w-[--reka-popover-trigger-width]", :side-offset="5", @escape-key-down="setIsPopoverOpen(false)")
            .grid.gap-2
                Tabs(default-value="cursos")
                    .relative.rounded-sm.overflow-x-scroll.h-14
                        TabsList.absolute(variant="pill")
                            TabsTrigger.border.text-xs.text-foreground(value="participantes", variant="pill") Participantes ({{ selectedValues.length }})
                            //- TabsTrigger.border.text-xs.text-foreground(value="cursos", variant="pill") Cursos
                            TabsTrigger.border.text-xs.text-foreground(value="personal", variant="pill") Personal
                            TabsTrigger.border.text-xs.text-foreground(value="estudiantes", variant="pill") Estudiantes
                            TabsTrigger.border.text-xs.text-foreground(value="apoderados", variant="pill") Apoderados
                    TabsContent(value="participantes")
                        ParticipantesSelector(:selected-users="selectedValues" @clearAll="clearAllUsers" @removeUser="removeUser")
                    //-TabsContent(value="cursos")
                        CursoSelector(:cursos="data.cursos")
                    TabsContent(value="personal")
                        PersonalSelector(:usuarios="data?.personal || []", @select-usuario="updateUsuarios", :selected-users="selectedValues")
                    TabsContent(value="estudiantes")
                        EstudiantesSelector(
                            :usuarios="estudiantes"
                            @select-usuario="updateUsuarios"
                            :periodo="periodo"
                            :establecimiento-id="establecimientoId"
                            :selected-users="selectedValues"
                            @search="filterEstudiante"
                            :all-cursos="data?.cursos || []"
                        )
                    TabsContent(value="apoderados")
                        ApoderadosSelector(:usuarios="apoderados", @select-usuario="updateUsuarios", :periodo="periodo", :establecimiento-id="establecimientoId", :selected-users="selectedValues", @search="filterApoderado")
</template>
