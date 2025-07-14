import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categoryToggler', {
    state: () => ({
        category: 'all'
    }),
    actions: {
        toggle(newCate) {
            this.category = newCate;
        },
        reset() {
            this.category = 'all'
        }
    }
})