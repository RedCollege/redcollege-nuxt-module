<script setup lang="ts">
import { useAsyncData, useNuxtApp } from '#app'
import { ref } from 'vue'
import type { IEstablecimiento, IEstablecimientoResponse } from '../../models'


const { establecimiento, evaluaciones } = useNuxtApp().$apis
const searchedText = ref<string>("")
const isBuscadorEstablecimientoOpen = ref<boolean>(false)
const periodo = ref<string>("2025")
const establecimientosData = ref<IEstablecimientoResponse>()
const selectedEstablecimiento = ref<IEstablecimiento | null>(null)
const page = ref<number>(1)

const { data: configuracionEstablecimiento } = await useAsyncData(
    `configuracion-evalua-${selectedEstablecimiento.value?.id || 0}`,
    async () => {
        // No ejecutar si no hay establecimiento seleccionado
        if (!selectedEstablecimiento.value?.id) {
            return Promise.resolve(null);
        }

        return evaluaciones.simceEstablecimiento.obtenerConfiguracionEstablecimiento(
            selectedEstablecimiento.value.id,
            Number(periodo.value)
        );
    },
    {
        watch: [selectedEstablecimiento],
        default: () => null
    }
);

const handleInput = async (event: Event) => {
    searchedText.value = (event.target as HTMLInputElement).value
    if (searchedText.value != '') {
        establecimientosData.value = await establecimiento.establecimiento.obtenerEstablecimientos(searchedText.value, page.value)
    }
}

const selectEstablecimiento = async (establecimiento: IEstablecimiento) => {
    selectedEstablecimiento.value = establecimiento
    isBuscadorEstablecimientoOpen.value = false
}

const buscarEstablecimiento = (() : void => {
    selectedEstablecimiento.value = null
    isBuscadorEstablecimientoOpen.value = true
})

</script>

<template lang="pug">
div.grid.gap-2
    CommandDialog(v-model:open="isBuscadorEstablecimientoOpen", :ignore-filter="true")
        CommandInput(placeholder="Buscar..." @input="handleInput")
        CommandList
            CommandEmpty Sin resultados
            CommandGroup(heading="Establecimientos")
                CommandItem.gap-2.cursor-pointer(v-for="establecimiento in establecimientosData?.data", :value="establecimiento.id" class="py-1.5", @click="selectEstablecimiento(establecimiento)")
                    img.w-6.h-6.rounded-full(:src="establecimiento.logo", v-if="establecimiento.logo")
                    .w-6.h-6.bg-gray-200.rounded-full(v-else)
                    span {{ establecimiento.nombre }}
    AnimatePresence(mode="wait")
        Motion(as-child, :exit="{ opacity: 0 }", :transition="{ type: 'spring' }" :initial="{ opacity: 0, y: -20 }" :animate="{ opacity: 1, y: 0 }" v-if="selectedEstablecimiento && configuracionEstablecimiento", key="show-evaluaciones")
            Card()
                CardHeader
                    div.flex.justify-between.gap-2
                        div
                            CardTitle.truncate.flex.gap-2.place-items-center
                                span Configurar {{ selectedEstablecimiento.nombre }}
                                Badge(variant="outline") {{ configuracionEstablecimiento.periodo }}
                            CardDescription Puedes elegir que variación de evaluación recibirá el establecimiento
                        Button(@click="buscarEstablecimiento")
                            Icon(name="tabler:search")
                            span Buscar Establecimiento
                CardContent
                    ScrollArea(class="h-[calc(100vh_-_315px)]")
                        Table
                            TableCaption Configura los ensayos por establecimiento
                            TableHeader
                                TableRow
                                    TableHead Ensayos
                                    TableHead.text-center(v-for="i in 7") {{i}}
                            TableBody
                                Motion(as-child, v-for="(evaluacion, index) in configuracionEstablecimiento.evaluaciones", :transition="{ type: 'spring', delay: index * 0.05 }" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }")
                                    TableRow(:class="{ 'bg-primary/5' : index % 2 === 0 }")
                                        TableCell {{ evaluacion.nombre }}
                                        TableCell.w-16(v-for="ensayo in evaluacion.ensayos")
                                            SuperAdminEvaluaEstablecimientoRowEnsayo(:ensayo="ensayo", :key="`${selectedEstablecimiento.id}-${evaluacion.nombre}-${ensayo.numeroEnsayo}-${index}`" :evaluacion="evaluacion", :establecimiento-id="selectedEstablecimiento.id", :periodo="Number(periodo)")
        Motion(as-child, :exit="{ opacity: 0, y: -20 }", v-else, key="hide-evaluaciones")
            Card.grid.place-content-center(class="h-[calc(100vh_-_200px)]")
                div.text-center.grid.gap-2
                    Button(@click="buscarEstablecimiento")
                            Icon(name="tabler:search")
                            span Buscar Establecimiento
                    CardDescription Elige un establecimiento para configurarlo
</template>
