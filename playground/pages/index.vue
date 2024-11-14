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
  console.log('Selected values:', newValues)
  // Handle the value change as needed
}

</script>

<template>
    <NuxtLayout name="dashboard">
        <div class="bg-sky h-20 w-20"></div>
        <NuxtLink to="/103">Cargar planificaciones</NuxtLink>
        <Stepper class="flex w-full items-start gap-2">
            <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            class="relative flex w-full flex-col items-center justify-center"
            :step="step.step"
            >
            <StepperSeparator
                v-if="step.step !== steps[steps.length - 1].step"
                class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />

            <StepperTrigger as-child>
                <Button
                :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                size="icon"
                class="z-10 rounded-full shrink-0"
                :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                >
                <Icon name="tabler:circle-check" v-if="state === 'completed'" class="size-5" />
                <Icon name="tabler:circle-dot" v-if="state === 'active'" class="size-5" />
                <Icon name="tabler:circle-x" v-if="state === 'inactive'" class="size-5" />
                </Button>
            </StepperTrigger>

            <div class="mt-5 flex flex-col items-center text-center">
                <StepperTitle
                :class="[state === 'active' && 'text-primary']"
                class="text-sm font-semibold transition lg:text-base"
                >
                {{ step.title }}
                </StepperTitle>
                <StepperDescription
                :class="[state === 'active' && 'text-primary']"
                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                >
                {{ step.description }}
                </StepperDescription>
            </div>
            </StepperItem>
        </Stepper>
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
        <div class='bg-slate-500' >
            <ToggleGroup type="single">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <span>hola</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <span>hola</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                    <span>hola</span>
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    </NuxtLayout>
</template>
