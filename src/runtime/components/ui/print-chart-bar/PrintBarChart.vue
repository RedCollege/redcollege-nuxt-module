<script setup lang="ts" generic="T extends Record<string, any>">
import { Bar } from 'vue-chartjs'
import type { BaseChartProps } from '.';
import { defaultColors } from '.';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions
} from 'chart.js'
import { computed, watch, nextTick } from 'vue'

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

type KeyOf<T extends Record<string, any>> = Extract<keyof T, string>

const props = withDefaults(defineProps<BaseChartProps<T>>(), {
  filterOpacity: 0.2,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showLegend: true,
  showGridLine: true,
  type: 'grouped',
  roundedCorners: 0,
  disableAnimation: false,
})

type KeyOfT = Extract<keyof T, string>
type Data = typeof props.data[number]

const index = computed(() => props.index as KeyOfT)


// Función para convertir colores HSL con variables CSS a valores RGB
const resolveColor = (color: string): string => {
  if (color.startsWith('hsl(var(')) {
    // Crear un elemento temporal para resolver la variable CSS
    const tempDiv = document.createElement('div')
    tempDiv.style.color = color
    document.body.appendChild(tempDiv)
    const computedColor = window.getComputedStyle(tempDiv).color
    document.body.removeChild(tempDiv)
    
    // Si el color se resolvió correctamente, lo convertimos
    if (computedColor && computedColor !== 'rgba(0, 0, 0, 0)') {
      return computedColor
    }
    
    // Si no se puede resolver, usar un color de fallback
    return '#6366f1' // Color por defecto
  }
  return color
}

// Colores computados usando defaultColors si no se proporcionan colores personalizados
const computedColors = computed(() => {
  if (props.colors && props.colors.length > 0) {
    return props.colors.map(resolveColor)
  }
  
  // Usar defaultColors pero resolverlos a colores válidos
  const generatedColors = defaultColors(props.categories.length)
  const resolvedColors = generatedColors.map(resolveColor)
  
  // Verificar que tenemos colores válidos, si no usar fallback
  const hasValidColors = resolvedColors.every(color => 
    color && color !== '#6366f1' && !color.includes('undefined')
  )
  
  if (hasValidColors) {
    return resolvedColors
  }
  
  // Fallback a colores sólidos con la misma lógica de defaultColors
  const fallbackColors = [
    '#3b82f6', '#10b981', '#f59e0b', // Colores primarios
    '#8b5cf6', '#ef4444', '#06b6d4'  // Colores secundarios
  ]
  
  // Repetir colores si necesitamos más
  const finalColors = []
  for (let i = 0; i < props.categories.length; i++) {
    finalColors.push(fallbackColors[i % fallbackColors.length])
  }
  
  return finalColors
})

// Generar datos del gráfico
const chartData = computed((): ChartData<'bar'> => {
  const labels = props.data.map(item => {
    const value = item[index.value]
    return props.xFormatter ? props.xFormatter(value) : String(value)
  })

  const datasets = props.categories.map((category, i) => {
    const baseColor = computedColors.value[i % computedColors.value.length]
    return {
      label: String(category),
      data: props.data.map(item => Number(item[category]) || 0),
      backgroundColor: baseColor.includes('rgba') ? baseColor : baseColor + '80', // Agregar transparencia solo si no es rgba
      borderColor: baseColor.includes('rgba') ? baseColor.replace(/[\d\.]+\)$/g, '1)') : baseColor, // Opacidad completa para el borde
      borderWidth: 1,
      borderRadius: props.roundedCorners,
      borderSkipped: false,
    }
  })

  return {
    labels,
    datasets
  }
})

// Opciones del gráfico
const chartOptions = computed((): ChartOptions<'bar'> => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: props.disableAnimation ? 0 : 750,
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    legend: {
      display: props.showLegend,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        generateLabels: (chart) => {
          const datasets = chart.data.datasets
          return datasets.map((dataset, i) => ({
            text: dataset.label || '',
            fillStyle: computedColors.value[i % computedColors.value.length],
            strokeStyle: computedColors.value[i % computedColors.value.length],
            lineWidth: 0,
            pointStyle: 'rect' as const,
            hidden: false,
            datasetIndex: i
          }))
        }
      }
    },
    tooltip: {
      enabled: props.showTooltip,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      callbacks: {
        label: (context) => {
          const label = context.dataset.label || ''
          const value = context.parsed.y
          const formattedValue = props.yFormatter ? props.yFormatter(value) : value
          return `${label}: ${formattedValue}`
        },
        labelColor: (context) => ({
          borderColor: computedColors.value[context.datasetIndex % computedColors.value.length],
          backgroundColor: computedColors.value[context.datasetIndex % computedColors.value.length]
        })
      }
    }
  },
  scales: {
    x: {
      display: props.showXAxis,
      grid: {
        display: props.showGridLine,
        color: 'rgba(0, 0, 0, 0.03)', // Grilla muy sutil para el eje X
      },
      ticks: {
        callback: function(value, index) {
          const label = this.getLabelForValue(Number(value))
          return props.xFormatter ? props.xFormatter(label) : label
        }
      }
    },
    y: {
      display: props.showYAxis,
      beginAtZero: true,
      grid: {
        display: props.showGridLine,
        color: 'rgba(0, 0, 0, 0.03)', // Grilla sutil para el eje Y
      },
      ticks: {
        callback: function(value) {
          return props.yFormatter ? props.yFormatter(Number(value)) : value
        }
      },
      stacked: props.type === 'stacked'
    }
  },
  datasets: {
    bar: {
      categoryPercentage: 0.8,
      barPercentage: 0.9,
    }
  }
}))

// Key para forzar re-render cuando cambian los datos
const chartKey = computed(() => 
  `${JSON.stringify(props.data)}-${props.categories.join('-')}-${props.type}`
)
</script>

<template>
  <div class="w-full h-full">
    <Bar 
      :key="chartKey"
      :data="chartData" 
      :options="chartOptions"
    />
  </div>
</template>