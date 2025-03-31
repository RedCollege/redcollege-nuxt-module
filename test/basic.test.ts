import app from './fixtures/basic/app.vue'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { mount } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('ssr', async () => {
  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await mountSuspended(app)
    expect(html.html()).toContain('<div>basic</div>')
  })
})
