<script setup lang="ts">
import { DateTime } from 'luxon'
import type { TUsuario } from '@redcollege/ui-nuxt-module/module';

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
