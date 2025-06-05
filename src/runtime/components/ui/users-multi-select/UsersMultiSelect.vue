<script setup lang="ts">
import ParticipantesSelector from './ParticipantesSelector.vue'
import CursoSelector from './CursoSelector.vue'
import PersonalSelector from './PersonalSelector.vue'
import ApoderadosSelector from './ApoderadosSelector.vue'
import EstudiantesSelector from './EstudiantesSelector.vue'

interface UsersMultiSelectProps {
    options: {
        label: string
        value: string
    }[]
    modelValue?: string[]
    placeholder?: string
    animation?: number
    maxCount?: number
    modalPopover?: boolean
    asChild?: boolean
    className?: string
    variant?: 'default' | 'secondary' | 'destructive' | 'inverted'
    disabled?: boolean
}

const props = defineProps<UsersMultiSelectProps>()

const selectedValues = computed({
    get: () => props.modelValue || [],
    set: (newValue) => emit('update:modelValue', newValue)
})

const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        isPopoverOpen.value = true
    } else if (event.key === 'Backspace' && !(event.target as HTMLInputElement).value) {
        const newSelectedValues = [...selectedValues.value]
        newSelectedValues.pop()
        selectedValues.value = newSelectedValues
        emit('select', newSelectedValues)
    }
}

const setIsPopoverOpen = (value: boolean) => {
    isPopoverOpen.value = value
}

</script>

<template lang="pug">
div
    Popover
        PopoverTrigger(:disabled="disabled" class="w-full")
            Button(type="button", class="flex w-full p-1 rounded-md border border-input min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit")
                .flex.justify-between.items-center.w-full(v-if="selectedValues.length > 0")
                    .flex.flex-wrap.items-center
                .flex.items-center.justify-between.w-full.mx-auto(v-else)
                    span.text-sm.text-muted-foreground.mx-3 {{ placeholder }}
                    Icon(name="tabler:chevron-down", class="h-4 cursor-pointer text-muted-foreground mx-2")
        PopoverContent.p-2(align="start", class="w-[--reka-popover-trigger-width]", :side-offset="5", @escape-key-down="setIsPopoverOpen(false)")
            .grid.gap-2
                Tabs(default-value="cursos")
                    .relative.rounded-sm.overflow-x-scroll.h-10
                        TabsList.absolute(variant="pill")
                            TabsTrigger.border.text-xs.text-foreground(value="participantes", variant="pill") Participantes
                            TabsTrigger.border.text-xs.text-foreground(value="cursos", variant="pill") Cursos
                            TabsTrigger.border.text-xs.text-foreground(value="personal", variant="pill") Personal
                            TabsTrigger.border.text-xs.text-foreground(value="estudiantes", variant="pill") Estudiantes
                            TabsTrigger.border.text-xs.text-foreground(value="apoderados", variant="pill") Apoderados
                    TabsContent(value="participantes")
                        ParticipantesSelector
                    TabsContent(value="cursos")
                        CursoSelector
                    TabsContent(value="personal")
                        PersonalSelector
                    TabsContent(value="estudiantes")
                        EstudiantesSelector
                    TabsContent(value="apoderados")
                        ApoderadosSelector
</template>
