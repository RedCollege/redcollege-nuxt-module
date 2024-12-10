<script setup lang="ts">
import WobbleCard from '@redcollege/ui-nuxt-module/runtime/components/ui/wobble-card/WobbleCard.vue';

const { toTypedSchema, z, useForm } = useNuxtApp().$form

enum Sports {
    Football = 'Football/Soccer',
    Basketball = 'Basketball',
    Baseball = 'Baseball',
    Hockey = 'Hockey (Ice)',
    None = 'I don\'t like sports',
}

const schema = z.object({
    username: z
        .string({
            required_error: 'Username is required.',
        })
        .min(2, {
            message: 'Username must be at least 2 characters.',
        }),

    password: z
        .string({
            required_error: 'Password is required.',
        })
        .min(8, {
            message: 'Password must be at least 8 characters.',
        }),

    favouriteNumber: z.coerce
        .number({
            invalid_type_error: 'Favourite number must be a number.',
        })
        .min(1, {
            message: 'Favourite number must be at least 1.',
        })
        .max(10, {
            message: 'Favourite number must be at most 10.',
        })
        .default(1)
        .optional(),

    acceptTerms: z
        .boolean()
        .refine(value => value, {
            message: 'You must accept the terms and conditions.',
            path: ['acceptTerms'],
        }),

    sendMeMails: z.boolean().optional(),

    birthday: z.coerce.date().optional(),

    color: z.enum(['red', 'green', 'blue']).optional(),

    // Another enum example
    marshmallows: z
        .enum(['not many', 'a few', 'a lot', 'too many']),

    // Native enum example
    sports: z.nativeEnum(Sports).describe('What is your favourite sport?'),

    bio: z
        .string()
        .min(10, {
            message: 'Bio must be at least 10 characters.',
        })
        .max(160, {
            message: 'Bio must not be longer than 30 characters.',
        })
        .optional(),

    customParent: z.string().optional(),

    file: z.string().optional(),
})

function onSubmit(values: Record<string, any>) {
}
</script>

<template>
    <div class="container py-4 mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
            <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
                className="">
                <div class="max-w-xs">
                    <h2
                        class="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Gippity AI powers the entire universe
                    </h2>
                    <p class="mt-4 text-left  text-base/6 text-neutral-200">
                        With over 100,000 mothly active bot users, Gippity AI is the most
                        popular AI platform for developers.
                    </p>
                </div>
                <Image src="/linear.webp" width={500} height={500} alt="linear demo image"
                    class="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl" />
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                <h2
                    class="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    No shirt, no shoes, no weapons.
                </h2>
                <p class="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                    If someone yells “stop!”, goes limp, or taps out, the fight is over.
                </p>
            </WobbleCard>
            <WobbleCard
                containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div class="max-w-sm">
                    <h2
                        class="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Signup for blazing-fast cutting-edge state of the art Gippity AI
                        wrapper today!
                    </h2>
                    <p class="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                        With over 100,000 mothly active bot users, Gippity AI is the most
                        popular AI platform for developers.
                    </p>
                </div>
                <Image src="/linear.webp" width={500} height={500} alt="linear demo image"
                    class="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl" />
            </WobbleCard>
        </div>
            <Card>
                <CardContent>
                    <AutoForm class="space-y-6" :schema="schema" :field-config="{
                        password: {
                            label: 'Your secure password',
                            inputProps: {
                                type: 'password',
                                placeholder: '••••••••',
                            },
                        },
                        favouriteNumber: {
                            description: 'Your favourite number between 1 and 10.',
                        },
                        acceptTerms: {
                            label: 'Accept terms and conditions.',
                            inputProps: {
                                required: true,
                            },
                        },

                        birthday: {
                            description: 'We need your birthday to send you a gift.',
                        },

                        sendMeMails: {
                            component: 'switch',
                        },

                        bio: {
                            component: 'textarea',
                        },

                        marshmallows: {
                            label: 'How many marshmallows fit in your mouth?',
                            component: 'radio',
                        },

                        file: {
                            label: 'Text file',
                            component: 'file',
                        },
                    }" @submit="onSubmit">
                        <template #acceptTerms="slotProps">
                            <AutoFormField v-bind="slotProps" />
                            <div class="!mt-2 text-sm">
                                I agree to the <button class="text-primary underline">
                                    terms and conditions
                                </button>.
                            </div>
                        </template>

                        <template #customParent="slotProps">
                            <div class="flex items-end space-x-2">
                                <AutoFormField v-bind="slotProps" class="w-full" />
                                <Button type="button">
                                    Check
                                </Button>
                            </div>
                        </template>

                        <Button type="submit">
                            Submit
                        </Button>
                    </AutoForm>
                </CardContent>
            </Card>
        </div>
</template>
