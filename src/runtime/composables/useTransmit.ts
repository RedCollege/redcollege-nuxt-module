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
            console.log('connected to the server', event)
        })

        transmitInstance.on('disconnected', () => {
            console.log('disconnected')
        })

        transmitInstance.on('initializing', (event) => {
            console.log('initializing the server', event)
        })

        transmitInstance.on('reconnecting', (error) => {
            console.log(error)
        })
    }

    return {
        transmit: transmitInstance
    }
}
