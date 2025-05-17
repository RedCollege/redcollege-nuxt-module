<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'reka-ui'
import { cn } from '../../../lib/utils'
import { type TabsTriggerVariants, tabsTriggerVariants } from '.'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] } & { variant?: TabsTriggerVariants['variant'] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <TabsTrigger v-bind="forwardedProps" :class="cn(
        tabsTriggerVariants({ variant }),
        props.class,
    )">
        <slot />
    </TabsTrigger>
</template>
