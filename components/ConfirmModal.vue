<template>
    <div v-if="confirmModalStore.modalType == 'delete'" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>確定刪除嗎</p>
        <div class="flex gap-2 mt-4 lg:gap-6">
            <button @click="$emit('confirmDelete')" class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>
    <div v-else-if="confirmModalStore.modalType == 'edit'" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>編輯單字</p>
        <form action="">
            <div class="flex flex-col gap-2 mt-4">
                <input v-model="editedWord.jlpt" type="text" placeholder="JLPT" class="p-2 border rounded">
                <input v-model="editedWord.word" type="text" placeholder="單字" class="p-2 border rounded">
                <input v-model="editedWord.kana" type="text" placeholder="假名" class="p-2 border rounded">
                <input v-model="editedWord.meaning_zh" type="text" placeholder="中文意思" class="p-2 border rounded">
                <textarea v-model="editedWord.examples[0]" type="text" placeholder="例句" class="p-2 border rounded">
                </textarea>
            </div>
        </form>
        <div class="flex justify-center gap-2 mt-4 lg:gap-6">
            <button @click="$emit('confirmEdit', editedWord)" class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>
    <div v-else-if="confirmModalStore.modalType == 'create'" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>新增單字</p>
                <form action="">
            <div class="flex justify-center-safe flex-col gap-2 mt-4">
                <input v-model="creatWord.jlpt" type="text" placeholder="JLPT" class="p-2 border rounded">
                <input v-model="creatWord.word" type="text" placeholder="單字" class="p-2 border rounded">
                <input v-model="creatWord.kana" type="text" placeholder="假名" class="p-2 border rounded">
                <input v-model="creatWord.meaning_zh" type="text" placeholder="中文意思" class="p-2 border rounded">
                <textarea v-model="creatWord.examples[0]" type="text" placeholder="例句" class="p-2 border rounded">
                </textarea>
            </div>
        </form>
        <div class="flex gap-2 mt-4 lg:gap-6">
            <button @click="$emit('confirmCreate', creatWord)" class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { textarea } from '#build/ui';
import type { Word } from '~/pages/index.vue';

defineEmits(['confirmDelete', 'confirmCreate','confirmEdit', 'cancel'])
const props =  defineProps<{
    editWord?: Word | null
}>()

const confirmModalStore = useConfirmModalStore() //視窗狀態

const editedWord = computed(() => ({
    jlpt: props.editWord?.jlpt || '',
    word: props.editWord?.word || '',
    kana: props.editWord?.kana || '',
    meaning_zh: props.editWord?.meaning_zh || '',
    examples: props.editWord?.examples || [''],
}))

const creatWord = ref({
    jlpt: '',
    word: '',
    kana: '',
    meaning_zh: '',
    examples: [''],
})

</script>