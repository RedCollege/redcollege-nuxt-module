<script setup lang="ts">
const confetti = useConfetti()

const showConfetti = () => {
    confetti.showConfetti()
}

// Data estática para el ejemplo
interface SalesData {
    name: string;
    total: number;
}

const salesData: SalesData[] = [
    {
        name: "Bajo (B)",
        total: 2,
    },
    {
        name: "Medio Bajo (MB)",
        total: 5,
    },
    {
        name: "Medio Alto (MA)",
        total: 6,
    },
    {
        name: "Alto (A)",
        total: 50,
    }
]

</script>

<template lang="pug">
.py-2
    Card
        CardHeader
            CardTitle Playground
        CardContent
            .space-y-4
                p.text-sm.text-gray-600 Ejemplo básico de PrintProgress
                .h-full.w-full.p-6

                    div(class="grid grid-cols-12 gap-2")
                        div(class="col-span-3")
                            p(class="font-medium text-primary text-xs line-clamp-2") Interpretar /  Hab.Predominante: Comprensión  /  Dificultad: Básico
                        div(class="col-span-9")
                            .grid.gap-2
                                .flex.gap-2.items-center
                                    p.font-medium.text-xs.flex-none 4 Enseñanza Básica A
                                    Progress(
                                        :modelValue="47"
                                        :showLabel="true"
                                        )
                                .flex.gap-2.items-center
                                    p.font-medium.text-xs.flex-none 4 Enseñanza Básica A
                                    Progress(
                                        :modelValue="48"
                                        :showLabel="true"
                                        )
                                .flex.gap-2.items-center
                                    p.font-medium.text-xs.flex-none 4 Enseñanza Básica A
                                    Progress(
                                        :modelValue="49"
                                        :showLabel="true"
                                        )
                                .flex.gap-2.items-center
                                    p.font-medium.text-xs.flex-none 4 Enseñanza Básica A
                                    Progress(
                                        :modelValue="50"
                                        :showLabel="true"
                                        )
                                .flex.gap-2.items-center
                                    p.font-medium.text-xs.flex-none 4 Enseñanza Básica A
                                    Progress(
                                        :modelValue="51"
                                        :showLabel="true"
                                        )
                                .flex.gap-2.items-center
                                    p.font-medium.text-xs.flex-none 4 Enseñanza Básica A
                                    Progress(
                                        :modelValue="52"
                                        :showLabel="true"
                                        )

                button(
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    @click="showConfetti"
                ) Mostrar Confetti
</template>
