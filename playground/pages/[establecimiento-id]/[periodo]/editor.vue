<script lang="ts" setup>

const editorData = ref("")
const mensajeSchema = toTypedSchema(z.object({
    asunto: z.string({
        required_error: "Por favor, ingrese un asunto"
    }).min(3, "El asunto debe tener al menos 3 caracteres"),
    mensaje: z.string({
        required_error: "Por favor, ingrese algun mensaje"
    }).refine((value) => {
        // Elimina todas las etiquetas HTML y espacios en blanco
        const textContent = value
            .replace(/<[^>]*>/g, '')
            .replace(/\s+/g, '')
            .trim();

        return textContent.length > 0;
    }, "El mensaje no puede estar vacío"),
}));

const form = useForm({
    validationSchema: mensajeSchema
})

const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values)
})

</script>

<template lang="pug">
    ResizablePanelGroup(direction="horizontal")
        ResizablePanel(:default-size="40", :min-size="25", collapsible)
            //-Card
                CardHeader
                    CardTitle Destinatarios
                    CardDescription.text-green 0 Destinatarios Seleccionados
                CardContent
                    ScrollArea(class="h-[calc(100vh_-_295px)]")
                        Tabs(default-value="account")
                            TabsList
                                TabsTrigger(value="account") Cuenta
                                TabsTrigger(value="pass") Password
                            TabsContent(value="account") make changes aksdh kajshdjkash jkdashjkdh asjkdhajskdhjkashd kjashdkjas hdjk ashdjkashjdk ahsjkdhasjkdhasjk dhasjkdh
                            TabsContent(value="pass") Your password here
                        Accordion.space-y-2(type="multiple", collapsible, :default-value="1")
                            AccordionItem.border-none(v-for="i in 10", :value="i + 1")
                                Card
                                    CardHeader.py-0
                                        CardTitle
                                            AccordionTrigger
                                                .flex.gap-2.items-center
                                                    Icon.transition-transform(name="tabler:chevron-down", size="16")
                                                    p Accordion {{ i }}
                                                template(#icon)
                                                    Badge 04/12
                                    AccordionContent
                                        CardContent
                                            .grid.gap-2
                                                .flex.gap-2(v-for="i in 5")
                                                    Checkbox
                                                    Label Contenido by here
        ResizableHandle.mx-2(with-handle)
        ResizablePanel(:default-size="60", :min-size="50")
            Card
                form(@submit.prevent="onSubmit")
                    CardHeader
                        CardTitle Asunto
                        FormField(v-slot="{ componentField }", name="asunto")
                            FormItem
                                FormControl
                                    Input(v-bind="componentField", placeholder="Escriba el asunto del mensaje aqui")
                                FormMessage
                    CardContent
                        FormField(v-slot="{ componentField }", name="mensaje")
                            FormItem
                                FormControl
                                    Card(class="pt-[1px] pb-[1px]")
                                        ScrollArea(class="h-[calc(100vh_-_375px)]")
                                            Editor(v-bind="componentField", class="min-h-[calc(100vh_-_375px)]")
                                FormMessage
                    CardFooter
                        div
                            p.text-xs Ingresando una de las siguientes etiquetas el usuario recibirá el mensaje personalizado:
                            .space-x-2
                                Badge(variant="sky") #Alumno
                                Badge(variant="green") #Apoderado
                                Badge(variant="gold") #Curso
                        Button(type="submit") Guardar
</template>
