<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, useAuthStore, useForm } from '#imports';
import { toTypedSchema,  } from '@vee-validate/zod';
import { z } from 'zod';

const authStore = useAuthStore()
const { user, isLoggedIn } = storeToRefs(authStore)

const perfilFormSchema = z.object({
    avatarUrl: z.string().optional(),
    nombre: z.string({
        required_error: 'El nombre es requerido',
    }),
    segundoNombre: z.string().optional(),
    apellidoPaterno: z.string({
        required_error: 'El apellido paterno es requerido',
    }).min(1, {
        message: 'El apellido paterno es requerido',
    }),
    apellidoMaterno: z.string().optional(),
    correo: z.string({
        required_error: 'El correo es requerido',
    }).email({
        message: 'El correo no es válido',
    }).optional()
});

const form = useForm({
    validationSchema: toTypedSchema(perfilFormSchema),
})

const fieldsConfig = {
    avatarUrl: {
        label: 'Foto de Perfil',
        component: 'file'
    },
    nombre: {
        label: 'Nombre',
        inputProps: {
            type: 'text'
        }
    }
}

const onSubmit = ((values: Record<string, any>) => {
    console.log(values);
})


</script>

<template lang="pug">
div
    section
        h3.text-lg.font-medium Mi Perfil
        p.text-sm.text-muted-foreground Actualizar tu información personal, esta información aparecerá en tu perfil y será mostrado en plataforma e informes.
    Separator.my-2
    //-pre {{perfilFormValues }}
    AutoForm(:schema="perfilFormSchema", :form="form", :field-config="fieldsConfig", @submit="onSubmit")
        .flex.justify-start.py-2
            Button(type="submit") Actualizar Perfil
    //-Form(v-slot="{ setFieldValue }" :validation-schema="perfilFormSchema", :initial-values="perfilFormValues",, class="grid gap-6 grid-cols-2", @submit="onSubmit")
        .col-span-2
            FormField(name="avatarUrl", v-slot="{ componentField }")
                    .flex.max-w-sm.items-center.gap-2
                        Avatar(class="!h-12 !w-12")
                            AvatarImage(:src="user.avatarUrl", v-if="user.avatarUrl")
                            AvatarFallback {{ user.nombre?.charAt(0) }}
                        FormItem
                            FormControl
                                Input(type="file", v-bind="componentField", class="py-1.5")
                            FormMessage
        FormField(name="nombre", v-slot="{ componentField }")
            FormItem
                FormLabel Nombre
                FormControl
                    Input(type="text", placeholder="Juan", v-bind="componentField")
                FormMessage
        FormField(name="segundoNombre", v-slot="{ componentField }")
            FormItem
                FormLabel Segundo Nombre
                FormControl
                    Input(type="text", placeholder="Manuel", v-bind="componentField")
                FormMessage

        FormField(name="apellidoPaterno", v-slot="{ componentField }")
            FormItem
                FormLabel Apellido Paterno
                FormControl
                    Input(type="text", placeholder="Diaz", v-bind="componentField")
                FormMessage

        FormField(name="apellidoMaterno", v-slot="{ componentField }")
            FormItem
                FormLabel Apellido Materno
                FormControl
                    Input(type="text", placeholder="Perez", v-bind="componentField")
                FormMessage

        .col-span-2
            FormField(name="correo", v-slot="{ componentField }")
                FormItem
                    FormLabel Correo Electrónico
                    FormControl
                        Input(type="text", placeholder="juamanuel@redcollege.net", v-bind="componentField")
                    FormMessage

        .flex.justify-start
            Button(type="submit") Actualizar Perfil
</template>
