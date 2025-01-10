import { useRuntimeConfig } from "#app";
import { onMounted } from "vue";
import { Transmit } from '@adonisjs/transmit-client'
const { socketURL } = useRuntimeConfig().public.redcollege

export const useTransmit = () => {
    let transmit = new Transmit({
        baseUrl: socketURL
    })
    return {
        transmit
    }
}
