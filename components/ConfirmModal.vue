<template>
    <!-- 刪除 -->
    <div v-if="confirmModalStore.modalType == 'delete'" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>確定刪除 {{deletedWord.jlpt}}單字「{{deletedWord.word}}」嗎</p>
        <div class="flex justify-center gap-2 mt-4 lg:gap-6">
            <button @click="$emit('confirmDelete')" class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>

    <!-- 編輯 -->
    <div v-else-if="confirmModalStore.modalType == 'update'" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>編輯單字</p>
        <form action="">
            <div class="flex flex-col gap-2 mt-4">
                <select v-model="updatedWord.jlpt" name="JLPT" class="p-2 border rounded dark:bg-gray-700">
                    <option>N1</option>
                    <option>N2</option>
                    <option>N3</option>
                    <option>N4</option>
                    <option>N5</option>
                </select>
                <input v-model="updatedWord.word" type="text" placeholder="單字" class="p-2 border rounded">
                <input v-model="updatedWord.kana" type="text" placeholder="假名" class="p-2 border rounded">
                <input v-model="updatedWord.meaning_zh" type="text" placeholder="中文意思" class="p-2 border rounded">
                <textarea v-model="updatedWord.examples[0]" type="text" placeholder="例句" class="p-2 border rounded">
                </textarea>
            </div>
        </form>
        <div class="flex justify-center gap-2 mt-4 lg:gap-6">
            <button @click="$emit('confirmUpdate', updatedWord)"
                class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>

    <!-- 新增 -->
    <div v-else-if="confirmModalStore.modalType == 'create'" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>新增單字</p>
        <form action="">
            <div class="flex flex-col gap-2 mt-4">
                <select v-model="createdWord.jlpt" name="JLPT" class="p-2 border rounded dark:bg-gray-700">
                    <option>JLPT Level</option>
                    <option>N1</option>
                    <option>N2</option>
                    <option>N3</option>
                    <option>N4</option>
                    <option>N5</option>
                </select>
                <input v-model="createdWord.word" type="text" placeholder="單字" class="p-2 border rounded">
                <input v-model="createdWord.kana" type="text" placeholder="假名" class="p-2 border rounded">
                <input v-model="createdWord.meaning_zh" type="text" placeholder="中文意思" class="p-2 border rounded">
                <textarea v-model="createdWord.examples[0]" type="text" placeholder="例句" class="p-2 border rounded">
                </textarea>
            </div>
        </form>
        <div class="flex justify-center gap-2 mt-4 lg:gap-6">
            <button @click="$emit('confirmCreate', createdWord)" class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Word } from '~/pages/index.vue'
const confirmModalStore = useConfirmModalStore() //視窗狀態
defineEmits(['confirmDelete', 'confirmCreate', 'confirmUpdate', 'cancel'])
const props = defineProps<{
    deleteWord: Word,
    updateWord: Omit<Word, 'id' | 'isFavorite'>,
    createWord: Omit<Word, 'id' | 'isFavorite'>
}>()
const deletedWord = ref<Word>({...props.deleteWord})
const updatedWord = ref<Omit<Word, 'id' | 'isFavorite'>>({...props.updateWord})
const createdWord = ref<Omit<Word, 'id' | 'isFavorite'>>({...props.createWord})

watch(() => props.deleteWord, (newVal) => {
    deletedWord.value = {...newVal}
})

watch(() => props.updateWord, (newVal) => {
    updatedWord.value = {...newVal}
})

watch(() => props.createWord, (newVal) => {
    createdWord.value = {...newVal}
})

</script>