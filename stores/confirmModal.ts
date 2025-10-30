import { defineStore } from 'pinia'

export const useConfirmModalStore = defineStore('confirmModal', () => {
  const isModalOpen = ref<boolean>(false) // 視窗顯示開關
  const modalType = ref('') // 目前視窗處裡事件

  function modalOn() {
    isModalOpen.value = true
  }

  function modalOff() {
    isModalOpen.value = false
  }

  function toggleType(type: string) {
    modalType.value = type
  }

  return { isModalOpen, modalType, modalOn, modalOff, toggleType }
})
