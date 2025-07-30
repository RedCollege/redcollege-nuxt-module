<script setup lang="ts">
import type { ExecutePromptSSEResponse, SSEEvent } from '@redcollege/ui-nuxt-module/runtime/models/OpenAI/openai'
import markdownit from 'markdown-it'

const md = markdownit({
    breaks: false
})
const { transmit } = useTransmit()
const { openai } = useNuxtApp().$apis
const message = ref<string>("")
const isGenerating = ref(false)

md.renderer.rules.heading_open = (tokens, idx) => {
    const token = tokens[idx];
    const level = token.markup.length;
    const classes: { [key: string]: string } = {
        1: 'text-xl text-primary font-semibold text-gray-900 tracking-tight',
        2: 'text-lg text-primary font-semibold leading-none tracking-tight',
        3: 'text-md font-medium tracking-tight'
    };

    return `<h${level} class="${classes[String(level)] || 'text-xl font-medium'}">`;
};

// Convertir <br> en nuevos párrafos
md.renderer.rules.hardbreak = () => '</p><p class="text-gray-700">';

md.renderer.rules.paragraph_open = () =>
    '<p class="text-base">';

md.renderer.rules.table_open = () =>
    '<div class="overflow-x-auto"><table class="min-w-full bg-white border border-gray-200">';

md.renderer.rules.thead_open = () =>
    '<thead class="bg-gray-50">';

md.renderer.rules.th_open = () =>
    '<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">';

md.renderer.rules.td_open = () =>
    '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">';

// Listas no ordenadas (ul)
md.renderer.rules.bullet_list_open = () =>
    '<ul class="list-disc list-inside ml-6 space-y-2">';

// Listas ordenadas (ol)
md.renderer.rules.ordered_list_open = () =>
    '<ol class="list-decimal list-inside space-y-2 text-gray-700 ml-4">';

// Items de lista (li)
md.renderer.rules.list_item_open = () =>
    '<li class="flex items-start gap-3"><div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div><div class="text-gray-700 leading-relaxed">';

// Para listas anidadas con mejor espaciado
md.renderer.rules.bullet_list_close = () => '</ul>';
md.renderer.rules.ordered_list_close = () => '</ol>';
md.renderer.rules.list_item_close = () => '</li>';

let currentSubscription: any = null

const generarInforme = async () => {
    try {
        isGenerating.value = true
        message.value = ""

        // Tipado de la respuesta del endpoint
        const response: ExecutePromptSSEResponse = await openai.openAi.executePromptSSE(366, 2, 'generate-unidad-planificacion', {
            pais: "Chile",
            asignatura: "Matemática",
            curso: "1 ENSEÑANZA BÁSICA A",
            componente_curricular: "[]",
            descripcion_unidad: "Los días de la semana",
            cantidad_clases: "5",
            titulo_unidad: "Unidad 1",
            periodo: "2025"

        }, {
            max_output_tokens: 1024
        })

        if (!response.success) {
            console.error('Error:', response.error)
            return
        }

        const { channelId } = response

        if (currentSubscription) {
            await currentSubscription.delete()
        }

        currentSubscription = transmit.subscription(channelId)
        await currentSubscription.create()

        // Tipado del mensaje SSE
        currentSubscription.onMessage((msg: SSEEvent) => {
            switch (msg.type) {
                case 'stream_start':
                    console.log('🚀 Streaming iniciado para:', msg.data.templateRoute)
                    break

                case 'content_chunk':
                    // TypeScript sabe que msg.data tiene content y totalLength
                    message.value += msg.data.content
                    console.log(`📝 Contenido total: ${msg.data.totalLength} caracteres`)
                    break

                case 'stream_info':
                    console.log('ℹ️ Response ID:', msg.data.responseId)
                    if (msg.data.usage) {
                        console.log('🔢 Tokens usados:', msg.data.usage.total_tokens)
                    }
                    break

                case 'stream_complete':
                    console.log('✅ Completado:', {
                        duration: msg.data.duration,
                        tokens: msg.data.usage?.total_tokens,
                        responseId: msg.data.responseId
                    })
                    isGenerating.value = false
                    currentSubscription?.delete()
                    currentSubscription = null
                    break

                case 'stream_error':
                    console.error('❌ Error:', msg.data.error)
                    if (msg.data.message) {
                        console.error('Detalle:', msg.data.message)
                    }
                    isGenerating.value = false
                    currentSubscription?.delete()
                    currentSubscription = null
                    break

                case 'connection_established':
                    console.log('🔗 Conectado al canal:', msg.data.channelId)
                    break

                case 'stream_event':
                    console.log('📡 Evento OpenAI:', msg.data.eventType)
                    break
            }
        })

    } catch (error) {
        console.error('Error generando informe:', error)
        isGenerating.value = false
    }
}

