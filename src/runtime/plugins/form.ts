import { defineNuxtPlugin } from '#app'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export interface FormPluginInjection {
    useForm: typeof useForm
    toTypedSchema: typeof toTypedSchema
    z: typeof z
}

export default defineNuxtPlugin(() => {
    const injection: FormPluginInjection = {
        useForm,
        toTypedSchema,
        z
    }

    return {
        provide: {
            form: injection
        }
    }
})

// Exporta los tipos individuales si es necesario
export { useForm, toTypedSchema, z }
