<template>
    <div class="grid grid-cols-2 gap-4 mt-4 xl:grid-cols-5 xl:gap-6 xl:mt-6">
        <WordCard v-for="word in viewJpwords" :key="word.id" :word="word" @toggle-favorite="toggleFavorite"
            @request-delete="pendingDelete" @request-updateWord="pendingUpdate" />
    </div>
    <ConfirmModal v-show="confirmModalStore.isModalOpen" :updateWord= "pendingUpdateWord" 
    @confirm-delete="handleDelete" @confirm-create="console.log('oncreate')" @confirm-update="handleUpdate" @cancel="cancelModal"/>
    <div ref="loadMoreRef" class="h-10"></div>
</template>

<script setup lang="ts">
// import Words from '@/assets/data/jlpt_words.json'
import WordCard from '~/components/WordCard.vue'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'
import { useWordApi } from '~/composables/useWordApi'
const {words, newWords, updateWords, deleteWords } = useWordApi()
const categoryToggler = useCategoryStore() //分類狀態
const confirmModalStore = useConfirmModalStore() //視窗狀態
const pendingDeleteId = ref() //待刪除單字id
const pendingUpdateWord = ref<Word | null>(null) //待編輯單字

export interface Word {
    id: string
    jlpt: string
    word: string
    kana: string
    meaning_zh: string
    examples: string[]
    isFavorite: boolean
}

const jpWords = computed(() => {
    if (!import.meta.client || !words.value) return []
    
    const favoriteWords = JSON.parse(localStorage.getItem("favoriteWords") || '[]')
    return words.value.map(w => ({
        ...w,
        isFavorite: favoriteWords.includes(w.word)
    }))
})

const loadedCount = ref(15) //初始長度

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
}

const pendingUpdate = (w: Word) => {
    pendingUpdateWord.value = JSON.parse(JSON.stringify(w)) //深拷貝
    confirmModalStore.modalOn()
    confirmModalStore.toggleType('update')
}

const handleUpdate = (w: Word) => {
    updateWords(w.id, w)
    confirmModalStore.modalOff()
    pendingUpdateWord.value = null
}

const cancelModal = () => {
    confirmModalStore.modalOff()
    pendingDeleteId.value = ''
    pendingUpdateWord.value = null
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