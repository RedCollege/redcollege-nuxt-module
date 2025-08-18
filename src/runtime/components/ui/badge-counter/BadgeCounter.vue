
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    total?: number
}

const props = withDefaults(defineProps<Props>(), {
    total: 0
})

const displayTotal = computed(() => props.total > 9 ? "+9" : props.total)
</script>


<template>
    <div class="relative inline-flex">
        <slot/>
        <AnimatePresence>
            <Motion
                v-if="total > 0"
                :key="displayTotal"
                :initial="{ scale: 0.5, opacity: 0, y: -10 }"
                :animate="{ scale: 1, opacity: 1, y: 0 }"
                :exit="{ scale: 0.5, opacity: 0, y: 10 }"
                :transition="{ duration: 0.2, ease: 'easeOut' }"
            >
                <Badge variant="destructive"
                    class="absolute -top-0 -right-0 h-4 w-4 flex items-center justify-center p-0 font-medium text-[10px]">
                    {{ displayTotal }}
                </Badge>
            </Motion>
        </AnimatePresence>
    </div>
</template>
