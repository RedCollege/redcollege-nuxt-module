<template lang="pug">
Sheet
    SheetTrigger(asChild class="lg:hidden")
        Button.h-8(variant="outline" size="icon")
            Icon(name="tabler:menu-2" :size="20")
    SheetContent.px-3.h-full.flex.flex-col(side="left", class="sm:w-72")
        SheetHeader
            Button.flex.justify-center.items-center.pb-2.pt-1(variant="link" asChild="")
                a.flex.items-center.gap-2(href="/dashboard")
                    Icon.w-6.h-6.mr-1(name="tabler:menu-2")
                    h1.font-bold.text-lg Brand
        SidebarMenu(:isOpen="true")
</template>

