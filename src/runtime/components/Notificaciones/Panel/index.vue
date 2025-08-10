<script setup lang="ts">
    import { useAsyncData, useNuxtApp, useRouter } from "#app";
    import { computed, ref, watch } from "vue";
    import { formatearFechaNotificacion } from "../../../utils/notificaciones";
    import type { INotificacion } from "~/src/runtime/models/Notificacion/notificacion";
    import { useToast } from "../../ui/toast";

    const { notificacion } = useNuxtApp().$apis.notificacion;

    const modulos: { id: number; nombre: string }[] = [
        { id: 0, nombre: "Todos los módulos" },
        { id: 1, nombre: "Comunicaciones" },
        { id: 2, nombre: "Planificación" },
        { id: 3, nombre: "Libro Digital" },
        { id: 4, nombre: "Evaluaciones" },
        { id: 5, nombre: "Sistema" },
    ];

    const estadosLeido: {
        id: number;
        nombre: string;
        status: boolean | undefined;
    }[] = [
            { id: 0, nombre: "Todas las notificaciones", status: undefined },
            { id: 1, nombre: "Leídas", status: true },
            { id: 2, nombre: "No Leídas", status: false },
        ];

    const headers: { title: string }[] = [
        { title: "Asunto de la notificación" },
        { title: "Descripción" },
        { title: "Fecha" },
        { title: "Estado" },
    ];

    const currentPage = ref<number>(1);
    const total = ref<number>(0);
    const perPage = ref<number>(10);

    const search = ref<string>('');
    const selectedModule = ref<number>(0);
    const selectedEstadoLeido = ref<number>(0);
    const isDialogOpen = ref<boolean>(false);

    const selectedNotifications = ref<Set<number>>(new Set());

    const { data: notificaciones, execute: refreshDataTable } = await useAsyncData(
        async () => {
            try {
                const result = await notificacion.obtenerNotificaciones({
                    page: currentPage.value,
                    limit: 10,
                    tipoId:
                        selectedModule.value !== 0
                            ? selectedModule.value
                            : undefined,
                    isLeido: estadosLeido[selectedEstadoLeido.value].status,
                    search: search.value
                });

                currentPage.value = result.meta.currentPage;
                total.value = result.meta.total;
                perPage.value = result.meta.perPage;

                return result.data;
            } catch (e) {
                console.error("Error en cargarNotificaciones:", e);
            }
        },
        {
            watch: [currentPage, selectedModule, selectedEstadoLeido, search],
        },
    );

    const toggleNotification = (state: boolean | string, id: number) => {
        if (!state) {
            selectedNotifications.value.delete(id);
        } else {
            selectedNotifications.value.add(id);
        }
        console.log(selectedNotifications.value);
    };

    const toggleAllNotifications = (selectAll: boolean | string) => {
        if (selectAll) {
            notificaciones.value?.forEach((notif) => {
                selectedNotifications.value.add(notif.id);
            });
        } else {
            selectedNotifications.value.clear();
        }
    };

    const areAllSelected = computed(() => {
        return (
            notificaciones.value &&
            notificaciones.value.length > 0 &&
            notificaciones.value.every((notif) =>
                selectedNotifications.value.has(notif.id),
            )
        );
    });

    const eliminarSeleccionadas = async () => {
        try {
            await notificacion.marcarMultiplesBorradas(Array.from(selectedNotifications.value))
            refreshDataTable()
            useToast().toast({
                title: "Notificaciones eliminadas con éxito",
                description: "Todas las notificaciones seleccionadas han sido eliminadas de forma exitosa"
            })
        } catch (e) {
            console.log(e)
        }
    }

    const marcarTodasLeidas = async () => {
        try {
            await notificacion.marcarTodasLeidas();
            useToast().toast({
                title: "Notificaciones marcadas como leídas",
                description: "Todas las notificaciones sin leer han sido marcadas como leídas"
            })
        } catch (e) {
            console.log(e)
        }
    }

    const marcarLeida = async (_notificacion: INotificacion) => {
        if (_notificacion.isLeido) return;
        try {
            await notificacion.marcarLeida(_notificacion.id);
            useToast().toast({
                title: "Notificación marcada como leída",
                description: "La notificación ha sido marcada como leída"
            })
        } catch (e) {
            console.log(e);
        }
    }

    watch(selectedModule, () => (currentPage.value = 1));
</script>

