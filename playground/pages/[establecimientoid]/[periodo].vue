<script setup lang="ts">
const confetti = useConfetti();

const showConfetti = () => {
    confetti.showConfetti();
};

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
    },
];
const { periodo, establecimientoid } = useRoute().params;
const selectedUserIds = ref<string[]>([]);
</script>

<template lang="pug">
.py-2
    Card
        CardHeader
            CardTitle Playground.
        CardContent
            .space-y-4
              UsersMultiSelect(  v-model="selectedUserIds" :establecimientoId=" Number(establecimientoid) ", :periodo="Number(periodo)")
            .space-y-4 
                pre {{ selectedUserIds }}
</template>
