import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

const headerTitle: string = 'Prefectures Population Chart'

describe('タイトル', () => {
  test('正しく表示されている', () => {
    const wrapper = mount(Header, {
      propsData: { title: headerTitle }
    })
    const title = wrapper.find('.title')
    expect(title.text()).toBe(headerTitle)
  })
})
