import { defineNuxtPlugin } from '#app'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            useForm,
            toTypedSchema,
            z
        }
    }
})
