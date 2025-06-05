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
            NuxtPage
</template>
