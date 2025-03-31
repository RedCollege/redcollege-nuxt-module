<script setup lang="ts">
const value = ref(70)

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
</template>
