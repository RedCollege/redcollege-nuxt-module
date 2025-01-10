<script setup lang="ts">
import type { IMensaje } from '@redcollege/ui-nuxt-module/runtime/models';

import { useThrottleFn, useMouse } from '@vueuse/core'
import { useMotion } from "@vueuse/motion";

const { subscribeToMessage, unsubscribeFromMessage } = useSocket();
const { x, y } = useMouse();
const { randomColor } = useRandomColor();
const mouseHandler = ref(null);
const color = ref(randomColor.value)

const { establecimiento } = useNuxtApp().$apis
const messageId = 5203;

// Manejador para actualizaciones
const handleMessageStatusUpdate = (data: IMensaje) => {
    console.log(data);
};

// Suscribirse al mensaje en mounted
onMounted(() => {
    subscribeToMessage(messageId, handleMessageStatusUpdate);
});

// Cancelar la suscripción en unmounted
onUnmounted(() => {
    unsubscribeFromMessage(messageId);
});

onMounted(() => {
    /*socket.value?.on('mouse-position', data => {
        color.value = data.color
        animateMousePosition({
            x: data.x - 130,
            y: data.y - 130,
            originX: "center",
            originY: "center",
            "transform-origin": "center",
            transition: { duration: 1, ease: "ease-in" },
        })
    })*/
})

/*const emit = () => {
    socket.value?.emit('mouse-position', {
        x: 1,
        y: 2,
        channelId: "iwi",
        color: randomColor.value
    })
}

const sendMousePosition = useThrottleFn(() => {
    socket.value?.emit('mouse-position', {
        x: x.value + 20,
        y: y.value + 20,
        channelId: "iwi",
        color: randomColor.value
    })
}, 50)

const { apply : animateMousePosition, stop } = useMotion(mouseHandler, {
})

watch([x, y], sendMousePosition)*/

</script>

<template lang="pug">
div
    h1 {{ }}
    //-.flex.relative.gap-2.items-center(ref="mouseHandler")
        Icon(name="tabler:pointer-filled", :style="`color: ${color}`")
        .flex.gap-2.max-w-24.rounded-xl.px-2.py-1.justify-center.shadow(:style="`background-color: ${ color }`")
            p.text-xs.text-white.font-medium José Puma
</template>
