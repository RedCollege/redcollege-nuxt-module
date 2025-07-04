<script setup lang="ts">
import type { IUsuario } from "~/src/runtime/models";
import { ref, watch } from "vue";

interface Props {
    selectedUsers?: IUsuario[];
}

const props = defineProps<Props>();
const emit = defineEmits(["clearAll", "removeUser"]);

const selectedUserIds = ref<Set<string>>(new Set());

if (props.selectedUsers) {
    props.selectedUsers.forEach((user) => {
        const userId = user.id?.toString() || user.nombreCompleto;
        selectedUserIds.value.add(userId);
    });
}

const handleClearAll = (): void => {
    emit("clearAll");
};

const handleToggleUser = (isChecked: boolean, usuario: IUsuario): void => {
    const userId = usuario.id?.toString() || usuario.nombreCompleto;
    if (!isChecked) {
        selectedUserIds.value.delete(userId);
        emit("removeUser", usuario);
    }
};

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
</script>

<template lang="pug">
div
    ScrollArea(class="h-64")
        .grid
            .flex.items-center.space-x-2.py-2.px-2.rounded(class="hover:bg-sky/5")
                Checkbox(:model-value="false", @update:model-value="handleClearAll")
                label.text-primary.text-sm.leading-none(class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70") Deseleccionar todos
            .flex.justify-between.items-center.py-2.px-2.rounded(v-for="usuario in selectedUsers", :key="usuario.id" class="hover:bg-sky/5")
                .flex.items-center.space-x-2
                    Checkbox(
                        :model-value="selectedUserIds.has(usuario.id?.toString() || usuario.nombreCompleto)"
                        @update:model-value="(checked: boolean) => handleToggleUser(checked, usuario)"
                    )
                    label.text-sm.leading-none(class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70") {{ usuario.nombreCompleto }}
                //-p.text-xs.text-gray-500 20 alumnos
</template>
