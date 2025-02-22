<script setup lang="ts">
import { TransitionPresets, useElementVisibility, useTransition } from "@vueuse/core";
import { cn } from '../../../lib/utils'
import { computed, ref, watch } from "vue";

type TransitionsPresetsKeys = keyof typeof TransitionPresets;

interface NumberTickerProps {
    value: number;
    direction?: "up" | "down";
    duration?: number;
    delay?: number;
    decimalPlaces?: number;
    class?: string;
    transition?: TransitionsPresetsKeys;
}

const spanRef = ref<HTMLSpanElement>();
const props = withDefaults(defineProps<NumberTickerProps>(), {
    value: 0,
    direction: "up",
    delay: 0,
    duration: 1000,
    decimalPlaces: 2,
    transition: "easeOutCubic",
});

// Keep track of the previous value
const previousValue = ref(props.value);
const transitionValue = ref(props.value);

const transitionOutput = useTransition(transitionValue, {
    delay: props.delay,
    duration: props.duration,
    transition: TransitionPresets[props.transition],
});

const output = computed(() => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: props.decimalPlaces,
        maximumFractionDigits: props.decimalPlaces,
    }).format(Number(transitionOutput.value.toFixed(props.decimalPlaces)));
});

// Watch for changes in the value prop
watch(
    () => props.value,
    (newValue) => {
        previousValue.value = transitionValue.value;
        transitionValue.value = newValue;
    }
);

const isInView = useElementVisibility(spanRef, {
    threshold: 0,
});

// Modified visibility watcher to use previous value
watch(
    isInView,
    (isVisible) => {
        if (isVisible) {
            transitionValue.value = props.value;
        }
    },
    { immediate: true },
);
</script>

<template>
    <span ref="spanRef" :class="cn('inline-block text-inherit tabular-nums tracking-wider', props.class)">
        {{ output }}
    </span>
</template>
