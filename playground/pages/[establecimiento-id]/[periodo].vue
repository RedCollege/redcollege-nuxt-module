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
        Button(@click="showConfetti", variant="secondary") Show confetti
        Button(as-child)
            NuxtLink(to="/103/2024/animations") Go
        NuxtPage
</template>