<template lang="pug">
Card
    CardHeader
        .flex.flex-row.items-center.justify-between
            div(class="w-1/3 flex flex-row items-center gap-2" )
                Icon(name="tabler:arrow-big-left-filled" class="text-primary font-bold cursor-pointer" @click="useRouter().back()")
                h3(class="font-semibold text-primary text-xl") Panel de Notificaciones
            div(class="w-2/3 flex flex-row items-center gap-4 justify-end")
                .relative
                    Input(class="pl-8 w-72" placeholder="Buscar notificación" v-model="search")
                    Icon(name="tabler:search" class="absolute top-2 left-2 text-muted-foreground" size=18)
                Select(v-model="selectedModule")
                    SelectTrigger
                        SelectValue(placeholder="Seleccione un modulo" )
                    SelectContent
                        SelectGroup()
                            SelectItem(
                                v-for="modulo in modulos"
                                :key="modulo.id"
                                :value="modulo.id"
                            )
                                span {{ modulo.nombre }}
                Select(v-model="selectedEstadoLeido")
                    SelectTrigger
                        SelectValue(placeholder="Seleccione un estado" )
                    SelectContent
                        SelectGroup()
                            SelectItem(
                                v-for="estado in estadosLeido"
                                :key="estado.id"
                                :value="estado.id"
                            )
                                span {{ estado.nombre }}
    CardContent
        ScrollArea(class="border rounded-xl mb-2")
            Table
                TableHeader(class="bg-sky/15 text-muted-foreground")
                    TableRow
                        TableHead
                            Checkbox(:model-value="areAllSelected" @update:model-value="toggleAllNotifications")
                        TableHead(v-for="header in headers") {{ header.title }}
                TableBody(v-auto-animate)
                    TableRow(v-if="notificaciones?.length !== 0" v-for="notificacion, i in notificaciones", :key="notificacion.id" :class="`${i % 2 == 0 ? 'bg-white' : 'bg-muted'}`")
                        TableCell
                            Checkbox(:model-value="selectedNotifications.has(notificacion.id)" @update:model-value="(state) => toggleNotification(state, notificacion.id)")
                        TableCell.flex.flex-row.items-center.gap-2
                            Avatar(class="h-7 w-7 bg-white border border-muted-foreground/40")
                                AvatarImage(:src="notificacion.tipo.icono" class="scale-50 bg-white overflow-visible")
                            span {{ notificacion.asunto }}
                        TableCell
                            p {{ notificacion.mensaje }}
                        TableCell
                            span {{ formatearFechaNotificacion(notificacion.createdAt.toString()) }}
                        TableCell 
                            div.flex.flex-row.items-center.justify-center.cursor-pointer(@click="marcarLeida(notificacion)")
                                Icon(name="tabler:circle-check" size=26 v-if="!notificacion.isLeido" class="text-muted-foreground")
                                Icon(name="tabler:circle-check-filled" size=26 v-else class="text-green")
                    TableEmpty(v-else class="" :colspan="5")
                        h3 No hay notificaciones
        .flex.justify-between.items-center
            .flex.flex-row.items-center.gap-2
                Button(variant='outline' @click="marcarTodasLeidas")
                    Icon(name="tabler:copy-check")
                    span Marcar todas como leídas
                Button(variant='outline' :disabled="!selectedNotifications.size" @click="() => isDialogOpen = true")
                    Icon(name="tabler:trash-x")
                    span Eliminar seleccionadas
            Pagination(v-slot="{ page }", :total="total", :items-per-page="perPage", v-model:page="currentPage")
                PaginationList(v-slot="{ items }", class="flex items-center gap-1")
                    PaginationFirst
                    PaginationPrev
                    template(v-for="(item, index) in items")
                        PaginationListItem(v-if="item.type === 'page'", :key="index", :value="item.value", as-child)
                            Button.w-10.h-10.p-0(:variant="item.value === page ? 'default' : 'outline'") {{ item.value }}
                        PaginationEllipsis(v-else, :key="item.type", :index="index")
                    PaginationNext
                    PaginationLast
AlertDialog(v-model:open="isDialogOpen")
    AlertDialogContent.border-2.border-destructive
        AlertDialogHeader
            AlertDialogTitle.text-destructive ¿Está seguro de que desea eliminar las notificaciones seleccionadas?
            AlertDialogDescription Las notificaciones seleccionadas serán eliminadas, esta acción es irreversible. 
        AlertDialogFooter
            AlertDialogAction.bg-destructive( @click="eliminarSeleccionadas") Eliminar
            AlertDialogCancel Cancelar
</template>
