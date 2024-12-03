<script setup lang="ts">
import type { IHealth } from '@redcollege/ui-nuxt-module/runtime/models';


const { health } = useNuxtApp().$apis

const info = ref<IHealth>()

const { data, error, status } = await useAsyncData(() => health.health.get())

if(error.value){
    info.value = error.value?.data as IHealth
}else{
    info.value = data.value as IHealth
}

</script>

<template lang="pug">
div
    NumberTicker(:value="100", :decimalPlaces="0")
</template>
