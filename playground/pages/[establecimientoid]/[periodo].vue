<script setup lang="ts">
const confetti = useConfetti()

const showConfetti = () => {
    confetti.showConfetti()
}

// Data estática para el ejemplo
interface SalesData {
    mes: string;
    ventas: number;
    marketing: number;
    soporte: number;
}

const salesData: SalesData[] = [
    { mes: 'Enero', ventas: 65, marketing: 28, soporte: 12 },
    { mes: 'Febrero', ventas: 59, marketing: 48, soporte: 18 },
    { mes: 'Marzo', ventas: 80, marketing: 40, soporte: 25 },
    { mes: 'Abril', ventas: 81, marketing: 35, soporte: 22 },
    { mes: 'Mayo', ventas: 56, marketing: 25, soporte: 15 },
    { mes: 'Junio', ventas: 55, marketing: 30, soporte: 20 }
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
                    DescargablesBarChart(
                        :data="salesData"
                        index="mes"
                        :categories="['ventas', 'marketing', 'soporte']"
                        :disable-animation="false"
                    )
                    //- BarChart.h-48(:data="salesData", index="mes", :categories="['ventas', 'marketing', 'soporte']", :disable-animation="false")
                
                button(
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    @click="showConfetti"
                ) Mostrar Confetti
</template>