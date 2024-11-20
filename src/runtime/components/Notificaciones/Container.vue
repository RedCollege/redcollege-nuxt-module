<template lang="pug">
Popover
    PopoverTrigger(as-child)
        BadgeCounter(:total="1")
            Button(variant="ghost" size="icon")
                Icon.text-primary(name="tabler:bell", size="20")
    PopoverContent.min-w-96.grid.gap-4(class="lg:w-[400px]")
        .px-2
            h5.font-medium.leading-none Notificaciones
        ScrollArea(class="max-h-[calc(100vh_-_325px)]")
            div.grid.gap-2
                NotificacionesCard(v-for="i in 40")
        Button Marcar Todas Como Leídas
</template>
