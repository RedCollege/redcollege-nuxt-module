import { onMounted, onUnmounted, ref } from 'vue'
import { useRuntimeConfig } from '#app';
import { io, Socket } from "socket.io-client";

const { socketURL } = useRuntimeConfig().public.redcollege

interface MousePosition {
    x: number;
    y: number;
    color: string;
    channelId: string;
}

interface ServerToClientEvents {
    'mouse-position': (data: MousePosition) => void
}

interface ClientToServerEvents {
    'mouse-position': (data: MousePosition) => void
}

export const useSocket = () => {
    const socket = ref<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)

    onMounted(() => {
        socket.value = io(socketURL)
    })

    onUnmounted(() => {
        if (socket.value) {
            socket.value.disconnect()
        }
    })

    return {
        socket
    }
}


