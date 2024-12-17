<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { useMotion } from '@vueuse/motion'
const centerContainer = ref(null)
const containers = Array.from({ length: 8 }, () => ref(null))
const { width, height } = useWindowSize()
const isHovered = ref(false)
const { apply } = useMotion(centerContainer, {
    initial: {
        scaleY: 1,
        scaleX: 1
    },
    hovered: {
        scaleY: 1.5,
        scaleX: 2,
        transition: {
            onComplete: () => console.log("finished")
        }
    }
})

const startAnimation = () => {
    isHovered.value = true
    apply('hovered')
}

</script>

<template lang="pug">
.grid.grid-cols-3.h-screen.w-screen.gap-4
    div.rounded-2xl.bg-white.flex.justify-center.items-center(ref="containers[0]") {{ isHovered }}
    div.rounded-2xl.bg-white.flex.justify-center.items-center(ref="containers[1]") 1
    div.rounded-2xl.bg-white.flex.justify-center.items-center(ref="containers[2]") 1
    div.rounded-2xl.bg-white.flex.justify-center.items-center(ref="containers[3]") 1
    div.rounded-2xl.bg-white.flex.justify-center.items-center(ref="centerContainer", @mouseleave="isHovered = false" @mouseover="startAnimation") 1
    div.rounded-2xl.bg-white.flex.justify-center.items-center(ref="containers[4]") 1
    div.rounded-2xl.bg-white.flex.justify-center.items-center(ref="containers[5]") 1
    div.rounded-2xl.bg-white.flex.justify-center.items-center(ref="containers[6]") 1
    div.rounded-2xl.bg-white.flex.justify-center.items-center(ref="containers[7]") 1
</template>
