<template>
    <div class="grid grid-cols-2 gap-4 mt-4">
       <WordCard 
        v-for="word in Words"
        :key="word.word"
        :word="word"
       />
    </div>
</template>

<script setup>
import Words from '@/assets/data/jlpt_words.json';
import WordCard from '~/components/WordCard.vue';
</script>