const data = computed(() => {
    return md.render(message.value);
})

onUnmounted(() => {
    if (currentSubscription) {
        currentSubscription.delete()
    }
})

/**
 * Eres un experto en diseño curricular de {{pais}}. Genera una planificación de una unidad para la asignatura de {{asignatura}} en el {{curso}}, siguiendo las bases curriculares oficiales de este país para el año escolar {{periodo}}.

Genera la planificación de la unidad tomando los siguientes datos:
- Título de la unidad: {{titulo_unidad}}
- Descripción de la unidad: {{descripcion_unidad}}
- Cantidad de clases: {{cantidad_clases}}

Tienes que trabajar con los siguientes componentes curriculares asociados a la unidad:
{{componente_curricular}}

## ESTRUCTURA REQUERIDA

Genera un array JSON con contenidos detallados donde cada elemento contenga:

### Campos obligatorios:
- **titulo**: Título claro y específico del contenido (ej: "Introducción a las fracciones")
- **contenidoPlanificado**: Descripción detallada de qué conceptos, habilidades o conocimientos específicos se enseñarán
- **fechaInicio**: Fecha ISO 8601 calculada secuencialmente (ej: "2025-07-02T20:00:00.000-04:00")
- **fechaFin**: Fecha ISO 8601 una semana después del inicio
- **isCumplido**: false (por defecto para contenidos nuevos)
- **isVisible**: true (por defecto)
- **evaluacion**: Descripción completa incluyendo:
  - Tipo: formativa o sumativa
  - Instrumento específico (rúbrica, lista de cotejo, prueba, etc.)
  - 2-3 criterios observables concretos
- **actividades**: Array con mínimo 2 actividades, cada una con:
  - id: número secuencial
  - descripcion: Pasos detallados y específicos que ejecutará el docente con los estudiantes
- **recursos**: Array con materiales concretos y realistas, cada uno con:
  - id: número secuencial
  - descripcion: Material específico (ej: "Bloques multibase", "Fichas de ejercicios impresas")
- **objetivosAprendizaje**: Array vinculando con los componentes curriculares dados, cada uno con:
  - alias: Código oficial del objetivo (ej: "MA01 OA 01")
  - descripcion: Texto completo del objetivo de aprendizaje
- **asignatura**: Objeto con:
  - id: 1
  - grado: número correspondiente al curso
- **adecuacionesCurriculares**: Array vacío []
- **haveAdecuaciones**: false

## CRITERIOS DE CALIDAD

1. **Cobertura curricular completa**: Todos los componentes curriculares proporcionados deben estar representados en los objetivos de aprendizaje
2. **Progresión pedagógica**: Los contenidos deben seguir una secuencia lógica de complejidad creciente
3. **Fechas secuenciales**: Calcular fechas consecutivas, una semana de duración cada contenido
4. **Actividades específicas**: No usar generalidades como "explicar el tema", sino pasos concretos y metodologías específicas
5. **Recursos realistas**: Materiales que efectivamente se usan en aulas de {{pais}} para {{asignatura}} en {{curso}}
6. **Evaluaciones auténticas**: Instrumentos apropiados para el nivel educativo y tipo de contenido

## FORMATO DE SALIDA

Devuelve exclusivamente un array JSON válido, sin texto adicional, comentarios o explicaciones. El JSON debe ser parseable directamente. con un máximo de 4 contenidos, asegurando que la respuesta no exceda 2048 tokens.

 */
</script>


<template lang="pug">
div
    Button(
        @click="generarInforme"
        type="button"
        :disabled="isGenerating"
    )
        span(v-if="isGenerating") Generando...
        span(v-else) Generar Informe

    div(v-if="message" class="whitespace-pre-wrap mt-4")
        .grid.gap-4(v-html="data")

    div(v-if="isGenerating" class="mt-4")
        p Generando respuesta...
</template>
