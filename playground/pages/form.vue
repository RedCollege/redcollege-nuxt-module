<script setup lang="ts">
const { toTypedSchema, z, useForm } = useNuxtApp().$form

const formSchema = toTypedSchema(z.object({
    username: z.string().min(2).max(50),
    asignaturas: z.array(z.string()).min(1)
}))

const form = useForm({
    validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values)
})

const options: { label: string; value: string }[] = [
    {
        label: "Música",
        value: "30339"
    },
    {
        label: "Educación Física y Salud",
        value: "30340"
    }
]

const selectedValues = ref<string[]>(['30339', '30340'])
form.setFieldValue('asignaturas', selectedValues.value)

function update(owo: any){
    console.log(owo)
}

</script>
<template>
    <form class="container mx-auto py-6" @submit.prevent="onSubmit">
            <FormField v-slot="{ componentField }" name="asignaturas">
                <FormItem>
                    <FormLabel>Asignaturas</FormLabel>
                    <MultiSelect :options="options" @select="(value: string[]) => { form.setFieldValue('asignaturas', value ) }" v-model="selectedValues" placeholder="Elegir Asignatura(s)" :max-count="3"></MultiSelect>
                    <FormMessage></FormMessage>
                </FormItem>
            </FormField>
        <FormField v-slot="{ componentField }" name="username">
        <FormItem v-auto-animate>
            <FormLabel>Username</FormLabel>
            <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormDescription>
            This is your public display name.
            </FormDescription>
            <FormMessage />
        </FormItem>
        </FormField>
        <Button type="submit">
        Submit
        </Button>
    </form>
</template>
