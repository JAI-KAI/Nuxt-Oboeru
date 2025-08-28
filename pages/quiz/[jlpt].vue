<template>
    <div class="text-center flex flex-col">
        <div v-show="wordIndex < quizWord.length" class="text-lg">
            <h2>歡迎來到 {{ jlpt }} 測驗，本測驗共有 {{ quizWord.length }} 題</h2>
            <h2>請輸入正確平假名</h2>
        </div>
        <div v-if="wordIndex < quizWord.length">
            <div class="w-full max-w-50 h-48 mt-10 mx-auto shadow-lg relative rounded-xl outline-2" :class="{
                'outline-blue-500': jlpt === 'N5',
                'outline-green-500': jlpt === 'N4',
                'outline-yellow-500': jlpt === 'N3',
                'outline-orange-600': jlpt === 'N2',
                'outline-red-700': jlpt === 'N1',
            }">
                <div class="absolute inset-0 flex flex-col justify-center items-center px-6">
                    <p class=" text-2xl">{{ quizWord[wordIndex].word }}</p>
                    <input v-model="answer" type="text" class="mt-10 w-full px-3 py-2 rounded-md border focus:outline"
                        :class="{
                            'focus:outline-blue-300': jlpt === 'N5',
                            'focus:outline-green-300': jlpt === 'N4',
                            'focus:outline-yellow-300': jlpt === 'N3',
                            'focus:outline-orange-300': jlpt === 'N2',
                            'focus:outline-red-500': jlpt === 'N1',
                        }">
                </div>
            </div>
            <button @click="nextWord" class="mt-10 px-6 py-3 rounded-md cursor-pointer text-white font-bold bg-cyan-500 shadow-lg 
             transition hover:bg-cyan-600 hover:shadow-cyan-600/50">
                下一題
            </button>
        </div>
        <div v-else class="text-lg">
            <p>恭喜完成測驗</p>
            <p class=" font-bold">總分: {{ score }}</p>
            <div v-show="score !== 100">
                <p>以下為回答錯誤單字</p>
                <div class="grid grid-cols-2 gap-4 mt-4 xl:grid-cols-5 xl:gap-6 xl:mt-6">
                    <div v-for="w in wrongWords"
                        class="w-full max-w-50 h-48 mt-5 mx-auto shadow-lg relative rounded-xl outline-2" :class="{
                            'outline-blue-500': jlpt === 'N5',
                            'outline-green-500': jlpt === 'N4',
                            'outline-yellow-500': jlpt === 'N3',
                            'outline-orange-600': jlpt === 'N2',
                            'outline-red-700': jlpt === 'N1',
                        }">
                        <div class="absolute inset-0 flex flex-col justify-center items-center px-6">
                            <p class="text-2xl">{{ w.word }}</p>
                            <p class="font-bold">{{ w.kana }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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