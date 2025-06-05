<script setup lang="ts">
import { ref, computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon } from '@radix-icons/vue'
import { cn } from '../../../lib/utils'

const multiSelectVariants = cva(
    'm-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300',
    {
        variants: {
            variant: {
                default:
                    'border-foreground/10 text-foreground bg-card hover:bg-card/80',
                secondary:
                    'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                inverted: 'inverted'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

interface MultiSelectProps {
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

const props = defineProps<MultiSelectProps>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void,
    (e: 'select', value: string[]): void
}>()

const isPopoverOpen = ref(false)
const isAnimating = ref(false)
const selectedValues = computed({
    get: () => props.modelValue || [],
    set: (newValue) => emit('update:modelValue', newValue)
})

const toggleOption = (option: string) => {
    const newSelectedValues = selectedValues.value.includes(option)
        ? selectedValues.value.filter((value) => value !== option)
        : [...selectedValues.value, option]
    selectedValues.value = newSelectedValues

    emit('select', newSelectedValues)
}

const handleClear = () => {
    selectedValues.value = []
    emit('select', [])
}

const togglePopover = () => {
    isPopoverOpen.value = !isPopoverOpen.value
}

const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.value.slice(0, props.maxCount ?? 3)
    selectedValues.value = newSelectedValues
    emit('select', newSelectedValues)
}

const toggleAll = () => {
    if (selectedValues.value.length === props.options.length) {
        handleClear()
    } else {
        const allValues = props.options.map((option) => option.value)
        selectedValues.value = allValues
        emit('select', allValues)
    }
}

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

defineExpose({
  setIsPopoverOpen,
  isPopoverOpen
})

</script>


<template>
    <Popover>
        <PopoverTrigger :disabled="disabled" class="w-full">
            <Button :disabled="disabled" type="button" :class="[
                'flex w-full p-1 rounded-md border border-input min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit',
                className
            ]">
                <div v-if="selectedValues.length > 0" class="flex justify-between items-center w-full">
                    <div class="flex flex-wrap items-center">
                        <Badge v-for="value in selectedValues.slice(0, maxCount)" :key="value" :class="[
                            isAnimating ? 'animate-bounce' : '',
                            multiSelectVariants({ variant })
                        ]" :style="{ animationDuration: `${animation}s` }">
                            {{ options.find((o) => o.value === value)?.label }}
                            <span @click.stop="toggleOption(value)">
                                <Icon name="tabler:circle-x" class="ml-2 h-4 w-4 cursor-pointer" />
                            </span>
                        </Badge>
                        <Badge v-if="selectedValues.length > maxCount!" :class="[
                            'bg-transparent text-foreground border-foreground/1 hover:bg-transparent',
                            isAnimating ? 'animate-bounce' : '',
                            multiSelectVariants({ variant })
                        ]" :style="{ animationDuration: `${animation}s` }">
                            + {{ selectedValues.length - maxCount! }} más
                            <span @click.stop="clearExtraOptions">
                                <Icon name="tabler:circle-x" class="ml-2 h-4 w-4 cursor-pointer" />
                            </span>
                        </Badge>
                    </div>
                    <div class="flex items-center justify-between">
                        <Icon name="tabler:x" class="h-4 mx-2 cursor-pointer text-muted-foreground" @click.stop="handleClear" />
                        <Separator orientation="vertical" class="flex min-h-6 h-full" />
                        <Icon name="tabler:chevron-down" class="h-4 mx-2 cursor-pointer text-muted-foreground" />
                    </div>
                </div>
                <div v-else class="flex items-center justify-between w-full mx-auto">
                    <span class="text-sm text-muted-foreground mx-3">{{ placeholder }}</span>
                    <Icon name="tabler:chevron-down" class="h-4 cursor-pointer text-muted-foreground mx-2" />
                </div>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" :align="'start'" @escape-key-down="setIsPopoverOpen(false)">
            <Command>
                <CommandInput placeholder="Buscar..." @keydown="handleInputKeyDown" />
                <CommandList>
                    <CommandEmpty>Sin Resultados</CommandEmpty>
                    <CommandGroup>
                        <CommandItem @select="toggleAll" value="all" class="cursor-pointer">
                            <div :class="[
                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                selectedValues.length === options.length
                                    ? 'bg-primary text-primary-foreground'
                                    : 'opacity-50 [&_svg]:invisible'
                            ]">
                                <CheckIcon class="h-4 w-4" />
                            </div>
                            <span>(Elegir Todos)</span>
                        </CommandItem>
                        <CommandItem v-for="option in options" :value="option.label" :key="option.value"
                            @select="() => toggleOption(option.value)" class="cursor-pointer">
                            <div :class="[
                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                selectedValues.includes(option.value)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'opacity-50 [&_svg]:invisible'
                            ]">
                                <CheckIcon class="h-4 w-4" />
                            </div>
                            <span>{{ option.label }}</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup>
                        <div class="flex items-center justify-between">
                            <!--<CommandItem v-if="selectedValues.length > 0" value="" @select="handleClear"
                                class="flex-1 justify-center cursor-pointer">
                                Limpiar
                            </CommandItem>-->
                        </div>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>

