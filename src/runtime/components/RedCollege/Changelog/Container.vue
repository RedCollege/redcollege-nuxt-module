<script setup lang="ts">
import { useAsyncData } from '#app';
import { usePrismic } from "@prismicio/vue"
const prismic = usePrismic();
const { data: posts } = await useAsyncData("changelog_posts", () =>
    prismic.client.getAllByType('changelog_post', {
        pageSize: 20
    })
);
</script>

<template lang="pug">
.grid.gap-4(v-if="posts")
    RedCollegeChangelogPost(v-for="post in posts", :post="post")
</template>
