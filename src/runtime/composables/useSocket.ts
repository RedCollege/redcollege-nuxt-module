import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useRuntimeConfig } from '#app'
import { io, Socket } from 'socket.io-client'
import type { IMensaje } from '../models';

// Obtiene la URL del socket desde la configuración pública
const { socketURL } = useRuntimeConfig().public.redcollege

interface MousePosition {
    x: number;
    y: number;
    color: string;
    channelId: string;
}

// Definir los tipos de los eventos que el servidor puede emitir y recibir
interface ServerToClientEvents {
    'mouse-position': (data: MousePosition) => void;
    'mensaje-status': (data: IMensaje) => void;
}

interface ClientToServerEvents {
    'mouse-position': (data: MousePosition) => void;
    'subscribe-mensaje-status': (id: number) => void;
    'unsubscribe-mensaje-status': (id: number) => void;
}

export const useSocket = (): {
    socket: Ref<Socket<ClientToServerEvents, ServerToClientEvents> | null>;
    subscribeToMessage: (id: number, callback: (data: IMensaje) => void) => void;
    unsubscribeFromMessage: (id: number) => void;
} => {
    const socket = ref<Socket<ServerToClientEvents, ClientToServerEvents>>();
    const activeSubscriptions = new Map<number, (data: IMensaje) => void>();

    // Inicializamos la conexión al socket en onMounted
    onMounted(() => {
        socket.value = io(socketURL, {
            transports: ["websocket", "polling"],
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 10000,
            reconnectionDelayMax: 10000
        })

        socket.value.on('connect', () => {
            if(socket.value?.recovered){
                console.log('recovererd')
            }else{
                activeSubscriptions.forEach((callback, id) => {
                    socket.value?.emit('subscribe-mensaje-status', id);
                });
            }
        })

        socket.value.on('disconnect', (reason, details) => {
            console.warn('Desconectado del servidor:', reason, details);
            if (reason === 'io server disconnect') {
                // Si el servidor cierra la conexión, intenta reconectar manualmente
                socket.value?.connect();
            }
        });

        socket.value.on('connect_error', (err) => {
            console.log(err)
        })
    })

    // Desconectamos el socket en onUnmounted
    onUnmounted(() => {
        if (socket.value) {
            socket.value.disconnect()
        }
    })

    const subscribeToMessage = (id: number, callback: (data: IMensaje) => void) => {
        if (socket.value) {
            // Agregar al registro de suscripciones activas
            activeSubscriptions.set(id, callback);

            // Emitir la suscripción al servidor
            socket.value.emit('subscribe-mensaje-status', id);

            // Escuchar el evento del mensaje
            socket.value.on('mensaje-status', (data) => {
                console.log(data)
                if (data.id === id) {
                    callback(data);
                }
            });
        }
    };

    const unsubscribeFromMessage = (id: number) => {
        if (socket.value) {
            // Eliminar del registro de suscripciones activas
            activeSubscriptions.delete(id);

            // Emitir la cancelación de la suscripción al servidor
            socket.value.emit('unsubscribe-mensaje-status', id);

            // Eliminar el listener asociado
            socket.value.off('mensaje-status', (data) => {
                if (data.id === id) {
                    activeSubscriptions.delete(id);
                }
            });
        }
    };

    // Devolvemos el socket para que se pueda usar en otros componentes
    return {
        socket,
        subscribeToMessage,
        unsubscribeFromMessage,
    }
}
