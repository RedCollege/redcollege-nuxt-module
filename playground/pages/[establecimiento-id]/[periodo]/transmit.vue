<script setup lang="ts">

    const { transmit } = useTransmit()

    onMounted(async () => {
        const subscription = transmit.subscription('review')
        console.log('subscription creating...')

        await subscription.create().then((event) => {
        console.log('subscription created', event)
        })

        console.log('starting to listen for messages...')

        subscription.onMessage((message) => {
        console.log(message, '<<< came here')
        })
    })

</script>

<template lang="pug">
    div
</template>
