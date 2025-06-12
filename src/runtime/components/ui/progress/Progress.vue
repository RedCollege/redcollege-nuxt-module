<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import {
    ProgressIndicator,
    ProgressRoot,
    type ProgressRootProps,
} from "reka-ui";
import { cn } from "../../../lib/utils";
import { type ProgressVariant, progressVariants } from "../progress/index";

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
    const { class: _, showLabel: __, ...delegated } = props;
    return delegated;
});
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
            class="h-full transition-all flex items-center justify-end px-12"
            :class="cn(progressVariants({ variant }))"
            :style="{ width: `${props.modelValue}%` }"
        >
            <span
                class="text-xs font-semibold text-white"
            >
                {{ props.modelValue }}%
            </span>
        </ProgressIndicator>
    </ProgressRoot>
</template>
