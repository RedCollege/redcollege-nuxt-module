<script setup lang="ts">

interface Item {
    title: string
    href: string
}

const sidebarNavItems: Item[] = [
    {
        title: 'Mi Perfil',
        href: '/settings/mi-perfil',
    },
    {
        title: 'Account',
        href: '/settings/mi-perfil',
    },
    {
        title: 'Appearance',
        href: '/settings/mi-perfil',
    },
    {
        title: 'Notifications',
        href: '/settings/mi-perfil',
    },
    {
        title: 'Display',
        href: '/settings/mi-perfil',
    },
]
</script>

<template lang="pug">
nav(class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")
    Button(
        v-for="item in sidebarNavItems"
        :key="item.title"
        as-child
        variant="ghost"
        class="w-full text-left justify-start"
    )
        NuxtLink(:to="item.href") {{ item.title }}
</template>
