<script lang="ts" setup>
</script>

<template lang="pug">
div
    div(class="bg-sky/50")
    Card
        CardHeader
        CardContent
            ul.grid.gap-2
                motion(element="li", v-for="i in 100", :initial="{ x: 50, opacity: 0 }" :key="i", :whileInView="{ x: 0, opacity: 1, transition: { duration: 0.2, delay: i * 0.001 } }")
                    .border.p-6.rounded-xl.shadow.bg-card
                        h6 Card {{i}}

    .fixed.bottom-0.mb-4(class="left-1/2 transform -translate-x-1/2")
        motion.border.rounded-xl.p-2.backdrop-blur-sm.shadow-lg(class="bg-sky/50", element="div", :whileHover="{ scale: 1.05, y: -10 }")
            .flex.gap-3
                motion(element="button", :whileHover="{ scale: 1.4, transition: { duration: 0.4, ease: [0, 0.71, 0.2, 1.01] } }")
                    img.cursor-pointer.w-16(src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Mac_App_Store_logo.png/768px-Mac_App_Store_logo.png")
                motion(element="button", :whileHover="{ scale: 1.4, transition: { duration: 0.4, ease: [0, 0.71, 0.2, 1.01] } }")
                    img.cursor-pointer.w-16(src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png")
                motion(element="button", :whileHover="{ scale: 1.4, transition: { duration: 0.4, ease: [0, 0.71, 0.2, 1.01] } }")
                    img.cursor-pointer.w-16(src="https://cdn3d.iconscout.com/3d/free/thumb/free-maps-3d-icon-download-in-png-blend-fbx-gltf-file-formats--navigation-location-macos-app-pack-user-interface-icons-8219380.png?f=webp")
                motion(element="button", :whileHover="{ scale: 1.4, transition: { duration: 0.4, ease: [0, 0.71, 0.2, 1.01] } }")
                    img.cursor-pointer.w-16(src="https://archive.org/download/c-2406703-a-1-be-4045-9252-24129-fee-7943/07E238D1-B015-4A32-B091-5CB68C631205.png")
                motion(element="button", :whileHover="{ scale: 1.4, transition: { duration: 0.4, ease: [0, 0.71, 0.2, 1.01] } }")
                    img.cursor-pointer.w-16(src="https://files.softicons.com/download/system-icons/mac-os-apps-icons-3-by-hamza-saleem/png/512x512/Preview.png")
</template>