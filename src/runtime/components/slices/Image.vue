// components/PrismicImage.vue
<script setup lang="ts">
// Define el tipo para las props
interface Props {
    node: {
        url: string;
        alt: string | null;
        dimensions?: {
            width: number;
            height: number;
        };
    };
}

// Define las props con TypeScript
const props = defineProps<Props>();
</script>

<template lang="pug">
    img.rounded-xl.border.w-full(:src="props.node.url" :alt="props.node.alt || ''" loading="lazy")
</template>
