<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import type { StepperTitleProps } from 'reka-ui'
import { StepperTitle, useForwardProps } from 'reka-ui'

import { cn } from '../../../lib/utils'

const props = defineProps<StepperTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTitle v-bind="forwarded" :class="cn('text-md font-semibold whitespace-nowrap', props.class)">
    <slot />
  </StepperTitle>
</template>
