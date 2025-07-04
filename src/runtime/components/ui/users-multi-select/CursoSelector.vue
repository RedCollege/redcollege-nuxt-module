<script setup lang="ts">
import type { ICurso } from "~/src/runtime/models";
import { ref, computed } from "vue";

interface Props {
    cursos: ICurso[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: "selectCurso", curso: ICurso, isEnabled: boolean): void;
}>();
// Inicialmente ningún curso seleccionado
const selectedCursoIds = ref<Set<string>>(new Set());

// Función para verificar si un curso está seleccionado
const isCursoSelected = (cursoId: string): boolean => {
    return selectedCursoIds.value.has(cursoId);
};

// Función para manejar el cambio de checkbox
const updateSelector = (isChecked: boolean, curso: ICurso): void => {
    const cursoId = curso.id?.toString();

    if (isChecked) {
        selectedCursoIds.value.add(cursoId);
    } else {
        selectedCursoIds.value.delete(cursoId);
    }

    // Emitir evento para notificar al padre
    emit("selectCurso", curso, isChecked);
};

// Filtros de búsqueda
const searchTerm = ref<string>("");
const selectedLevel = ref<string>("");

// Cursos filtrados
const filteredCursos = computed<ICurso[]>(() => {
    if (!props.cursos) return [];

    return props.cursos.filter((curso) => {
        const matchesSearch = curso.nombreCompleto
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase());
        const matchesLevel = selectedLevel.value
            ? String(curso.sige?.tipoEnsenanzaId) ===
              String(selectedLevel.value)
            : true;

        return matchesSearch && matchesLevel;
    });
});

// Función para seleccionar/deseleccionar todos
const toggleSelectAll = (isChecked: boolean): void => {
    filteredCursos.value.forEach((curso) => {
        const cursoId = curso.id?.toString();
        if (isChecked) {
            selectedCursoIds.value.add(cursoId);
        } else {
            selectedCursoIds.value.delete(cursoId);
        }
    });

    // Emitir evento para notificar al padre por cada curso
    filteredCursos.value.forEach((curso) => {
        emit("selectCurso", curso, isChecked);
    });
};

// Computed para el estado del checkbox "Seleccionar todos"
const isAllSelected = computed<boolean | "intermediate">(() => {
    const filteredCourses = filteredCursos.value;
    if (filteredCourses.length === 0) return false;
    const selectedCount = filteredCourses.filter((curso) =>
        selectedCursoIds.value.has(curso.id?.toString()),
    ).length;

    if (selectedCount === 0) return false;
    if (selectedCount === filteredCourses.length) return true;
    return "intermediate";
});
</script>

<template lang="pug">
.grid.gap-2
    .flex.px-2.items-center.gap-2
        .relative.w-full.items-center
            Input#search(type="text"
                placeholder="Buscar por cursos..."
                class="pl-10"
                v-model="searchTerm"
                )
            span.absolute.start-0.inset-y-0.flex.items-center.justify-center.px-2
                Icon.size-5.text-muted-foreground(name="tabler:search")
        //- Select
        //-     SelectTrigger.w-32
        //-         SelectValue(placeholder="Nivel")
        //-     SelectContent
        //-         SelectGroup
        //-             SelectLabel Niveles
        //-             SelectItem
    ScrollArea(class="h-64")
        .grid
            .flex.items-center.space-x-2.py-2.px-2.rounded(class="hover:bg-sky/5")
                Checkbox(
                    :model-value="isAllSelected === true"
                    :indeterminate="isAllSelected === 'indeterminate'"
                    @update:model-value="toggleSelectAll"
                )
                label.text-sm.text-primary.leading-none(class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70") Seleccionar todos ({{ filteredCursos.length }})
            .flex.justify-between.items-center.py-2.px-2.rounded(v-for="curso in filteredCursos", :key="curso.id" class="hover:bg-sky/5")
                .flex.items-center.space-x-2
                    Checkbox(
                        :model-value="isCursoSelected(curso.id?.toString() || '')"
                        @update:model-value="(isChecked:boolean) => updateSelector(isChecked, curso)"
                    )
                    label.text-sm.leading-none(class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70") {{ curso.sige?.tipoEnsenanzaId }} - {{ curso.nombreCompleto }}
                p.text-xs.text-gray-500 {{ curso.totalEstudiantes }} alumnos
</template>
