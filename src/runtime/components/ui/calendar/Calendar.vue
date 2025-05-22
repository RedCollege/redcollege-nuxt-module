<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits } from 'reka-ui'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton
} from '.'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'
import { cn } from '../../../lib/utils'

export interface CalendarEvent {
  fecha: Date
  color: string
  nombre: string
}

const props = defineProps<CalendarRootProps & {
  locale?: string
  class?: HTMLAttributes['class']
  events?: CalendarEvent[]
}>()

const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, events: __, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const eventMap = computed(() => {
  const map = new Map<string, CalendarEvent[]>()
  props.events?.forEach((event) => {
    const key = new Date(event.fecha).toDateString()
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(event)
  })
  return map
})

const getEventsForDate = (date: any): CalendarEvent[] => {
  const key = new Date(date).toDateString()
  return eventMap.value.get(key) ?? []
}

const hasEvents = (date: any): boolean => {
  const key = new Date(date).toDateString()
  return eventMap.value.has(key)
}

const getDotsForDate = (date: any) => {
  const events = getEventsForDate(date)
  const maxDots = 3

  if (events.length <= maxDots) {
    return {
      dots: events,
      hasMore: false,
      totalCount: events.length
    }
  }

  return {
    dots: events.slice(0, maxDots - 1),
    hasMore: true,
    totalCount: events.length
  }
}


</script>

<template>
  <CalendarRoot v-slot="{ grid, weekDays }" :class="cn('p-3', props.class)" v-bind="forwarded">
    <CalendarHeader>
      <CalendarPrevButton />
      <CalendarHeading />
      <CalendarNextButton />
    </CalendarHeader>

    <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell v-for="day in weekDays" :key="day">
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>

        <CalendarGridBody>
          <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="mt-2 w-full">
            <CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate">
              <CalendarCellTrigger :day="weekDate" :month="month.value" :class="cn(hasEvents(weekDate) && 'pb-2')" />
              <TooltipProvider>
                <Tooltip v-if="hasEvents(weekDate)">
                  <TooltipTrigger asChild>
                    <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1 cursor-pointer">
                      <span v-for="(event, index) in getDotsForDate(weekDate).dots" :key="`dot-${index}`" :class="cn([
                        'w-1.5 h-1.5 rounded-full',
                        event.color
                      ])" />

                      <div v-if="getDotsForDate(weekDate).hasMore"
                        class="w-1.5 h-1.5 rounded-full flex items-center justify-center text-blue-400 font-bold text-xs leading-none">
                        +
                      </div>
                    </div>
                  </TooltipTrigger>

                  <TooltipContent>
                    <div class="flex flex-col gap-2">
                      <div v-for="(event, index) in getEventsForDate(weekDate)" :key="`tooltip-${index}`"
                        class="flex items-center gap-2">
                        <div :class="cn([
                          'w-2 h-2 rounded-full flex-shrink-0',
                          event.color
                        ])" />
                        <span class="text-sm font-medium">{{ event.nombre }}</span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>