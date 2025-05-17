<script setup lang="ts">
import { SliceSimulator } from "@slicemachine/adapter-nuxt/simulator";
const prismic = usePrismic();
const { data: posts } = await useAsyncData("changelog_posts", () =>
    prismic.client.getAllByType('changelog_post', {
        pageSize: 20
    })
);
</script>

<template lang="pug">
.grid.gap-4
    UtilsChangelogPost(v-for="post in posts", :post="post")
</template>
