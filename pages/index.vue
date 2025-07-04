<template>
    <div class="grid grid-cols-2 gap-4 mt-4">
        <WordCard v-for="word in jpWords" :key="word.word" :word="word" @toggle-favorite="toggleFavorite" />
    </div>
</template>

<script setup>
import Words from '@/assets/data/jlpt_words.json';
import WordCard from '~/components/WordCard.vue';

const jpWords = ref(
    Words.map(w => ({
        ...w,
        isFavorite: false
    }))
)

function toggleFavorite(w) {
    w.isFavorite = !w.isFavorite
}
</script>