<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import {
    ProgressIndicator,
    ProgressRoot,
    type ProgressRootProps,
} from "reka-ui";
import { cn } from "../../../lib/utils";
import { type ProgressVariant, progressVariants } from "./index";

const props = withDefaults(
    defineProps<
        ProgressRootProps & {
            class?: HTMLAttributes["class"];
            variant?: ProgressVariant;
            showLabel?: boolean;
        }
    >(),
    {
        modelValue: 0,
        variant: "success",
        class: "",
        showLabel: true,
    }
);

const delegatedProps = computed(() => {
    const { class: _, showLabel: __, variant: ___, ...delegated } = props;
    return delegated;
});

// Computed para manejar el valor con null safety
const progressValue = computed<number>(() => props.modelValue ?? 0);
</script>

<template>
    <ProgressRoot
        v-bind="delegatedProps"
        :class="
            cn(
                'relative h-3 w-full overflow-hidden rounded-full bg-primary/20',
                props.class
            )
        "
    >
        <ProgressIndicator
            :class="cn(
                'h-full transition-all',
                progressVariants({ variant: props.variant })
            )"
            :style="{ width: `${progressValue}%` }"
        />
        
        <div 
            v-if="props.showLabel"
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <span 
                class="text-xs font-semibold transition-colors duration-200"
                :class="progressValue >= 50 ? 'text-white' : 'text-black'"
            >
                {{ progressValue }}%
            </span>
        </div>
    </ProgressRoot>
</template>