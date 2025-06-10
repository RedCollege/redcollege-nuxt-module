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
                p.text-sm.text-gray-600 Ejemplo básico de BarChart con vue-chartjs
                .h-full.w-full
                    PrintBarChart(
                        :data="salesData"
                        index="name"
                        :categories="['total']"
                        :disable-animation="false"
                    )
                    //- BarChart.h-48(:data="salesData", index="mes", :categories="['ventas', 'marketing', 'soporte']", :disable-animation="false")
                
                button(
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    @click="showConfetti"
                ) Mostrar Confetti
</template>
