<script setup lang="ts">
import { useNuxtApp } from '#app';

import { onMounted, ref } from 'vue';
import { useNotification } from '../../../composables/states'
import type { IEnsayoConfig, IEvaluacionConfig } from '~/src/runtime/models';

interface Props {
    establecimientoId: number;
    periodo: number;
    ensayo: IEnsayoConfig;
    evaluacion: IEvaluacionConfig
}

const props = defineProps<Props>()
const isEnabled = ref<boolean>(false)
const hasVariations = ref<boolean>(true)
const version = ref<string>("V1")
const { evaluaciones } = useNuxtApp().$apis

const updateEnsayo = (async (isEnsayoEnabled: boolean) : Promise<void> => {
    try{
        props.ensayo.habilitado = isEnsayoEnabled
        const ensayoActualizado = await evaluaciones.simceEstablecimiento.actualizarEvaluacionIndividual(
            props.establecimientoId,
            props.periodo,
            props.evaluacion.gradoEducacionalId,
            props.evaluacion.grupoAsignaturaId,
            props.ensayo.numeroEnsayo,
            props.ensayo.habilitado,
            version.value
        )
        useNotification().toast({
            title: 'Cambios Guardados'
        })
    }catch(error){
        useNotification().toast({
            title: 'Error al guardar los cambios. Contactar con informática',
            variant: 'destructive'
        })
        props.ensayo.habilitado = !isEnsayoEnabled
    }
})

const updateVersion = (async() : Promise<void> => {
    try{
        const ensayoActualizado = await evaluaciones.simceEstablecimiento.actualizarEvaluacionIndividual(
            props.establecimientoId,
            props.periodo,
            props.evaluacion.gradoEducacionalId,
            props.evaluacion.grupoAsignaturaId,
            props.ensayo.numeroEnsayo,
            props.ensayo.habilitado,
            version.value
        )
        useNotification().toast({
            title: 'Cambios Guardados'
        })
    }catch(error){
        useNotification().toast({
            title: 'Error al guardar los cambios. Contactar con informática',
            variant: 'destructive'
        })
    }
})

onMounted(() => {
    version.value = props.ensayo.versionSeleccionada
})

</script>

<template lang="pug">
div.grid.place-items-center.gap-2
    Checkbox(:model-value="ensayo.habilitado", @update:model-value="updateEnsayo")
    AnimatePresence(mode="wait")
        motion(v-if="ensayo.habilitado", layout, key="badge-version", :initial="{ opacity: 0 }", :animate="{ x: 0, opacity: 1 }" :exit="{ opacity: 0, y: 2 }")
            div(v-if="ensayo.tieneMultiplesVersiones")
                Select(v-model="version", @update:model-value="updateVersion")
                    SelectTrigger.w-14.h-7.text-xs
                        SelectValue(placeholder="v1")
                    SelectContent
                        SelectItem.flex.gap-2.items-center(v-for="item in ensayo.versionesDisponibles", :value="item.version") {{ item.version }}
            div(v-else)
                Badge(variant="green") v1
        motion(v-else, :exit="{ opacity: 0, y: 10 }")
            .h-1.w-1.rounded-full.bg-orange.shadow-xl.shadow-orange(v-if="ensayo.tieneMultiplesVersiones")
</template>
