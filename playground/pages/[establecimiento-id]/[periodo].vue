<script setup lang="ts">
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
const value = ref(today(getLocalTimeZone())) as Ref<DateValue>

const confetti = useConfetti()

const showConfetti = () => {
    confetti.showConfetti()
}

</script>

<template lang="pug">
        Card
            Button(@click="showConfetti") Show confetti
            NuxtPage
</template>
