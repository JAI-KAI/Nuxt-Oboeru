<template>
    <div class="grid grid-cols-2 gap-4 mt-4">
        <WordCard v-for="word in jpWords" :key="word.word" :word="word" @toggle-favorite="toggleFavorite" />
    </div>
</template>

<script setup>
import Words from '@/assets/data/jlpt_words.json';
import WordCard from '~/components/WordCard.vue';
import { ref } from 'vue'

const jpWords = ref([]);

if (import.meta.client) {
    const favoriteWords = JSON.parse(localStorage.getItem("favoriteWords") || '[]');
    jpWords.value = Words.map(w => ({
        ...w,
        isFavorite: favoriteWords.includes(w.word)
    }))
}

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