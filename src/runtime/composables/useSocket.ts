import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useRuntimeConfig } from '#app'
import { io, Socket } from 'socket.io-client'

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
    'mouse-position': (data: MousePosition) => void
}

interface ClientToServerEvents {
    'mouse-position': (data: MousePosition) => void
}

export const useSocket = (): { socket: Ref<Socket<ClientToServerEvents, ServerToClientEvents> | null> } => {
    const socket = ref<Socket<ClientToServerEvents, ServerToClientEvents> | null>(null)

    // Inicializamos la conexión al socket en onMounted
    onMounted(() => {
        socket.value = io(socketURL)
    })

    // Desconectamos el socket en onUnmounted
    onUnmounted(() => {
        if (socket.value) {
            socket.value.disconnect()
        }
    })

    // Devolvemos el socket para que se pueda usar en otros componentes
    return {
        socket
    }
}
