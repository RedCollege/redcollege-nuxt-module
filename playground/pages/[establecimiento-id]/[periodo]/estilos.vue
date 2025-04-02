<template lang="pug">
    Card.p-6.grid.gap-2
        .flex.gap-2.bg-white
            Button botón
            Button(variant="secondary") boton 2
            Button(variant="destructive") boton 3
            Button(variant="green") boton 3
            Button(variant="gold") boton 3
            Button(variant="sky") boton 3
            Button(variant="link") texto
        .flex.gap-2.bg-white
            Badge botón
            Badge(variant="secondary") boton 2
            Badge(variant="green") boton 3
            Badge(variant="gold") boton 3
            Badge(variant="sky") boton 3
        .flex.gap-2.bg-white
            div
                .w-16.h-16.rounded-xl.bg-destructive
                p.text-sm destructive
            div
                .w-16.h-16.rounded-xl.bg-green
                p.text-sm green
            div
                .w-16.h-16.rounded-xl.bg-sky
                p.text-sm sky
            div
                .w-16.h-16.rounded-xl.bg-gold
                p.text-sm gold
            div
                .w-16.h-16.rounded-xl.bg-muted
                p.text-sm muted
            div
                .w-16.h-16.rounded-xl.bg-foreground
                p.text-sm foreground
            div
                .w-16.h-16.rounded-xl.bg-primary
                p.text-sm bprimary
            div
                .w-16.h-16.rounded-xl.bg-accent
                p.text-sm accent
</template>