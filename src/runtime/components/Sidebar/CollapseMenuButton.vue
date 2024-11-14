<script setup>
import { ref } from 'vue';
import { DropdownMenuArrow } from 'radix-vue';
const props = defineProps({
    icon: String,
    label: String,
    active: Boolean,
    submenus: Array,
    isOpen: Boolean
});

const isSubmenuActive = props.submenus?.some(submenu => submenu.active);
const isCollapsed = ref(isSubmenuActive);
const isMenuOpen = ref(false)

function setIsCollapsed(){

}

</script>

<template lang="pug">
div
    Collapsible(v-if="isOpen" v-model:open="isMenuOpen" @open-change="setIsCollapsed" class="w-full")
        CollapsibleTrigger(as-child class="[&[data-state=open]>div>div>svg]:rotate-180 mb-1")
            Button(:variant="active ? 'secondary' : 'ghost'" class="w-full justify-start h-10")
                div.w-full.flex.justify-between.items-center
                    div.flex.items-center
                        span.mr-4
                            Icon.text-primary(size="20", :name="`tabler:${icon}`")
                        p(
                            :class="['max-w-[150px] truncate',isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0']"
                        ) {{ label }}
                    div(
                        :class="['whitespace-nowrap', isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0']"
                    )
                        Icon(size=18 class="transition-transform duration-200", name="tabler:chevron-down")
        CollapsibleContent(class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down")
            Button(
                v-for="({ href, label, active }, index) in submenus"
                :key="index"
                :variant="active ? 'secondary' : 'ghost'"
                class="w-full justify-start h-10 mb-1"
                asChild=""
            )
                NuxtLink(:href="href")
                    span.mr-4.ml-2
                        Icon(size="10", name="tabler:point-filled")
                    p(
                        :class="['max-w-[170px] truncate', isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0']"
                    ) {{ label }}
    DropdownMenu(v-else)
        DropdownMenuTrigger(as-child)
            Button(:variant="active ? 'secondary' : 'ghost'" class="w-full justify-start h-10 mb-1")
                div.w-full.flex.justify-between.items-center
                    div.flex.items-center
                        span(:class="isOpen === false ? '' : 'mr-4'")
                            Icon.text-primary(size="20", :name="`tabler:${icon}`")
                        p(:class="[ 'max-w-[200px] truncate', isOpen === false ? 'opacity-0' : 'opacity-100' ]")
                            | {{ label }}
        DropdownMenuContent(side="right" :sideOffset="25" align="start")
            DropdownMenuLabel(class="max-w-[190px] truncate")
                | {{ label }}
            DropdownMenuSeparator
            DropdownMenuItem(v-for="({ href, label }, index) in submenus" :key="index" as-child)
                a.cursor-pointer(:href="href")
                    p.truncate(class="max-w-[180px]") {{ label }}
            DropdownMenuArrow(class="fill-border")
</template>
