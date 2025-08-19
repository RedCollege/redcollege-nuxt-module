<template>
    <Transition appear name="fade">
        <div
            :style="{
                '--cell-size': `${cellSize}px`,
                '--grid-rows': rows,
            }"
            :class="cn('relative w-full h-full', props.class)"
        >
            <div
                ref="el"
                :style="{
                    display: 'grid',
                    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
                    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
                    justifyContent: 'center',
                    gap: '1px',
                }"
                class="absolute inset-0"
            >
                <div
                    v-for="(row, rowIndex) in grid"
                    :key="`row-${rowIndex}`"
                    :style="{
                        display: 'contents',
                    }"
                >
                    <div
                        v-for="(cell, cellIndex) in row"
                        :key="`cell-${rowIndex}-${cellIndex}`"
                        :style="{
                            gridRow: rowIndex + 1,
                            gridColumn: cellIndex + 1,
                        }"
                        class="relative border border-gray-200 dark:border-gray-800"
                    >
                        <div
                            v-if="cell"
                            :style="{
                                backgroundColor: theme[500],
                            }"
                            class="absolute inset-0 cursor-pointer transition-all duration-150 hover:brightness-110 animate-fade-in"
                            @click="removeCell(rowIndex, cellIndex)"
                        />
                        <div v-else class="absolute inset-0 bg-transparent" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { cn } from "../../../lib/utils";
import { getColors } from "theme-colors";
import { onMounted, onUnmounted, ref, watch, computed } from "vue";

interface Props {
    class?: string;
    squareColor: string;
    base: number;
}

const props = withDefaults(defineProps<Props>(), {
    base: 10,
});

const theme = getColors(props.squareColor);

const el = ref<HTMLElement | null>(null);
const grid = ref<(boolean | null)[][]>([]);
const rows = ref(0);
const cols = ref(0);

const { width, height } = useElementSize(el);

const cellSize = computed(() => Math.floor(width.value / props.base));

function createGrid() {
    grid.value = [];

    for (let i = 0; i < rows.value; i++) {
        grid.value.push(new Array(cols.value).fill(null));
    }
}

function hasCellsMoving() {
    // Verificar si hay células que puedan seguir moviéndose
    for (let row = 0; row < rows.value - 1; row++) {
        for (let col = 0; col < cols.value; col++) {
            const cell = grid.value[row]?.[col];
            const nextRow = row + 1;

            if (
                cell === true &&
                grid.value[nextRow] &&
                grid.value[nextRow][col] === null
            ) {
                return true; // Hay al menos una célula que puede moverse
            }
        }
    }
    return false; // No hay células que puedan moverse
}

function createNewCell() {
    if (cols.value === 0) return;

    const x = Math.floor(Math.random() * cols.value);
    if (grid.value[0]) {
        grid.value[0][x] = true;
    }
}

function moveCellsDown() {
    // Buscar la primera célula que pueda moverse (de arriba hacia abajo)
    for (let row = 0; row < rows.value - 1; row++) {
        for (let col = 0; col < cols.value; col++) {
            const cell = grid.value[row]?.[col];
            const nextRow = row + 1;

            if (
                cell === true &&
                grid.value[nextRow] &&
                grid.value[nextRow][col] === null
            ) {
                // Mover solo esta célula una fila hacia abajo y salir
                grid.value[nextRow][col] = true;
                grid.value[row][col] = null;
                return; // Salir después de mover solo una célula
            }
        }
    }
}

function clearBottomRow() {
    const bottomRowIndex = rows.value - 1;
    const bottomRow = grid.value[bottomRowIndex];

    if (bottomRow?.every((cell) => cell === true)) {
        // Limpiar la fila llena
        for (let col = 0; col < cols.value; col++) {
            grid.value[bottomRowIndex][col] = null;
        }
    }
}

function removeCell(row: number, col: number) {
    if (grid.value[row]) {
        grid.value[row][col] = null;
    }
}

function calcGrid() {
    if (width.value === 0 || height.value === 0) return;

    const cell = Math.floor(width.value / props.base);

    rows.value = Math.floor(height.value / cell);
    cols.value = props.base;

    createGrid();
}

watch(
    [width, height],
    () => {
        if (width.value > 0 && height.value > 0) {
            calcGrid();
        }
    },
    { immediate: true },
);

let intervalId: NodeJS.Timeout | undefined;

onMounted(() => {
    // Esperar un frame para que el elemento esté completamente renderizado
    requestAnimationFrame(() => {
        calcGrid();

        // Intervalo más frecuente para animación más suave
        intervalId = setInterval(() => {
            clearBottomRow();
            moveCellsDown();

            // Solo crear nueva célula si no hay células moviéndose
            if (!hasCellsMoving()) {
                createNewCell();
            }
        }, 1000); // Más rápido para que la animación se vea fluida
    });
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}
</style>
