<script setup lang="ts">
import { DateTime } from 'luxon'
import type { TUsuario } from '@redcollege/ui-nuxt-module/module';

const isOpen = ref(false)

useNavbarStore().setHideCursos(true)

useSidebarStore().setMenuList([
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

<template>
    <NuxtLayout name="dashboard">
        <div class="my-2">
            <!--<IAButton></IAButton>-->
            <ContenidosMain />
            <PlanificacionesTable />
        </div>
    </NuxtLayout>
</template>
