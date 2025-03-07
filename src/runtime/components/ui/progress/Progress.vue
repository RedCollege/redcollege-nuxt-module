<script setup lang="ts">
import {computed, type HTMLAttributes} from 'vue'
import {ProgressIndicator, ProgressRoot, type ProgressRootProps,} from 'reka-ui'
import {cn} from '../../../lib/utils'
import {type ProgressVariant, progressVariants} from "../progress/index";

const props = withDefaults(
    defineProps<ProgressRootProps & { class?: HTMLAttributes['class'], variant?: ProgressVariant }>(),
  {
    modelValue: 0,
      variant: 'success'
  },
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

</script>

<template>
    <ProgressRoot
        v-bind="delegatedProps"
        :class="
      cn(
        'relative h-6 w-full overflow-hidden rounded-full bg-primary/20',
        props.class
      )
    "
    >
        <ProgressIndicator
            class="h-full  transition-all"
            :class="cn(progressVariants({variant}))"
            :style="{ width: `${props.modelValue}%` }"
        />

        <div v-if="props.modelValue >=5" :style="{ left: `${props.modelValue -2}%` }"
             class="absolute items-center left-0 inset-0 flex text-xs font-semibold text-white">
            {{ props.modelValue }}%
        </div>
    </ProgressRoot>
</template>
