<script setup lang="ts">
import { DateTime } from 'luxon'
import type { IUsuario } from '@redcollege/ui-nuxt-module/module';


const { planificaciones } = useNuxtApp().$apis;

const algo = planificaciones.planificacion.getAll()

import { storeToRefs } from 'pinia';

const isOpen = ref(false)
const { selectedEstablecimientoId } = storeToRefs(useNavbar())

useNavbar().setHideCursos(true)

useSidebar().setMenuList([
    {
        groupLabel: "",
        menus: [
            {
                href: "/",
                label: "Inicio",
                active: false,
                icon: 'home',
                submenus: []
            },
            {
                href: "/",
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
                href: "/",
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
                href: "/",
                label: "Papelera",
                active: false,
                icon: 'trash',
                submenus: []
            },
            {
                href: "/",
                label: "Configuración",
                active: false,
                icon: 'settings',
                submenus: []
            }
        ]
    }
])

function notificate(){
    useNotification().toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
    })
}

</script>

<template>
    <NuxtLayout name="dashboard">
        <Button @click="notificate">Notificate</Button>
        <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2">
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

            <template v-for="(item, index) in items">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                <Button class="w-9 h-9 p-0" :variant="item.value === page ? 'default' : 'outline'">
                    {{ item.value }}
                </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
            </PaginationList>
        </Pagination>
        <AlertDialog>
            <AlertDialogTrigger as-child>
            <Button variant="outline">
                Show Dialog
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
            <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
            </SheetContent>
        </Sheet>
        <div class="my-2">
            <Popover>
                <PopoverTrigger>
                    <Button variant="outline"> Elige una fecha</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar locale="es-ES" />
                </PopoverContent>
            </Popover>
            <ContenidosMain />
            <PlanificacionesTable />
        </div>
    </NuxtLayout>
</template>
