<script setup lang="ts">
import { ref } from 'vue'
const value = ref(70)

const { copyDebugReportToClipboard } = useDebugReportGenerator()

// Prueba si se captura este error
console.error('Esto debería ser capturado');

const generarReporte = async () => {
    await copyDebugReportToClipboard(false)
}

const error = () => {
    console.error("owowowow")
}

</script>

<template lang="pug">
div
    .h-12
        motion.bg-green.h-32.w-32.shadow-xl.rounded-lg(element="div" :animate="{ rotate: 360 }" :transition="{ duration: 10 }")
        Progress(v-model="value", :variant="`${value < 5 ? 'destructive' : '' }`")
        NumberField(id="age" :default-value="18" :min="0")
            Label(for="age") Age
            NumberFieldContent
                NumberFieldDecrement
                NumberFieldInput
                NumberFieldIncrement
        Button(@click="error") error
        Button(@click="generarReporte", type="button") Generar Reporte
</template>
