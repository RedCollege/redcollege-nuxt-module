<script setup lang="ts">
interface Props {
    logoUrl: string,
    titulo: string,
    hideCursos?: boolean,
    hidePeriodos?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    logoUrl: '',
    titulo: '',
    hideCursos: false,
    hidePeriodos: false,
})

</script>

<template lang="pug">
Sheet
    SheetTrigger(asChild class="lg:hidden")
        Button.h-8(variant="outline" size="icon")
            Icon(name="tabler:menu-2" size="20")
    SheetContent.px-3.h-full.flex.flex-col(side="left", class="sm:w-72")
        SheetHeader
            Button.flex.justify-center.items-center.pb-2.pt-1(variant="link" as-child)
                NuxtLink.flex.items-center.gap-2(to="/")
                    img(:src="logoUrl", width="30")
                    h5.text-primary.font-bold {{ titulo }}
        SidebarMenu(:isOpen="true")
</template>

