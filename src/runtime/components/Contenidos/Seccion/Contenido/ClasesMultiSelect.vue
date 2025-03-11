<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ComboboxAnchor, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'reka-ui'
const frameworks = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
]

const modelValue = ref<string[]>(['01', '02'])
const open = ref(false)
const searchTerm = ref('')

const filteredFrameworks = computed(() => frameworks.filter(i => !modelValue.value.includes(i.label)))

function select(ev: any){
    if (typeof ev.detail.value === 'string') {
        searchTerm.value = ''
        modelValue.value.push(ev.detail.value)
    }

    if (filteredFrameworks.value.length === 0) {
        open.value = false
    }
}

</script>

<template lang="pug">
TagsInput(class="px-0 gap-0" :model-value="modelValue")
    div(class="flex gap-2 flex-wrap items-center px-3")
        TagsInputItem(v-for="item in modelValue" :key="item" :value="item")
            TagsInputItemText
            TagsInputItemDelete

    //-ComboboxRoot(v-model="modelValue" v-model:open="open" v-model:searchTerm="searchTerm" class="w-full")
        ComboboxAnchor(as-child)
            ComboboxInput(placeholder="Framework..." as-child)
                TagsInputInput(class="w-full px-3" :class="modelValue.length > 0 ? 'mt-2' : ''" @keydown.enter.prevent)

        ComboboxPortal
            CommandList(
                position="popper"
                class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            )
                CommandEmpty
                CommandGroup
                    CommandItem(@select.prevent="select", v-for="framework in filteredFrameworks" :key="framework.value" :value="framework.label") {{ framework.label }}
</template>
