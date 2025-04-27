<script setup lang="ts">
import { vInfiniteScroll } from '@vueuse/components'
import type { IMatricula } from '@redcollege/ui-nuxt-module/runtime/models';
import { useInfiniteScroll } from '@vueuse/core'
const el = ref<HTMLElement | null>(null)
const { matriculas } = useNuxtApp().$apis
const page = ref(1);
const lastPage = ref(1);
const matris = ref<IMatricula[]>([])



onMounted(async () => {
    await nextTick()

    useInfiniteScroll(el, async () => {
        const data = await matriculas.matricula.getByEstablecimiento({
            establecimiento: 103,
            periodo: "2024",
            page: page.value
        })
        matris.value?.push(...data.data)
        lastPage.value = data.meta.lastPage
        page.value++
    }, {
        distance: 10,
        canLoadMore: () => {
            return page.value <= lastPage.value
        }
    })
})

</script>

<template lang="pug">
ScrollArea.max-h-128
    div.result.grid.gap-2.max-w-96(ref="el")
        p(v-for="matri in matris") {{ matri.id }}
</template>
