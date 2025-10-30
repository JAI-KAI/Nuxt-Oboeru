import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categoryToggler', () => {
  const category = ref<string>('all')

  function toggle(newCate: string): void {
    category.value = newCate
  }

  function reset(): void {
    category.value = 'all'
  }

  return { category, toggle, reset }
})
