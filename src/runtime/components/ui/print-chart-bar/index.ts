// index.ts
export { default as DescargableBarChart } from './PrintBarChart.vue'

type KeyOf<T extends Record<string, any>> = Extract<keyof T, string>

export interface BaseChartProps<T extends Record<string, any>> {
  /**
   * The source data, in which each entry is a dictionary.
   */
  data: T[]
  /**
   * Select the categories from your data. Used to populate the legend and tooltip.
   */
  categories: KeyOf<T>[]
  /**
   * Sets the key to map the data to the axis.
   */
  index: KeyOf<T>
  /**
   * Change the default colors.
   */
  colors?: string[]
  /**
   * Change the opacity of the non-selected field
   * @default 0.2
   */
  filterOpacity?: number
  /**
   * Function to format X label
   */
  xFormatter?: (tick: string | number) => string
  /**
   * Function to format Y label
   */
  yFormatter?: (tick: number) => string
  /**
   * Controls the visibility of the X axis.
   * @default true
   */
  showXAxis?: boolean
  /**
   * Controls the visibility of the Y axis.
   * @default true
   */
  showYAxis?: boolean
  /**
   * Controls the visibility of tooltip.
   * @default true
   */
  showTooltip?: boolean
  /**
   * Controls the visibility of legend.
   * @default true
   */
  showLegend?: boolean
  /**
   * Controls the visibility of gridline.
   * @default true
   */
  showGridLine?: boolean
  /**
   * Change the type of the chart
   * @default "grouped"
   */
  type?: 'stacked' | 'grouped'
  /**
   * Rounded bar corners
   * @default 0
   */
  roundedCorners?: number
  /**
   * Disable chart animation
   * @default false
   */
  disableAnimation?: boolean
}

export function defaultColors(count: number = 3) {
  const quotient = Math.floor(count / 2)
  const remainder = count % 2

  const primaryCount = quotient + remainder
  const secondaryCount = quotient
  return [
    ...Array.from(new Array(primaryCount).keys()).map(i => `hsl(var(--vis-primary-color) / ${1 - (1 / primaryCount) * i})`),
    ...Array.from(new Array(secondaryCount).keys()).map(i => `hsl(var(--vis-secondary-color) / ${1 - (1 / secondaryCount) * i})`),
  ];
}