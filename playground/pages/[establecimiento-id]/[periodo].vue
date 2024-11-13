<script setup lang="ts">
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
const value = ref(today(getLocalTimeZone())) as Ref<DateValue>

const confetti = useConfetti()

const showConfetti = () => {
    confetti.showConfetti()
}

</script>

<template lang="pug">
    .w-64
        Card
            Button(@click="showConfetti") Show confetti
            Calendar(v-model="value" :weekday-format="'short'" locale="es" class="rounded-md border")
            NuxtPage
</template>
