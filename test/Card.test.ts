import { describe, expect, it } from "vitest";
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Card from '../src/runtime/components/Contenidos/Card.vue'


describe('Navbar', () => {
  it('contain a Curso word', async () => {

    const component = await mountSuspended(Card)
    expect(component.html()).toContain('<span>Deshabilitar</span>');

  });
});