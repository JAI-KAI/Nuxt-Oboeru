<template>
    <div>
        歡迎來到 {{ jlpt }} 測驗
    </div>
    <div v-if="wordIndex < quizWord.length">
        <p>請輸入正確平假名</p>
        <div>
            <p>{{ quizWord[wordIndex].word }}</p>
            <p>{{ quizWord[wordIndex].kana }}</p>
            <input v-model="answer" type="text">
        </div>
    </div>
    <div v-else>
        <p>恭喜完成</p>
        <div>
            總分: {{ score }}
        </div>
        <div v-show="score !== 100">
            <p>以下為錯誤單字</p>
            <div v-for="w in wrongWords">
                <p>{{ w.word }}</p>
                <p>{{ w.kana }}</p>
            </div>
        </div>
    </div>
    <button v-show="wordIndex < quizWord.length" @click="nextWord">
        下一題
    </button>
</template>

<script setup>
import Words from '@/assets/data/jlpt_words.json';
definePageMeta({
    layout: 'quiz'
})
const route = useRoute()
const jlpt = route.params.jlpt
const jlptWord = Words.filter((w) => w.jlpt == jlpt)
const quizWord = getRandomWords(jlptWord, 10)
const wordIndex = ref(0)
const answer = ref("")
const wrongWords = ref([])
const score = computed(() => {
    return Math.round(((quizWord.length - wrongWords.value.length) / (quizWord.length)) * 100)
})

function getRandomWords(word, n) {
    const words = [...word].sort(() => Math.random() - 0.5)
    return words.slice(0, n)
}
function normalize(str) {
    return str.trim().toLowerCase()
}
function nextWord() {
    if (wordIndex.value < quizWord.length) {
        if (normalize(quizWord[wordIndex.value].kana) !== normalize(answer.value)) {
            wrongWords.value.push(quizWord[wordIndex.value])
        }
        answer.value = ""
        wordIndex.value += 1
    }
}
</script>