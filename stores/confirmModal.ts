import { defineStore } from 'pinia'

export const useConfirmModalStore = defineStore('confirmModal', () => {
    const isModalOpen = ref<boolean>(false)
})