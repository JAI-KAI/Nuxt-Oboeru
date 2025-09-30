<template>
    <div v-if="confirmModalStore.modalType == 'delete'" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>確定刪除嗎</p>
        <div class="flex gap-2 mt-4 lg:gap-6">
            <button @click="$emit('confirm')" class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>
    <div v-else-if="confirmModalStore.modalType == 'edit'" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>編輯</p>
        <p>{{ editWord }}</p>
        <div class="flex gap-2 mt-4 lg:gap-6">
            <button @click="$emit('confirm')" class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>
    <div v-else-if="confirmModalStore.modalType == 'create'" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>新增</p>
        <div class="flex gap-2 mt-4 lg:gap-6">
            <button @click="$emit('confirm')" class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['confirm', 'cancel'])
defineProps<{
    editWord: object
}>()
const confirmModalStore = useConfirmModalStore() //視窗狀態

</script>