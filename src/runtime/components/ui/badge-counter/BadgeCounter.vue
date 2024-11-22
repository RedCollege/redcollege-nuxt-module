
<script setup lang="ts">

interface Props {
    total?: number
}

withDefaults(defineProps<Props>(), {
    total: 0
})
</script>


<template>
    <div class="relative inline-flex">
        <slot/>
        <Badge v-if="total > 0" variant="destructive"
            class="absolute -top-0 -right-0 h-4 w-4 flex items-center justify-center p-0 font-medium text-[10px]">
            {{ total > 9 ? "+9" : total }}
        </Badge>
    </div>
</template>
