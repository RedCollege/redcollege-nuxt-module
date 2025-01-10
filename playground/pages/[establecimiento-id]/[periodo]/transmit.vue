<script setup lang="ts">

    const { transmit } = useTransmit()

    onMounted(async () => {
        try{
            const subscription = transmit.subscription('channelName')
            await subscription.create()

            subscription.onMessage((data) => {
                console.log(data);
            });
        }catch(error) {

        }

    })

</script>

<template lang="pug">
    div
</template>
