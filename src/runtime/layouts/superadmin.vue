<template lang="pug">
main(class=" min-h-[calc(100vh_-_0px)] py-6 bg-muted dark:bg-zinc-900")
    Toaster
    .container
        Card
            CardHeader
                .flex.gap-2.items-center
                    Button(variant="secondary", size="icon", as-child)
                        NuxtLink(to="/login")
                            Icon(name="tabler:arrow-left", size="16")
                    div
                        CardTitle.text-2xl.text-primary Bienvenido SuperAdmin
                        CardDescription Configura Módulos de Establecimientos
            CardContent
                .space-y-6
                    Separator
                    .flex.flex-col.space-y-8(class="lg:flex-row lg:space-x-12 lg:space-y-0")
                        aside(class="-mx-4 lg:w-1/5")
                            SuperAdminMenu
                        .flex-1(class="")
                            .space-y-6
                                .container.mx-auto
                                    slot
</template>
