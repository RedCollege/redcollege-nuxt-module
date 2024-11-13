import { ref } from 'vue'
import ConfettiExplosion from 'vue-confetti-explosion'
import { createApp, h, nextTick } from 'vue'

export const useConfetti = () => {
    let confettiContainer: HTMLDivElement | null = null
    let confettiApp: any | null = null

    const createConfettiContainer = () => {
        // Limpiar contenedor anterior si existe
        if (confettiContainer) {
            document.body.removeChild(confettiContainer)
        }

        confettiContainer = document.createElement('div')
        confettiContainer.style.position = 'fixed'
        confettiContainer.style.zIndex = '9999'
        confettiContainer.style.pointerEvents = 'none'
        document.body.appendChild(confettiContainer)
    }

    const showConfetti = async (options = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    }) => {
        // Limpiar instancia anterior
        if (confettiApp) {
            confettiApp.unmount()
            confettiApp = null
        }

        createConfettiContainer()

        if (confettiContainer) {
            confettiContainer.style.left = `${options.x}px`
            confettiContainer.style.top = `${options.y}px`

            confettiApp = createApp({
                setup() {
                    const isVisible = ref(true)

                    return () => isVisible.value ? h(ConfettiExplosion, {
                        particleCount: 200,
                        force: 1.5,
                    }) : null
                }
            })

            confettiApp.mount(confettiContainer)
        }
    }

    const showConfettiAtMousePosition = (event: MouseEvent) => {
        showConfetti({
            x: event.clientX,
            y: event.clientY
        })
    }

    const showConfettiAtElement = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect()
        showConfetti({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        })
    }

    return {
        showConfetti,
        showConfettiAtMousePosition,
        showConfettiAtElement
    }
}
