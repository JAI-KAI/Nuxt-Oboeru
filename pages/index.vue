<template>
    <div class="grid grid-cols-2 gap-4 mt-4 xl:grid-cols-5 xl:gap-6 xl:mt-6">
        <WordCard v-for="word in viewJpwords" :key="word.word" :word="word" @toggle-favorite="toggleFavorite"
            @delete-word="pendingDelete" @edit-word="editWord" />
    </div>
    <div v-show="onDeleteWord" class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700
         transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg">
        <p>確定刪除嗎</p>
        <div class="flex gap-2 mt-4 lg:gap-6">
            <button @click="deleteWord" class="px-3 py-1 bg-red-500 text-white rounded">是</button>
            <button @click="cancelDelete" class="px-3 py-1 bg-gray-300 text-black rounded">否</button>
        </div>
    </div>
    <div ref="loadMoreRef" class="h-10"></div>
</template>

<script setup lang="ts">
// import Words from '@/assets/data/jlpt_words.json'
import WordCard from '~/components/WordCard.vue'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'
const { getWords, newWords, editWords, deleteWords } = useWordApi()
const categoryToggler = useCategoryStore() //分類狀態
const onDeleteWord = ref(false) //刪除視窗顯示狀態
const pendingDeleteId = ref() //待刪除單字id
const Words = getWords()

interface Word {
    id: string
    jlpt: string
    word: string
    kana: string
    meaning_zh: string
    examples: string[]
    isFavorite: boolean
}

const jpWords = ref<Word[]>([])

if (import.meta.client) {
    const favoriteWords = JSON.parse(localStorage.getItem("favoriteWords") || '[]')
    jpWords.value = Words.value.map(w => ({
        ...w,
        isFavorite: favoriteWords.includes(w.word)
    }))
}



const loadedCount = ref(10) //初始長度

const filterJpwords = computed(() => {
    const cat = categoryToggler.category

    if (cat === 'all') return jpWords.value

    if (cat === 'favorite') {
        return jpWords.value.filter(w => w.isFavorite)
    }

    // 其餘 N1~N5
    return jpWords.value.filter(w => w.jlpt === cat)
})

const viewJpwords = computed(() => {
    return filterJpwords.value.slice(0, loadedCount.value)
})

function toggleFavorite(w: Word) {
    w.isFavorite = !w.isFavorite;
    saveFavorite();
}

function saveFavorite(): void {
    const favoriteWords = jpWords.value
        .filter(w => w.isFavorite)
        .map(w => w.word);
    localStorage.setItem('favoriteWords', JSON.stringify(favoriteWords));
}

function loadMore(): void {
    if (loadedCount.value < filterJpwords.value.length) {
        loadedCount.value += 10
    }
}

const pendingDelete = (id: string) => {
    onDeleteWord.value = true
    pendingDeleteId.value = id
}

const cancelDelete = () => {
    onDeleteWord.value = false
    pendingDeleteId.value = ''
}

const deleteWord = () => {
    deleteWords(pendingDeleteId.value)
    onDeleteWord.value = false
    jpWords.value = jpWords.value.filter((w) => w.id !== pendingDeleteId.value)
}

const editWord = () => {

}

watch(() => categoryToggler.category, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    loadedCount.value = 10
    loadMore()
})

const { target: loadMoreRef } = useIntersectionObserver(() => {
    loadMore()
})
</script>