import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
    'inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground  hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground  hover:bg-destructive/80',
                outline: 'text-foreground',
                sky:
                    'border-transparent bg-blue-500 text-primary-foreground  hover:bg-primary/80',
                purple:
                    'border-transparent bg-purple text-primary-foreground  hover:bg-primary/80',
                green:
                    'border-transparent bg-green text-primary-foreground  hover:bg-primary/80',
                gold:
                    'border-transparent bg-gold text-primary-foreground  hover:bg-primary/80',
            }
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
