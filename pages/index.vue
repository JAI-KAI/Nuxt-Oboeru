<template>
    <div class="grid grid-cols-2 gap-4 mt-4">
        <WordCard v-for="word in filterJpwords" :key="word.word" :word="word" @toggle-favorite="toggleFavorite" />
    </div>
</template>

<script setup>
import Words from '@/assets/data/jlpt_words.json';
import WordCard from '~/components/WordCard.vue';

const categoryToggler = useCategoryStore();
const jpWords = ref([]);


if (import.meta.client) {
    const favoriteWords = JSON.parse(localStorage.getItem("favoriteWords") || '[]');
    jpWords.value = Words.map(w => ({
        ...w,
        isFavorite: favoriteWords.includes(w.word)
    }))
}
const filterJpwords = computed(() => {
  const cat = categoryToggler.category

  if (cat === 'all') return jpWords.value

  if (cat === 'favorite') {          
    return jpWords.value.filter(w => w.isFavorite)
  }

  // 其餘 N1~N5
  return jpWords.value.filter(w => w.jlpt === cat)
})


function toggleFavorite(w) {
    w.isFavorite = !w.isFavorite;
    saveFavorite();
}

function saveFavorite() {
    const favoriteWords = jpWords.value
        .filter(w => w.isFavorite)
        .map(w => w.word);
    localStorage.setItem('favoriteWords', JSON.stringify(favoriteWords));
}
</script>