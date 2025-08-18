import type { INotificacion } from "../models/Notificacion/notificacion";
import { ref, storeToRefs, useAuthStore, useTransmit } from "#imports";
import { useToast } from "../components/ui/toast";
import { useNotificacionStore } from "../stores/notificacionStore";

export const useNotificacion = () => {
    const { transmit } = useTransmit();
    const { user } = useAuthStore();

    const notificacionStore = useNotificacionStore()

    const {setNotificacion, setContadores} = notificacionStore;
    const {contadorNotificaciones} = storeToRefs(notificacionStore)

    const unsuscribe = ref<(() => void) | undefined>();

    const subscribe = async () => {
        if (user) {
            const subscription = transmit.subscription(
                `notificaciones/${user.id}`,
            );
            if(subscription.isDeleted || subscription.isCreated) return;
            await subscription.create();
            unsuscribe.value = subscription.onMessage(
                async (data: { notificacion: INotificacion }) => {
                    console.log(data)
                    setNotificacion(data.notificacion)
                    setContadores({
                        noLeidas: contadorNotificaciones.value.noLeidas + 1,
                        total: contadorNotificaciones.value.total + 1
                    })
                    useToast().toast({
                        title: "¡Tienes una nueva notificación!",
                        description:
                        "Acabas de recibir una nueva notificación.",
                    });
                },
            );
        }
    };

    const close = () => {
        if(unsuscribe.value){
            unsuscribe.value()
        }
    }

    return {
        subscribe,
        close
    };
};
