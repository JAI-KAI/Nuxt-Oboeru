<template>
    <div class=" w-full h-48 perspective-[1000px] text-gray-100" 
        @click="fliped = !fliped"
    >
        <div class="relative w-full h-full duration-500 preserve-3d rounded-xl border-2"
            :class="fliped ? 'rotate-y-180' : '', {
            'border-blue-400': word.jlpt === 'N5',
            'border-green-500': word.jlpt === 'N4',
            'border-yellow-500': word.jlpt === 'N3',
            'border-orange-600': word.jlpt === 'N2',
            'border-red-700': word.jlpt === 'N1',
            }"
        >
            <!-- Front -->
            <div class="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-gray-800 rounded-xl">
                <p class="font-bold absolute top-5 end-5" 
                    :class="{
                    'text-blue-400': word.jlpt === 'N5',
                    'text-green-500': word.jlpt === 'N4',
                    'text-yellow-500': word.jlpt === 'N3',
                    'text-orange-600': word.jlpt === 'N2',
                    'text-red-700': word.jlpt === 'N1',
                    }"
                >
                    {{ word.jlpt }}
                </p>
                <p class="text-2xl font-bold text-center">{{ word.word }}</p>
                <p class="text-gray-300 text-center">{{ word.kana }}</p>
            </div>

            <!-- Back -->
            <div class="absolute inset-0 rotate-y-180 backface-hidden flex flex-col items-center justify-center bg-gray-700 rounded-xl">
                <p class="text-gray-100">{{ word.meaning_zh }}</p>
                <p class="text-gray-300 text-sm p-3">{{ word.examples[0] }}</p>
            </div>
        </div>
    </div>

</template>

<script setup>
defineProps({
    word: Object
})

import { ref } from 'vue';

const fliped = ref(false);

</script>

<style scoped>
.preserve-3d {
    transform-style: preserve-3d;
}
</style>