<script setup lang="ts">
import { DateTime } from 'luxon'
import type { IUsuario } from '@redcollege/ui-nuxt-module/module';


const { planificaciones } = useNuxtApp().$apis;


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

const steps = [
    {
        step: 1,
        title: 'Your details',
        description: 'Provide your name and email',
    },
    {
        step: 2,
        title: 'Company details',
        description: 'A few details about your company',
    },
    {
        step: 3,
        title: 'Invite your team',
        description: 'Start collaborating with your team',
    },
]

function notificate() {
    useNotification().toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
    })
}



const handleValueChange = (newValues: string[]) => {
  // Handle the value change as needed
}

</script>

<template lang="pug">
</template>
