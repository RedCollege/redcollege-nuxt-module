
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
// import MultiSelect from '@/components/tu-ruta/MultiSelect.vue' // Ajusta el path si cambia
import { nextTick } from 'vue'
import MultiSelect from '../../src/runtime/components/ui/multi-select/MultiSelect.vue'


describe('MultiSelect Component', () => {
  const options = [
    { label: 'Opción 1', value: 'opcion1' },
    { label: 'Opción 2', value: 'opcion2' },
    { label: 'Opción 3', value: 'opcion3' }
  ]

  it('debe permitir eliminar items y cerrar correctamente el popover', async () => {
    const wrapper = mount(MultiSelect, {
      props: {
        options,
        modelValue: ['opcion1', 'opcion2'],
        placeholder: 'Selecciona opciones'
      }
    })

    // Verificar que existan los badges
    expect(wrapper.findAll('span').length).toBeGreaterThan(0)

    // Simular click en el botón de eliminar el primer badge
    const firstBadgeCloseIcon = wrapper.find('span > span > svg') // Ajusta si el selector cambia
    await firstBadgeCloseIcon.trigger('click')
    await nextTick()

    // El modelo debe actualizarse
    const updatedModel = wrapper.emitted('select')?.pop()?.[0]
    expect(updatedModel).toEqual(['opcion2'])

    // Simular que el popover se cierre
    await wrapper.vm.setIsPopoverOpen(false)
    await nextTick()

    expect(wrapper.vm.isPopoverOpen).toBe(false)
  })
})
