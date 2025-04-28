<template lang="pug">
    Card
        CardHeader
            CardTitle Carousel
        CardContent
            Carousel.relative.w-full(:opts="{ align: 'start' }")
                CarouselContent
                    CarouselItem(v-for="i in 6" class="md:basis-1/2 lg:basis-1/4")
                        Card
                            CardContent.flex.aspect-square.items-center.justify-center.p-6
                                .text-4xl.font-semibold {{ i }}
                CarouselPrevious
                CarouselNext
</template>
