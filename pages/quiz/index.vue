<template>
    <div class="mt-10 text-center">
        <div>
            <h2 class="text-lg">請選擇以下級別以進入測驗</h2>
        </div>
        <div class="flex flex-col items-center space-y-8 mt-10 text-white">
            <nuxt-link :to="`/quiz/${item}`" v-for="(item, index) in jlpt" :key="index" 
            class="w-full max-w-50 text-center py-2 rounded"
            :class="{
                'bg-blue-500': item === 'N5',
                'bg-green-500': item === 'N4',
                'bg-yellow-500': item === 'N3',
                'bg-orange-600': item === 'N2',
                'bg-red-700': item === 'N1',
            }">
                {{ item }}
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
import Words from '@/assets/data/jlpt_words.json';
definePageMeta({
    layout: 'quiz'
})

const jlpt = [...new Set(Words.map((w) => w.jlpt))]
</script>