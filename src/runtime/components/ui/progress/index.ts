import {cva, type VariantProps} from 'class-variance-authority'

export { default as Progress } from './Progress.vue'
export const progressVariants = cva(
    'items-center',
    {
        variants: {
            variant: {
                default: 'bg-muted',
                success: 'bg-green',
                sky: 'bg-sky',
                destructive: 'bg-destructive',
                orange: 'bg-orange-200',
                primary: 'bg-primary'
            }
        },
        defaultVariants: {
            variant: 'success'
        }
    },
)

export type ProgressVariant = VariantProps<typeof progressVariants>
