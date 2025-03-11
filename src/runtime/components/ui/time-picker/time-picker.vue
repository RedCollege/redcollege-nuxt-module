<template>
    <div class="flex items-center gap-2">
        <div class="flex flex-col items-center gap-1">
            <Label v-if="withLabels" for="hours" class="text-xs">Horas</Label>
            <TimePickerInput
                ref="hourRef"
                :picker="withPeriod ? '12hours' : 'hours'"
                :disabled="disabled"
                :period="period"
                :date="internalDate"
                @right-focus="focusMinuteRef"
                @update:date="updateDate"
            />
        </div>
        <div v-if="!withLabels">:</div>
        <div class="flex flex-col items-center gap-1">
            <Label v-if="withLabels" for="minutes" class="text-xs"
                >Minutos</Label
            >
            <TimePickerInput
                ref="minuteRef"
                picker="minutes"
                :disabled="disabled"
                :date="internalDate"
                @left-focus="focusHourRef"
                @right-focus="focusRightConditional"
                @update:date="updateDate"
            />
        </div>
        <div v-if="!withLabels && withSeconds">:</div>
        <div v-if="withSeconds" class="flex flex-col items-center gap-1">
            <Label v-if="withLabels" for="seconds" class="text-xs"
                >Segundos</Label
            >
            <TimePickerInput
                ref="secondRef"
                picker="seconds"
                :disabled="disabled"
                :date="internalDate"
                @left-focus="focusMinuteRef"
                @right-focus="focusPeriodRef"
                @update:date="updateDate"
            />
        </div>
        <Select
            v-if="withPeriod"
            v-model="period"
            class="w-20"
            :disabled="disabled"
        >
            <div class="flex flex-col items-center gap-1">
                <Label for="periodRef" class="text-xs">Horario</Label>
                <SelectTrigger
                    ref="periodRef"
                    @keydown.arrow-left="focusLeftConditional"
                >
                    <SelectValue />
                </SelectTrigger>
            </div>

            <SelectContent>
                <SelectGroup>
                    <SelectItem value="PM"> PM </SelectItem>
                    <SelectItem value="AM"> AM </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
    date: {
        type: Date,
        default: () => new Date(new Date().setHours(0, 0, 0, 0)),
    },
    withSeconds: {
        type: Boolean,
        default: false,
    },
    withPeriod: {
        type: Boolean,
        default: false,
    },
    withLabels: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:date"]);

const internalDate = computed({
    get: () => props.date,
    set: (value) => emit("update:date", value),
});

const period = ref("PM");
const hourRef = ref(null);
const minuteRef = ref(null);
const secondRef = ref(null);
const periodRef = ref(null);

const focusMinuteRef = () => minuteRef.value?.$el.focus();
const focusHourRef = () => hourRef.value?.$el.focus();
const focusSecondRef = () => secondRef.value?.$el.focus();
const focusPeriodRef = () => periodRef.value?.$el.focus();

const focusLeftConditional = () => {
    if (props.withSeconds) {
        focusSecondRef();
    } else {
        focusMinuteRef();
    }
};
const focusRightConditional = () => {
    if (props.withSeconds) {
        focusSecondRef();
    } else {
        focusPeriodRef();
    }
};

const updateDate = (newDate) => {
    internalDate.value = newDate;
};
</script>
