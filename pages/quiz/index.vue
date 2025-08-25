<template>
    <div>
        quiz page
    </div>
    <div class=" space-x-5 mt-5">
        <nuxt-link v-for="(item, index) in jlpt" :to="`/quiz/${item}`" :key="index">
            {{ item }}
        </nuxt-link> 
    </div>
</template>

<script setup>
import Words from '@/assets/data/jlpt_words.json';
definePageMeta({
    layout: 'quiz'
})

const jlpt = [...new Set(Words.map((w) => w.jlpt))]
</script>