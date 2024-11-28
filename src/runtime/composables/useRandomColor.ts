import { ref } from "vue";

export const useRandomColor = () => {
    const randomTailwindColor = () => {
        const colors = [
            '#ef4444', // red-500
            '#3b82f6', // blue-500
            '#10b981', // green-500
            '#f59e0b', // yellow-500
            '#8b5cf6', // purple-500
            '#ec4899', // pink-500
            '#14b8a6', // teal-500
            '#f43f5e', // rose-500
            '#22c55e', // emerald-500
            '#06b6d4', // cyan-500
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const randomColor = ref(randomTailwindColor());
    return {
        randomColor
    }
}
