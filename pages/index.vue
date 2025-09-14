<template>
    <div class="grid grid-cols-2 gap-4 mt-4 xl:grid-cols-5 xl:gap-6 xl:mt-6">
        <WordCard v-for="word in viewJpwords" :key="word.word" :word="word" @toggle-favorite="toggleFavorite" />
    </div>
    <div ref="loadMoreRef" class="h-10"></div>
</template>

<script setup lang="ts">
import Words from '@/assets/data/jlpt_words.json';
import WordCard from '~/components/WordCard.vue';
import { useIntersectionObserver } from '~/composable/useIntersectionObserver';

interface Word {
    jlpt: string
    word: string
    kana: string
    meaning_zh: string
    examples: string[]
    isFavorite: boolean
}
const categoryToggler = useCategoryStore();
const jpWords = ref<Word[]>([]);


if (import.meta.client) {
    const favoriteWords = JSON.parse(localStorage.getItem("favoriteWords") || '[]');
    jpWords.value = Words.map(w => ({
        ...w,
        isFavorite: favoriteWords.includes(w.word)
    }))
}

const loadedCount = ref(5) //初始長度

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
    if(loadedCount.value < filterJpwords.value.length) {
        loadedCount.value += 10
    }
}

watch(() => categoryToggler.category, () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    loadedCount.value = 10
    loadMore()
})

const { target: loadMoreRef} = useIntersectionObserver(() => {
    loadMore()
})
</script>