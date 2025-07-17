<script setup lang="ts">
import { isFilled, asDate } from "@prismicio/client";
import type { ChangelogPostDocumentData } from "@/prismicio-types";
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { computed } from "vue";
import Paragraph from "../../slices/Paragraph.vue";
import ListItem from "../../slices/ListItem.vue";
import Image from "../../slices/Image.vue";
import Embed from "../../slices/Embed.vue";

interface Props {
    post: {
        data: ChangelogPostDocumentData
    }
}

const props = defineProps<Props>()
const df = new DateFormatter('en-US', {
    dateStyle: 'long',
})

const fechaFormateada = computed(() : string => {
    if(isFilled.timestamp(props.post.data.fecha_del_changelog)){
        const timestamp = asDate(props.post.data.fecha_del_changelog);
        return timestamp.toLocaleString()
    }
    return ""
})



</script>

<template lang="pug">
div
    Card
        CardHeader
            .flex.justify-between.items-center
                CardTitle {{ post.data.titulo_del_changelog }}
                .flex.gap-2.items-center.flex-none
                    Badge {{ post.data.modulo }}
                    Badge(variant="outline") {{ fechaFormateada }}
        CardContent
            .p-6.border.shadow-sm.rounded-xl
                PrismicRichText(:field="post.data.resumen_de_cambios", :components="{ paragraph: Paragraph, listItem: ListItem, image: Image, embed: Embed }")
</template>
