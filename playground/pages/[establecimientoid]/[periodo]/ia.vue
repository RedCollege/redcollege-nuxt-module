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
        const response: ExecutePromptSSEResponse = await openai.openAi.executePromptSSE(366, 1, 'generate-course', {
            curso: "1 Enseñanza Básica A",
            /*asignatura: "Matemática",
            balancegeneral: "pregunta 1: ¿Cómo venir a clases?",
            evaluacion: "Promedio del curso: 479",
            analisisindividual: "",
            analisisdeindicadores: ""*/
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
