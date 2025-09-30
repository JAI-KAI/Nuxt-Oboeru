<template>
    <div class="grid grid-cols-2 gap-4 mt-4 xl:grid-cols-5 xl:gap-6 xl:mt-6">
        <WordCard v-for="word in viewJpwords" :key="word.word" :word="word" @toggle-favorite="toggleFavorite"
            @request-delete="pendingDelete" @request-editWord="pendingEdit" />
    </div>
    <ConfirmModal v-show="confirmModalStore.isModalOpen" :editWord= "pendingEditWord" @confirm="handleDelete" @cancel="cancelModal"/>
    <div ref="loadMoreRef" class="h-10"></div>
</template>

<script setup lang="ts">
// import Words from '@/assets/data/jlpt_words.json'
import WordCard from '~/components/WordCard.vue'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'
import { useWordApi } from '~/composables/useWordApi'
const { getWords, newWords, editWords, deleteWords } = useWordApi()
const categoryToggler = useCategoryStore() //分類狀態
const confirmModalStore = useConfirmModalStore() //視窗狀態
const isModalOpen = confirmModalStore.isModalOpen //視窗顯示狀態
const pendingDeleteId = ref() //待刪除單字id
const pendingEditWord = ref() //待編輯單字
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
    confirmModalStore.modalOn()
    confirmModalStore.toggleType('delete')
    pendingDeleteId.value = id
}

const handleDelete = () => {
    deleteWords(pendingDeleteId.value)
    confirmModalStore.modalOff()
    jpWords.value = jpWords.value.filter((w) => w.id !== pendingDeleteId.value)
}

const pendingEdit = (w: Word) => {
    pendingEditWord.value = w
    confirmModalStore.modalOn()
    confirmModalStore.toggleType('edit')
}

const cancelModal = () => {
    confirmModalStore.modalOff()
    pendingDeleteId.value = ''
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