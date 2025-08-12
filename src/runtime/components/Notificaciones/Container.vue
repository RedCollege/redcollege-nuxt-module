<script setup lang="ts">
    import { useNuxtApp, useRouter } from "#app";
    import type {
        INotificacionContadores,
        INotificacion,
    } from "@/src/runtime/models/Notificacion/notificacion";
    import { ref, nextTick, watch, onUnmounted } from "vue";
    import { useInfiniteScroll } from "@vueuse/core";
    import type { ScrollArea } from "#components";
    import { Loader } from "lucide-vue-next";
    import { formatearFecha } from "../../utils/notificaciones";

    const props = defineProps<{
        isOpen: boolean;
        contador: INotificacionContadores | null;
    }>();

    const emit = defineEmits<{
        "update:is-open": [value: boolean];
        "decrementar-contador-no-leidas": [];
    }>();

    const { notificacion } = useNuxtApp().$apis.notificacion;

    const loading = ref<boolean>(true);
    const activeTab = ref<string>("leidas");
    const scrollarea = ref<InstanceType<typeof ScrollArea> | null>(null);

    // Variables para infinite scroll
    const currentPage = ref<number>(1);
    const currentPageNoLeidas = ref<number>(1);
    const hasMoreData = ref<boolean>(true);
    const hasMoreDataNoLeidas = ref<boolean>(true);
    const isLoadingMore = ref<boolean>(false);
    const isLoadingMoreNoLeidas = ref<boolean>(false);

    // Arrays para acumular datos
    const allNotificaciones = ref<INotificacion[]>([]);
    const allNotificacionesNoLeidas = ref<INotificacion[]>([]);

    // Arrays organizados por fecha
    const notificacionesPorFecha = ref<
        { fecha: string; notificaciones: INotificacion[] }[]
    >([]);
    const notificacionesNoLeidasPorFecha = ref<
        { fecha: string; notificaciones: INotificacion[] }[]
    >([]);

    // Variables para controlar el infinite scroll
    const isInfiniteScrollSetup = ref(false);

    const agruparNotificacionesPorFecha = (
        notificaciones: INotificacion[],
    ): { fecha: string; notificaciones: INotificacion[] }[] => {
        const grupos: { [key: string]: INotificacion[] } = {};

        notificaciones.forEach((notificacion) => {
            const fecha = formatearFecha(notificacion.createdAt.toString());
            if (!grupos[fecha]) {
                grupos[fecha] = [];
            }
            grupos[fecha].push(notificacion);
        });

        return Object.keys(grupos).map((fecha) => ({
            fecha,
            notificaciones: grupos[fecha],
        }));
    };

    const actualizarNotificacionesOrganizadas = () => {
        notificacionesPorFecha.value = agruparNotificacionesPorFecha(
            allNotificaciones.value,
        );
        notificacionesNoLeidasPorFecha.value = agruparNotificacionesPorFecha(
            allNotificacionesNoLeidas.value,
        );
    };

    const cargarNotificaciones = async (
        page: number = 1,
        append: boolean = false,
    ) => {
        try {
            const result = await notificacion.obtenerNotificaciones({
                page,
                limit: 15,
            });

            if (append) {
                allNotificaciones.value.push(...result.data);
            } else {
                allNotificaciones.value = result.data;
            }

            hasMoreData.value = result.meta.currentPage < result.meta.lastPage;
            currentPage.value = result.meta.currentPage;

            actualizarNotificacionesOrganizadas();
        } catch (e) {
            console.error("Error en cargarNotificaciones:", e);
        }
    };

    const cargarNotificacionesNoLeidas = async (
        page: number = 1,
        append: boolean = false,
    ) => {
        try {
            const result = await notificacion.obtenerNotificaciones({
                isLeido: false,
                page,
                limit: 15,
            });

            if (append) {
                allNotificacionesNoLeidas.value.push(...result.data);
            } else {
                allNotificacionesNoLeidas.value = result.data;
            }

            hasMoreDataNoLeidas.value =
                result.meta.currentPage < result.meta.lastPage;
            currentPageNoLeidas.value = result.meta.currentPage;

            actualizarNotificacionesOrganizadas();
        } catch (e) {
            console.error("Error en cargarNotificacionesNoLeidas:", e);
        } finally {
            loading.value = false;
        }
    };

    const cleanupInfiniteScroll = () => {
        isInfiniteScrollSetup.value = false;
    };

    const setupInfiniteScroll = async () => {
        if (!props.isOpen) return;

        cleanupInfiniteScroll();

        await nextTick();

        await new Promise((resolve) => setTimeout(resolve, 50));

        let viewport = scrollarea.value?.$el?.querySelector(
            "[data-reka-scroll-area-viewport]",
        );

        if (!viewport) {
            await nextTick();
            viewport = scrollarea.value?.$el?.querySelector(
                "[data-reka-scroll-area-viewport]",
            );
        }

        if (!viewport) {
            console.warn("No se pudo encontrar el viewport del scroll area");
            return;
        }

        useInfiniteScroll(
            viewport,
            async () => {
                if (!props.isOpen) return;

                if (activeTab.value === "no-leidas") {
                    if (!hasMoreDataNoLeidas.value || isLoadingMoreNoLeidas.value) {
                        return;
                    }

                    isLoadingMoreNoLeidas.value = true;
                    const nextPage = currentPageNoLeidas.value + 1;

                    try {
                        await cargarNotificacionesNoLeidas(nextPage, true);
                    } catch (error) {
                        console.error(
                            "Error loading more unread notifications:",
                            error,
                        );
                    } finally {
                        isLoadingMoreNoLeidas.value = false;
                    }
                } else if (activeTab.value === "leidas") {
                    if (!hasMoreData.value || isLoadingMore.value) {
                        return;
                    }

                    isLoadingMore.value = true;
                    const nextPage = currentPage.value + 1;

                    try {
                        await cargarNotificaciones(nextPage, true);
                    } catch (error) {
                        console.error("Error loading more notifications:", error);
                    } finally {
                        isLoadingMore.value = false;
                    }
                }
            },
            {
                distance: 100,
                canLoadMore: () => {
                    if (!props.isOpen) return false;
                    if (activeTab.value === "no-leidas") {
                        const canLoad =
                            hasMoreDataNoLeidas.value &&
                            !isLoadingMoreNoLeidas.value;
                        return canLoad;
                    } else {
                        const canLoad = hasMoreData.value && !isLoadingMore.value;
                        return canLoad;
                    }
                },
            },
        );

        isInfiniteScrollSetup.value = true;
    };

    watch(
        () => activeTab.value,
        async () => {
            if (props.isOpen) {
                await nextTick();
                await setupInfiniteScroll();
            }
        },
    );

    watch(
        () => props.isOpen,
        async (isOpen) => {
            if (isOpen) {
                await nextTick();
                await setupInfiniteScroll();
            } else {
                cleanupInfiniteScroll();
            }
        },
    );

    watch(
        () => scrollarea.value,
        async (newScrollArea) => {
            if (newScrollArea && props.isOpen && !isInfiniteScrollSetup.value) {
                await nextTick();
                await setupInfiniteScroll();
            }
        },
        { immediate: true },
    );

    watch(
        activeTab,
        () => {
            (scrollarea.value?.$el as HTMLDivElement).firstElementChild?.scrollTo({ top: 0 })
        }
    )

    await cargarNotificaciones();
    await cargarNotificacionesNoLeidas();

    onUnmounted(() => {
        cleanupInfiniteScroll();
    });

    const handleNotificacionLeida = async (notificacionId: number) => {
        const notif = allNotificaciones.value.find((n) => n.id === notificacionId);
        if (notif && !notif.isLeido) {
            notif.isLeido = true;
        }

        allNotificacionesNoLeidas.value = allNotificacionesNoLeidas.value.filter(
            (n) => n.id !== notificacionId,
        );

        actualizarNotificacionesOrganizadas();

        emit("decrementar-contador-no-leidas");
    };

    const abrirPanel = () => {
        useRouter().push({ name: "panel-notificaciones" });
    };
