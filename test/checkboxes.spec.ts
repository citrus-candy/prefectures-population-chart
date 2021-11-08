import { mount } from '@vue/test-utils'
import Checkboxes from '@/components/Checkboxes.vue'
import { Prefectures } from '@/types/interface.d'

const testPrefectures: Prefectures[] = [
  {
    prefCode: 1,
    prefName: '北海道'
  }
]
const testMultiplePrefectures: Prefectures[] = [
  {
    prefCode: 1,
    prefName: '北海道'
  },
  {
    prefCode: 2,
    prefName: '青森県'
  }
]

describe('タイトル', () => {
  test('正しく表示されている', () => {
    const wrapper = mount(Checkboxes, {
      propsData: { prefectures: [], value: [] }
    })
    const title = wrapper.find('.title')
    expect(title.text()).toBe('都道府県')
  })
})

describe('チェックボックス', () => {
  test('テストデータで正しく表示されている', () => {
    const wrapper = mount(Checkboxes, {
      propsData: { prefectures: testPrefectures, value: [] }
    })
    const label = wrapper.find('label')
    expect(label.text()).toBe('北海道')
    const checkbox = wrapper.findAll('input')
    expect(checkbox.length).toBe(1)
  })
  test('複数のテストデータで正しく表示されている', () => {
    const wrapper = mount(Checkboxes, {
      propsData: { prefectures: testMultiplePrefectures, value: [] }
    })
    const label = wrapper.findAll('label')
    expect(label.at(0).text()).toBe('北海道')
    expect(label.at(1).text()).toBe('青森県')
    const checkboxes = wrapper.findAll('input')
    expect(checkboxes.length).toBe(2)
  })
  test('チェックすると値が更新される', async () => {
    const wrapper = mount(Checkboxes, {
      propsData: { prefectures: testPrefectures, value: [] }
    })
    const checkbox = wrapper.find('input')
    await checkbox.setChecked()
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')![0][0][0]).toEqual(1)
  })
})
