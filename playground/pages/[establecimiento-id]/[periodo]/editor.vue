<script lang="ts" setup>

const editorData = ref("")

</script>

<template lang="pug">
    ResizablePanelGroup(direction="horizontal")
        ResizablePanel(:default-size="40", :min-size="25", collapsible)
            Card
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
                CardHeader
                    CardTitle Asunto
                    Input(placeholder="Escriba el asunto del mensaje aqui")
                CardContent
                    Card(class="pt-[1px] pb-[1px]")
                        ScrollArea(class="h-[calc(100vh_-_375px)]")
                            Editor(v-model="editorData", class="min-h-[calc(100vh_-_375px)]")
                CardFooter
                    div
                        p.text-xs Ingresando una de las siguientes etiquetas el usuario recibirá el mensaje personalizado:
                        .space-x-2
                            Badge(variant="sky") #Alumno
                            Badge(variant="green") #Apoderado
                            Badge(variant="gold") #Curso
</template>
