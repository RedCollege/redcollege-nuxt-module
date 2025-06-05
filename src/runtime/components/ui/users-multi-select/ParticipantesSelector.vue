<script setup lang="ts">
import type { IUsuario } from '~/src/runtime/models';


interface Props {
    selectedUsers?: IUsuario[]
}

const props = defineProps<Props>()

</script>

<template lang="pug">
div
    ScrollArea(class="h-64")
        .grid
            .flex.items-center.space-x-2.py-2.px-2.rounded(class="hover:bg-sky/5")
                Checkbox
                label.text-sm.font-medium.leading-none(class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70") Deseleccionar todos
            .flex.justify-between.items-center.py-2.px-2.rounded(v-for="usuario in selectedUsers", :key="selectedUsers.id" class="hover:bg-sky/5")
                .flex.items-center.space-x-2
                    Checkbox
                    label.text-sm.font-medium.leading-none(class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70") {{ usuario.nombreCompleto }}
                //-p.text-xs.text-gray-500 20 alumnos
</template>
