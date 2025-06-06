<script lang="ts" setup>

import { useSidebar } from "#imports";
import { cn } from "../../lib/utils";
import { ref } from 'vue';

import { storeToRefs } from "pinia";
const { menuList } = storeToRefs(useSidebar())

interface Props {
    isOpen: boolean
}

const props = defineProps<Props>()

</script>

<template lang="pug">
ScrollArea(class="[&>div>div[style]]:!block")
    nav.mt-8.h-full.w-full
        ul.flex.flex-col(class="min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-1")
            li(v-for="({ groupLabel, menus }, index) in menuList" :key="index" :class="['w-full', groupLabel ? 'pt-5' : '']")
                p.text-sm.font-medium.text-muted-foreground.px-4.pb-2.truncate(class="max-w-[248px]" v-if="(isOpen && groupLabel) || isOpen === undefined") {{ groupLabel }}

                TooltipProvider(v-else-if="!isOpen && isOpen !== undefined && groupLabel")
                    Tooltip(:delayDuration="100")
                        TooltipTrigger(class="w-full")
                            div.w-full.flex.justify-center.items-center
                                Icon.text-muted-foreground(size="20", name="tabler:dots")
                        TooltipContent(side="right")
                            p {{ groupLabel }}

                p.pb-2(v-else)
                template(v-for="({ href, label, icon, active, submenus }, index) in menus")
                    div.w-full(v-if="submenus?.length === 0" :key="index")
                        TooltipProvider(disableHoverableContent)
                            Tooltip(:delayDuration="100")
                                TooltipTrigger(as-child)
                                    Button(
                                        :variant="active ? 'secondary' : 'ghost'"
                                        class="w-full justify-start h-10 mb-1"
                                        as-child
                                    )
                                        NuxtLink(:to="href")
                                            span(:class="isOpen === false ? '' : 'mr-4'")
                                                Icon.text-primary(:name="`tabler:${icon}`", size="20")
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
