<script setup lang="ts">
import type { IUsuario } from '~/src/runtime/models';
import { ref, computed, watch } from 'vue'

interface Props {
    usuarios: IUsuario[]
    selectedUsers?: IUsuario[] // Array de objetos IUsuario completos
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'selectUsuario', usuario: IUsuario, isEnabled: boolean): void
}>()

// Estado interno para mantener los IDs seleccionados (solo para UI)
const selectedUserIds = ref<Set<string>>(new Set())

// Inicializar con los usuarios ya seleccionados
if (props.selectedUsers) {
    props.selectedUsers.forEach(user => {
        const userId = user.id?.toString() || user.nombreCompleto
        selectedUserIds.value.add(userId)
    })
}

// Watcher para sincronizar cambios externos
watch(() => props.selectedUsers, (newSelectedUsers) => {
    if (newSelectedUsers) {
        const newIds = new Set(newSelectedUsers.map(user =>
            user.id?.toString() || user.nombreCompleto
        ))
        selectedUserIds.value = newIds
    }
}, { deep: true })

// Función para verificar si un usuario está seleccionado
const isUserSelected = (userId: string): boolean => {
    return selectedUserIds.value.has(userId)
}

// Función para manejar el cambio de checkbox
const updateSelector = (isChecked: boolean, usuario: IUsuario): void => {
    const userId = usuario.id?.toString() || usuario.nombreCompleto

    if (isChecked) {
        selectedUserIds.value.add(userId)
    } else {
        selectedUserIds.value.delete(userId)
    }

    emit('selectUsuario', usuario, isChecked)
}

// Filtros de búsqueda
const searchTerm = ref('')
const selectedProfile = ref('')

// Usuarios filtrados
const filteredUsuarios = computed(() => {
    if (!props.usuarios) return []

    let filtered = props.usuarios

    // Filtrar por término de búsqueda
    if (searchTerm.value) {
        filtered = filtered.filter(usuario =>
            usuario.nombreCompleto.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            (usuario.cargo && usuario.cargo.toLowerCase().includes(searchTerm.value.toLowerCase()))
        )
    }

    // Filtrar por perfil/cargo seleccionado
    if (selectedProfile.value) {
        filtered = filtered.filter(usuario =>
            usuario.cargo && usuario.cargo.toLowerCase().includes(selectedProfile.value.toLowerCase())
        )
    }

    return filtered
})

// Función para seleccionar/deseleccionar todos
const toggleSelectAll = (isChecked: boolean): void => {
    filteredUsuarios.value.forEach(usuario => {
        const userId = usuario.id?.toString() || usuario.nombreCompleto
        const isCurrentlySelected = selectedUserIds.value.has(userId)

        if (isChecked && !isCurrentlySelected) {
            selectedUserIds.value.add(userId)
            emit('selectUsuario', usuario, true)
        } else if (!isChecked && isCurrentlySelected) {
            selectedUserIds.value.delete(userId)
            emit('selectUsuario', usuario, false)
        }
    })
}

// Computed para el estado del "Seleccionar todos"
const selectAllState = computed(() => {
    const filteredUsers = filteredUsuarios.value
    if (filteredUsers.length === 0) return false

    const selectedCount = filteredUsers.filter(usuario => {
        const userId = usuario.id?.toString() || usuario.nombreCompleto
        return selectedUserIds.value.has(userId)
    }).length

    if (selectedCount === 0) return false
    if (selectedCount === filteredUsers.length) return true
    return 'indeterminate' // Estado intermedio
})

// Computed para obtener cargos únicos para el filtro
const uniqueCargos = computed(() => {
    if (!props.usuarios) return []

    const cargos = props.usuarios
        .map(usuario => usuario.cargo)
        .filter(cargo => cargo && cargo.trim() !== '') // Filtrar cargos vacíos
        .filter((cargo, index, array) => array.indexOf(cargo) === index) // Únicos
        .sort()

    return cargos
})
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
                    // Agregar más opciones de perfil según los cargos disponibles

    ScrollArea(class="h-64")
        .grid
            // Checkbox "Seleccionar todos"
            .flex.items-center.space-x-2.py-2.px-2.rounded(class="hover:bg-sky/5")
                Checkbox(
                    :model-value="selectAllState === true"
                    :indeterminate="selectAllState === 'indeterminate'"
                    @update:model-value="toggleSelectAll"
                )
                label.text-sm.font-medium.leading-none(
                    class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ) Seleccionar todos ({{ filteredUsuarios.length }})

            // Lista de personal filtrado
            .flex.justify-between.items-center.py-2.px-2.rounded(
                v-for="usuario in filteredUsuarios",
                :key="usuario.id"
                class="hover:bg-sky/5"
            )
                .flex.items-center.space-x-2
                    Checkbox(
                        :model-value="isUserSelected(usuario.id?.toString() || usuario.nombreCompleto)"
                        @update:model-value="(checked) => updateSelector(checked, usuario)"
                    )
                    div
                        label.text-sm.font-medium.leading-none(
                            class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        ) {{ usuario.nombreCompleto }}
                p.text-xs.text-gray-500 {{ usuario.cargo || '' }}
</template>
