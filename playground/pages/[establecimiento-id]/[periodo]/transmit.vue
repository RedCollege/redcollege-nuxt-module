<script setup lang="ts">

    const { transmit } = useTransmit()

    onMounted(async () => {
        const subscription = transmit.subscription('review')

        await subscription.create().then((event) => {
        })


        subscription.onMessage((message) => {
        })
    })

</script>

<template lang="pug">
    div
</template>
