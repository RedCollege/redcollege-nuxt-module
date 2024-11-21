<script setup>
import { onMounted, reactive, ref } from "vue";
import { useMotion } from "@vueuse/motion";
import { useMouse } from '@vueuse/core'
// Props del componente
const props = defineProps({
    containerClassName: {
        type: String,
        default: "",
    },
    className: {
        type: String,
        default: "",
    },
});


const mousePosition = reactive({ x: 0, y: 0 })
const card = ref(null)
const innerCard = ref(null)

const { apply : animateCard } = useMotion(card, {
    initial: {
        transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
    }
})

const { apply : animateInnerCard } = useMotion(innerCard, {
    initial: {
        transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
    }
})

const getPosition = async (event) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    await animateCard({
        transform: `translate3d(${x}px, ${y}px, 0) scale3d(1, 1, 1)`,
        transition: { duration: 0.1, ease: "ease-out" },
    })
    await animateInnerCard({
        transform: `translate3d(${-x}px, ${-y}px, 0) scale3d(1.03, 1.03, 1)`,
        transition: { duration: 0.1, ease: "ease-out" },
    })
    await animateCard('initial')
    await animateInnerCard('initial')
}

</script>

<template>
    <div ref="card" class="mx-auto w-full bg-indigo-800 relative rounded-2xl overflow-hidden" @mousemove="getPosition"  :class="containerClassName">
        <div
            class="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl overflow-hidden"
            style="
                box-shadow: 0 10px 32px rgba(34, 42, 53, 0.12),
                0 1px 1px rgba(0, 0, 0, 0.05),
                0 0 0 1px rgba(34, 42, 53, 0.05),
                0 4px 6px rgba(34, 42, 53, 0.08),
                0 24px 108px rgba(47, 48, 55, 0.10);
            "
            >
            <div ref="innerCard"  class="h-gull px4 py-20 sm:px-10" :class="className" >
                <Noise></Noise>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
