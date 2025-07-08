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
    const stored = localStorage.getItem("newWords");
    const isChanged = JSON.parse(localStorage.getItem("isChanged"));
    jpWords.value = stored && isChanged
        ? JSON.parse(stored)
        : Words.map(w => ({
            ...w,
            isFavorite: false
        }))
}

function toggleFavorite(w) {
    w.isFavorite = !w.isFavorite;
    localStorage.setItem("isChanged", JSON.stringify(true));
    localStorage.setItem("newWords", JSON.stringify(jpWords.value));
}
</script>