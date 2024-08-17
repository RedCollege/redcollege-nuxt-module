<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../../../lib/utils'
const selectedValues = ref(['2', '1'])

const props = defineProps({
    label: String,
    icon: String
})

const options: { label: string, value: string, icon: string }[] = [
    {
        label: "Por Validar",
        value: "1",
        icon: "home"
    },
    {
        label: "Desarrollo",
        value: "1",
        icon: "home"
    },
    {
        label: "Faltan datos",
        value: "1",
        icon: "home"
    },
    {
        label: "Validada",
        value: "1",
        icon: "home"
    }
]

</script>

<template lang="pug">
Popover
    PopoverTrigger(as-child)
        Button(variant="outline" size="sm" class="h-8 border-dashed")
            Icon(class="mr-2 h-4 w-4", :name="`tabler:${icon}`")
            | {{  label  }}
            template(v-if="selectedValues.length > 0")
                Separator(orientation="vertical" class="mx-2 h-4")
                Badge(variant="secondary" class="rounded-sm px-1 font-normal")
                    | {{ selectedValues.length }}
                //-div(class=" space-x-1 lg:flex")
                    Badge(v-if="selectedValues > 2" variant="secondary" class="rounded-sm px-1 font-normal")
                        | {{ selectedValues.size }} selected
                    template(v-else)
                        Badge(v-for="option in options" :key="option.value" variant="secondary" class="rounded-sm px-1 font-normal")
                            | {{ option.label }}
    PopoverContent(class="w-[200px] p-0" align="start")
        Command
            CommandInput(:placeholder="label")
            CommandList
            CommandEmpty Sin resultados
            CommandGroup
                CommandItem(
                v-for="option in options"
                :key="option.value"
                :value="option")
                    div(:class="cn('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary')")
                        Icon(:class="cn('h-4 w-4')", name="tabler:check")
                    Icon(:name="`tabler:${option.icon}`" v-if="option.icon" class="mr-2 h-4 w-4 text-muted-foreground")
                    span {{ option.label }}
                    //-span(v-if="facets?.get(option.value)" class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs")
                        | {{ facets.get(option.value) }}
            template(v-if="selectedValues.size > 0")
                CommandSeparator
                CommandGroup
                CommandItem(
                    :value="{ label: 'Clear filters' }"
                    class="justify-center text-center"
                ) Clear filters
</template>
