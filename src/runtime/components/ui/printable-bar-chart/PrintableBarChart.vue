<script setup lang="ts" generic="T extends Record<string, any>">
import type { BulletLegendItemInterface } from '@unovis/ts'
import type { BaseChartProps } from '.'
import { cn } from '../../../lib/utils'
import { ChartLegend, defaultColors } from '../chart'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type ChartData,
    type ChartOptions
} from 'chart.js'
import { useMounted } from '@vueuse/core'
import { type Component, computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = withDefaults(defineProps<BaseChartProps<T> & {
    /**
     * Render custom tooltip component.
     */
    customTooltip?: Component
    /**
     * Change the type of the chart
     * @default "grouped"
     */
    type?: 'stacked' | 'grouped'
    /**
     * Rounded bar corners
     * @default 0
     */
    roundedCorners?: number
    /**
     * Disable chart animation
     * @default false
     */
    disableAnimation?: boolean
}>(), {
    type: 'grouped',
    margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    filterOpacity: 0.2,
    roundedCorners: 4,
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
    showLegend: true,
    showGridLine: true,
    disableAnimation: false,
})

const emits = defineEmits<{
    legendItemClick: [d: BulletLegendItemInterface, i: number]
}>()

type KeyOfT = Extract<keyof T, string>
type Data = typeof props.data[number]

const index = computed(() => props.index as KeyOfT)
const colors = computed(() => {
    if (props.colors?.length) {
        return props.colors
    }

    // Color por defecto: hsl(201.3, 96.3%, 32.2%)
    const defaultColor = 'hsl(201.3, 96.3%, 32.2%)'

    // Si solo hay una categoría, usar el color por defecto
    if (props.categories.length === 1) {
        return [defaultColor]
    }

    // Si hay múltiples categorías, generar variaciones del color base
    return props.categories.map((_, index) => {
        if (index === 0) return defaultColor

        // Generar variaciones cambiando la luminosidad
        const lightnessVariation = 32.2 + (index * 10) // Incrementar luminosidad
        return `hsl(201.3, 96.3%, ${Math.min(lightnessVariation, 80)}%)`
    })
})

const legendItems = ref<BulletLegendItemInterface[]>(props.categories.map((category, i) => ({
    name: category,
    color: colors.value[i],
    inactive: false,
})))

const isMounted = useMounted()

// Función para manejar el redimensionamiento antes de imprimir
const beforePrintHandler = () => {
    for (let id in ChartJS.instances) {
        ChartJS.instances[id].resize()
    }
}

const afterPrintHandler = () => {
    for (let id in ChartJS.instances) {
        ChartJS.instances[id].resize()
    }
}

onMounted(() => {
    window.addEventListener('beforeprint', beforePrintHandler)
    window.addEventListener('afterprint', afterPrintHandler)
})

onBeforeUnmount(() => {
    window.removeEventListener('beforeprint', beforePrintHandler)
    window.removeEventListener('afterprint', afterPrintHandler)
})

function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
    emits('legendItemClick', d, i)
}

// Transformar la data de unovis format a Chart.js format
const chartData = computed<ChartData<'bar'>>(() => {
    const labels = props.data.map((d, i) => {
        // Usar el formatter si existe, sino usar el index field, sino usar el índice
        if (props.xFormatter) {
            // Crear array de índices para simular el comportamiento de @unovis
            const indices = props.data.map((_, idx) => idx)
            return props.xFormatter(i, i, indices)
        }
        return d[index.value] || `Item ${i + 1}`
    })

    const datasets = props.categories.map((category, categoryIndex) => {
        const data = props.data.map(d => d[category] || 0)
        const color = colors.value[categoryIndex]
        const legendItem = legendItems.value[categoryIndex]

        return {
            label: category,
            data: data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 0,
            borderRadius: {
                topLeft: props.roundedCorners,
                topRight: props.roundedCorners,
                bottomLeft: props.roundedCorners,
                bottomRight: props.roundedCorners,
            },
            borderSkipped: false,
            // Aplicar opacidad si el item está inactivo en la leyenda
            opacity: legendItem?.inactive ? props.filterOpacity : 1
        }
    })

    return {
        labels,
        datasets
    }
})

// Configuración del chart
const chartOptions = computed<ChartOptions<'bar'>>(() => {
    const animationDuration = props.disableAnimation ? 0 : 600

    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: animationDuration
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        scales: {
            x: {
                display: props.showXAxis,
                stacked: props.type === 'stacked',
                grid: {
                    display: false
                },
                ticks: {
                    color: 'hsl(var(--vis-text-color))'
                }
            },
            y: {
                display: props.showYAxis,
                stacked: props.type === 'stacked',
                grid: {
                    display: props.showGridLine,
                    color: 'hsl(201.3, 30%, 50%, 0.2)'
                },
                ticks: {
                    color: 'hsl(var(--vis-text-color))',
                    callback: function (value, index, ticks) {
                        if (props.yFormatter) {
                            // Convertir los ticks de Chart.js al formato esperado por @unovis
                            const tickValues = ticks.map(t => t.value as number)
                            return props.yFormatter(value as number, index, tickValues)
                        }
                        return value
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false // Usamos nuestra leyenda personalizada
            },
            tooltip: {
                enabled: props.showTooltip,
                callbacks: props.customTooltip ? {} : undefined
            }
        },
        layout: {
            padding: {
                top: props.margin?.top || 0,
                right: props.margin?.right || 0,
                bottom: props.margin?.bottom || 0,
                left: props.margin?.left || 0
            }
        }
    }
})

// Watch para actualizar la opacidad cuando cambie legendItems
watch(legendItems, () => {
    // Force reactivity update
}, { deep: true })

// Ref para el componente Bar
const barChartRef = ref()

// Método para actualizar el chart cuando cambie la leyenda
function updateChartVisibility() {
    const chart = barChartRef.value?.chart
    if (!chart) return

    chart.data.datasets.forEach((dataset, index) => {
        const legendItem = legendItems.value[index]
        if (legendItem) {
            dataset.backgroundColor = legendItem.inactive
                ? `${colors.value[index]}${Math.floor(props.filterOpacity * 255).toString(16).padStart(2, '0')}`
                : colors.value[index]
        }
    })

    chart.update()
}

// Watch para actualizar visibilidad cuando cambie legendItems
watch(legendItems, () => {
    updateChartVisibility()
}, { deep: true })
</script>

<template>
    <div :class="cn('w-full h-[400px] flex flex-col items-end', $attrs.class ?? '')">
        <ChartLegend v-if="showLegend" v-model:items="legendItems" @legend-item-click="handleLegendItemClick" />

        <div :style="{ height: isMounted ? '100%' : 'auto' }" class="w-full flex-1">
            <Bar ref="barChartRef" :data="chartData" :options="chartOptions" />
        </div>

        <slot />
    </div>
</template>

<style>
@media print {
    .chart-container {
        width: 100% !important;
        height: auto !important;
    }

    canvas {
        max-width: 100% !important;
        height: auto !important;
    }
}
</style>
