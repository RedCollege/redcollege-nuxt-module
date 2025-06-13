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
                p.text-sm.text-gray-600 Ejemplo básico de Progress
                .h-full.w-full.grid.gap-8
                   Progress(
                    :modelValue="1"
                    :variant="destructive"
                    :showLabel="true"
                   )
                   Progress(
                    :modelValue="2"
                    :variant="destructive"
                    :showLabel="true"
                   )
                   Progress(
                    :modelValue="3"
                    :variant="destructive"
                    :showLabel="true"
                   )
                   Progress(
                    :modelValue="4"
                    :variant="destructive"
                    :showLabel="true"
                   )
                   Progress(
                    :modelValue="5"
                    :variant="destructive"
                    :showLabel="true"
                   )
                   Progress(
                    :modelValue="6"
                    :variant="destructive"
                    :showLabel="true"
                   )
                   Progress(
                    :modelValue="7"
                    :variant="destructive"
                    :showLabel="true"
                   )
                   Progress(
                    :modelValue="25"
                    :variant="destructive"
                    :showLabel="true"
                   )
                   Progress(
                    :modelValue="60"
                    :variant="destructive"
                    :showLabel="true"
                   )

                button(
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    @click="showConfetti"
                ) Mostrar Confetti
</template>
