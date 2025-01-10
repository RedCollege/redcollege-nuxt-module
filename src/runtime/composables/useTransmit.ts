
import { onMounted } from "vue";
import { Transmit } from '@adonisjs/transmit-client'
import { useRuntimeConfig } from "#app";
const { socketURL } = useRuntimeConfig().public.redcollege

export const useTransmit = () => {
    const transmit = new Transmit({
        baseUrl: "http://localhost:3334"
    })

    transmit.on('connected', (event) => {
        console.log('connected to the server', event)
    })

    transmit.on('disconnected', () => {
        console.log('disconnected')
    })

    transmit.on('initializing', (event) => {
        console.log('initializing the server', event)
    })

    transmit.on('reconnecting', (error) => {
        console.log(error)
    })

    return {
        transmit
    }
}
