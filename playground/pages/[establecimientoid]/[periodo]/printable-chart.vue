<script setup lang="ts">

const salesData = [
    { mes: 'Enero', ventas: 120, gastos: 80 },
    { mes: 'Febrero', ventas: 190, gastos: 95 },
    { mes: 'Marzo', ventas: 300, gastos: 120 },
    { mes: 'Abril', ventas: 250, gastos: 110 },
    { mes: 'Mayo', ventas: 280, gastos: 130 },
    { mes: 'Junio', ventas: 320, gastos: 140 }
]

</script>

<template lang="pug">
    PrintableBarChart(:data="salesData"
        :categories="['ventas']"
        index="mes"
        type="grouped"
        :rounded-corners="4"
    )
</template>
