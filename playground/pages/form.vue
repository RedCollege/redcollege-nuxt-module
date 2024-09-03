<script setup lang="ts">
const { toTypedSchema, z, useForm } = useNuxtApp().$form

const formSchema = toTypedSchema(z.object({
    username: z.string().min(2).max(50),
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values)
})
</script>
<template>
    <form @submit.prevent="onSubmit">
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
