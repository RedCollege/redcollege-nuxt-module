import { cva, type VariantProps } from 'class-variance-authority'

export { default as Progress } from './Progress.vue'

export const progressVariants = cva('items-center', {
    variants: {
        variant: {
            default: 'bg-muted',
            success: 'bg-green',
            sky: 'bg-sky',
            destructive: 'bg-destructive',
            orange: 'bg-orange',
            primary: 'bg-primary',
            purple: 'bg-purple',
            yellow: 'bg-yellow',
            gold: 'bg-gold'
        }
    },
    defaultVariants: {
        variant: 'success'
    }
})

// Crear un tipo más específico sin null/undefined
export type ProgressVariant = NonNullable<VariantProps<typeof progressVariants>['variant']>
