<script setup lang="ts">
import { useAsyncData } from '#app';
import { usePrismic } from "@prismicio/vue"
const prismic = usePrismic();
const { data: posts } = await useAsyncData("changelog_posts", () =>
    prismic.client.getAllByType('changelog_post', {
        pageSize: 20,
        orderings: {
            field: 'document.first_publication_date',
            direction: 'desc'
        }
    })
);
</script>

<template lang="pug">
.flex.flex-col.gap-4(v-if="posts")
    RedCollegeChangelogPost(v-for="post in posts", :post="post")
</template>
