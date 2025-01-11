import { onMounted } from "vue";
import { Transmit } from '@adonisjs/transmit-client'
import { useRuntimeConfig } from "#app";

// Store the single instance outside the composable
let transmitInstance: Transmit | null = null

export const useTransmit = () => {
    const { socketURL } = useRuntimeConfig().public.redcollege

    if (!transmitInstance) {
        transmitInstance = new Transmit({
            baseUrl: socketURL
        })

        transmitInstance.on('connected', (event) => {

        })

        transmitInstance.on('disconnected', () => {

        })

        transmitInstance.on('initializing', (event) => {

        })

        transmitInstance.on('reconnecting', (error) => {

        })
    }

    return {
        transmit: transmitInstance
    }
}
