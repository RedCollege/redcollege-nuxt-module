<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../../../lib/utils'

const options: { label: string, value: string, variant: string }[] = [
    {
        label: "Por Validar",
        value: "por validar",
        variant: "sky"
    },
    {
        label: "Desarrollo",
        value: "desarrollo",
        variant: "purple"
    },
    {
        label: "Faltan datos",
        value: "faltan datos",
        variant: "gold"
    },
    {
        label: "Validada",
        value: "validada",
        variant: "green"
    }
]
const open = ref(false)
const value = ref('')

const selectedOption = computed(() => {
    return options.find(o => o.value == value.value)
})


</script>

<template lang="pug">
Popover(v-model:open="open")
    PopoverTrigger(as-child)
        Button(:variant="selectedOption ? selectedOption.variant : 'outline'", role="combobox" , class="justify-between w-full")
            span {{ value ? options.find((option) => option.value === value)?.label : 'Elegir Estado' }}
            Icon.h-4.w-4(name="tabler:chevron-down")
    PopoverContent(class="w-full p-0")
        Command(v-model="value")
            CommandInput(placeholder="Buscar estado")
            CommandEmpty No se encontró resulados
            CommandList
                CommandGroup
                    CommandItem(v-for="option in options", :key="option.value", :value="option.value", @select="open = false")
                        Icon(name="tabler:check", :class="cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')")
                        span {{  option.label  }}
</template>