</script>

<template lang="pug">
    Sheet(:open="isOpen" @update:open="(value) => emit('update:is-open', value)")
        SheetContent(class="sm:max-w-[525px] flex flex-col h-full p-0 gap-0" :showClose="false")
                h1.text-lg.p-2.px-3.font-semibold.text-primary Notificaciones
                Tabs(v-model="activeTab" class="h-full")
                    TabsList(class="w-full bg-transparent")
                        TabsTrigger(value="no-leidas")
                            span Notificaciones no Leídas 
                            Badge(v-if="contador?.noLeidas !== 0" :class="`ml-2 ${activeTab === 'no-leidas' ? 'bg-muted text-primary' : 'bg-primary'}`")
                                span(v-if="contador && contador?.noLeidas < 10") 0
                                span {{ contador?.noLeidas }}
                        TabsTrigger(value="leidas")
                            span Todas las notificaciones
                    Separator
                    ScrollArea(ref="scrollarea" class="h-[calc(100vh_-_120px)]")
                        TabsContent(value="no-leidas" class="h-full")
                            template(v-if="loading")
                                div.flex.items-center.justify-center.p-4
                                    span.text-muted-foreground Cargando notificaciones...
                            template(v-else)
                                template(v-if="allNotificacionesNoLeidas.length === 0")
                                    div.flex.items-center.justify-center.p-4
                                        span.text-muted-foreground No hay notificaciones no leídas
                                template(v-else)
                                    template(v-for="grupo in notificacionesNoLeidasPorFecha")
                                        h3(class="text-center text-muted-foreground p-1") {{ grupo.fecha }}
                                        template(v-for="notificacion in grupo.notificaciones")
                                            NotificacionesCard(:notificacion="notificacion" @notificacion-leida="handleNotificacionLeida")
                                    div(v-if="hasMoreData" class="flex flex-col items-center justify-center p-6 gap-2")
                                        template(v-if="isLoadingMore")
                                            span.text-sm.text-muted-foreground Cargando más notificaciones...
                                            Loader.animate-spin
                        TabsContent(value="leidas" class="h-full")
                            template(v-if="loading")
                                div.flex.items-center.justify-center.p-4
                                    span.text-muted-foreground Cargando notificaciones...
                            template(v-else)
                                template(v-if="notificacionesPorFecha.length === 0")
                                    div.flex.items-center.justify-center.p-4
                                        span.text-muted-foreground No hay notificaciones
                                template(v-else)
                                    template(v-for="grupo in notificacionesPorFecha")
                                        h3(class="text-center text-muted-foreground p-1") {{ grupo.fecha }}
                                        template(v-for="notificacion in grupo.notificaciones")
                                            NotificacionesCard(:notificacion="notificacion" @notificacion-leida="handleNotificacionLeida")
                                    div(v-if="hasMoreData" class="flex flex-col items-center justify-center p-6 gap-2")
                                        template(v-if="isLoadingMore")
                                            span.text-sm.text-muted-foreground Cargando más notificaciones...
                                            Loader.animate-spin
                Separator
                SheetFooter
                    div(class="flex-1 flex flex-row items-center justify-center p-2 text-primary select-none cursor-pointer hover:bg-primary hover:text-white transition-all duration-100 ease-in-out" @click="abrirPanel")
                        span(class="font-semibold") Ver Todas
</template>
