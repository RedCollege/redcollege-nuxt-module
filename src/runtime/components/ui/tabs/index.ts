import { cva, type VariantProps } from 'class-variance-authority'

export { default as Tabs } from './Tabs.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsContent } from './TabsContent.vue'

export const tabsListVariants = cva(
    " inline-flex items-center  h-9",
    {
        variants: {
            variant: {
                default:
                    "rounded-lg bg-muted p-1 text-muted-foreground",
                pill:
                    "rounded-none bg-none gap-2 p-0",
            },
            size: {
                default: "h-9",
                sm: "h-8  text-xs",
                lg: "h-10 ",
                icon: "h-9 w-9",
            },
            width: {
                default: "",
                fit: "w-fit"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            width: "default"
        },
    }
)


export const tabsTriggerVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm  transition-all disabled:pointer-events-none px-3",
    {
        variants: {
            variant: {
                default:
                    "rounded-md py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow",
                pill:
                    "text-muted-foreground flex items-center gap-2 ring-0 px-4 h-8 outline-none font-medium shadow-none data-[state=active]:shadow-none data-[state=active]:bg-primary/5  disabled:opacity-100 data-[state=active]:text-primary rounded-full  hover:text-primary",

            },
            size: {
                default: "",
                sm: " text-xs",
                lg: "",
                icon: "h-9 w-9",
            },
            width: {
                default: "w-full",
                fit: "w-fit"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            width: "default"
        },
    }
)

export type TabsListVariants = VariantProps<typeof tabsListVariants>
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>
