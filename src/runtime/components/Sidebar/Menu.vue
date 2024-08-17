<script lang="ts" setup>

import { cn } from "../../lib/utils";
import { ref } from 'vue';

interface Props {
    isOpen: boolean
}

const props = defineProps<Props>()

const menus = ref([
    {
        groupLabel: "",
        menus: [
            {
                href: "/dashboard",
                label: "Inicio",
                active: false,
                icon: 'home',
                submenus: []
            },
            {
                href: "/dashboard",
                label: "Auditoría General",
                active: false,
                icon: 'clipboard-data',
                submenus: []
            }
        ]
    },
    {
        groupLabel: "General",
        menus: [
            {
                href: "",
                label: "Planificaciones",
                active: false,
                icon: 'calendar-clock',
                submenus: [
                    {
                        href: "/posts",
                        label: "Mis Planificaciones",
                        active: true,
                    },
                    {
                        href: "/posts/new",
                        label: "Mis Profesores",
                        active: false,
                    }
                ]
            },
            {
                href: "/categories",
                label: "Comunidad",
                active: false,
                icon: 'friends',
                submenus: []
            }
        ]
    },
    {
        groupLabel: "Settings",
        menus: [
            {
                href: "/users",
                label: "Papelera",
                active: false,
                icon: 'trash',
                submenus: []
            },
            {
                href: "/account",
                label: "Configuración",
                active: false,
                icon: 'settings',
                submenus: []
            }
        ]
    }
])

</script>

<template lang="pug">
ScrollArea(class="[&>div>div[style]]:!block")
    nav.mt-8.h-full.w-full
        ul.flex.flex-col(class="min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2")
            li(v-for="({ groupLabel, menus }, index) in menus" :key="index" :class="['w-full', groupLabel ? 'pt-5' : '']")
                p.text-sm.font-medium.text-muted-foreground.px-4.pb-2.truncate(class="max-w-[248px]" v-if="(isOpen && groupLabel) || isOpen === undefined") {{ groupLabel }}

                TooltipProvider(v-else-if="!isOpen && isOpen !== undefined && groupLabel")
                    Tooltip(:delayDuration="100")
                        TooltipTrigger(class="w-full")
                            div.w-full.flex.justify-center.items-center
                                Icon.text-muted-foreground(:size="20", name="tabler:dots")
                        TooltipContent(side="right")
                            p {{ groupLabel }}

                p.pb-2(v-else)

                template(v-for="({ href, label, icon, active, submenus }, index) in menus")
                    div.w-full(v-if="submenus.length === 0" :key="index")
                        TooltipProvider(disableHoverableContent)
                            Tooltip(:delayDuration="100")
                                TooltipTrigger(as-child)
                                    Button(
                                        :variant="active ? 'secondary' : 'ghost'"
                                        class="w-full justify-start h-10 mb-1"
                                        as-child
                                    )
                                        NuxtLink(to="/")
                                            span(:class="isOpen === false ? '' : 'mr-4'")
                                                Icon.text-sky-700(:name="`tabler:${icon}`", size="18")
                                            p(:class="['max-w-[200px] truncate', isOpen === false ? '-translate-x-96 opacity-0' : 'translate-x-0 opacity-100']") {{ label }}
                                TooltipContent(side="right", v-if="isOpen === false") {{ label }}
                    SidebarCollapseMenuButton(
                        v-else
                        :icon="icon",
                        :label="label"
                        :active="active"
                        :submenus="submenus"
                        :isOpen="isOpen"
                        )
</template>
