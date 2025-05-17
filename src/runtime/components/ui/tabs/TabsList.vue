<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsList, type TabsListProps } from 'reka-ui'
import { cn } from '../../../lib/utils'
import { type TabsListVariants, tabsListVariants } from '.'
const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] } & { variant?: TabsListVariants['variant'] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})
</script>

<template>
    <TabsList v-bind="delegatedProps" :class="cn(tabsListVariants({ variant }),
        props.class,
    )">
        <slot />
    </TabsList>
</template>
