<!-- ~/components/richtext/CustomEmbed.vue -->
<template lang="pug">
.w-full.max-w-4xl.mx-auto.my-6(v-if="isLoom && loomEmbedUrl")
    .relative.w-full.overflow-hidden.rounded-lg
        iframe.w-full(
            height="400"
            :src="loomEmbedUrl"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            loading="lazy"
            )
        .mt-3.text-center(v-if="embedData?.title")
        | {{ embedData.title }}

div(v-else)
    | Embed no soportado
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface OembedData {
    embed_url?: string
    type?: string
    title?: string
    provider_name?: string
    html?: string
}

interface Props {
    oembed?: OembedData
    type?: string
    // También acepta las props que podrían venir del node
    node?: {
    type: string
    oembed: OembedData
    }
}

const props = defineProps<Props>()

// Obtener oembed desde props directamente o desde node
const embedData = computed(() => props.oembed || props.node?.oembed)

const isLoom = computed(() =>
    embedData.value?.provider_name?.toLowerCase() === 'loom'
)

const loomEmbedUrl = computed(() => {
    if (!isLoom.value || !embedData.value?.embed_url) return ''

    const url = embedData.value.embed_url
    const match = url.match(/loom\.com\/share\/([a-zA-Z0-9-]+)/)

    if (match) {
    return `https://www.loom.com/embed/${match[1]}`
    }

    return url
})
</script>
