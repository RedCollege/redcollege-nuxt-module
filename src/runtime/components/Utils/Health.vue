<script setup lang="ts">
import { useAsyncData, useNuxtApp } from '#app';
import type { IHealth } from '@redcollege/ui-nuxt-module/runtime/models';
import { ref } from 'vue';


const { health } = useNuxtApp().$apis

const info = ref<IHealth>()

const { data, error, status } = await useAsyncData(() => health.health.get())

if(error.value){
    info.value = error.value?.data as IHealth
}else{
    info.value = data.value as IHealth
}

const bytesToMB =  (bytes: number): number => {
  return Math.round(bytes / (1024 * 1024))
}

</script>

<template lang="pug">
div
    DialogHeader.py-4
        DialogTitle.flex.gap-2
            span Estadisticas
            Badge(variant="green", v-if="info.isHealthy") Disponible
            Badge(variant="destructive", v-else) Alerta
    .grid.grid-cols-1.items-center.gap-4(class="md:grid-cols-2")
        Card.h-full(v-for="check in info?.checks")
            CardHeader.flex.justify-between.flex-row.items-center
                CardTitle {{ check.name }}
                template(v-if="check.status === 'error'")
                    Icon.text-destructive(name="tabler:exclamation-circle", size="20")
                template(v-if="check.status === 'ok'")
                    Icon.text-green(name="tabler:circle-dashed-check", size="20")
            CardContent
                .grid.gap-2
                    .font-medium.text-4xl(:class="{ 'text-destructive' : check.status === 'error' }")
                        template(v-if="check.meta.sizeInPercentage")
                            .flex.items-center.gap-1
                                NumberTicker(:value="check.meta.sizeInPercentage.used", :decimalPlaces="0")
                                span %
                        template(v-else-if="check.meta.memoryInBytes")
                            .flex.items-center.gap-1
                                NumberTicker(:value="bytesToMB(check.meta.memoryInBytes.used)", :decimalPlaces="0")
                                span MB
                        template(v-else-if="check.meta.connectionsCount")
                            .flex.items-center.gap-1
                                NumberTicker(:value="check.meta.connectionsCount.active", :decimalPlaces="0")
                        template(v-else)
                            p :)
                    p.text-muted-foreground.text-sm {{ check.message }}
</template>
