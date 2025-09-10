<template>
    <div class="w-full h-48 perspective-[1000px] xl:h-60" @click="fliped = !fliped">
        <div class="relative w-full h-full duration-500 preserve-3d rounded-xl outline-2" :class="{
            'rotate-y-180': fliped,
            'outline-blue-500': word.jlpt === 'N5',
            'outline-green-500': word.jlpt === 'N4',
            'outline-yellow-500': word.jlpt === 'N3',
            'outline-orange-600': word.jlpt === 'N2',
            'outline-red-700': word.jlpt === 'N1',
        }">
            <!-- Front -->
            <div
                class="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl">
                <button @click.stop="$emit('toggle-favorite', word)" class="absolute top-4 start-4 cursor-pointer">
                    <!-- 底層：實心星 -->
                    <Icon name="i-uis:star" class="absolute hover:text-yellow-400 text-3xl z-50" 
                    :class="word.isFavorite ? 'text-yellow-400' : 'text-transparent'"/>
                    <!-- 上層：線框星 -->
                    <Icon name="i-uil:star" class="absolute text-yellow-400 text-3xl"/>
                </button>
                <p class="font-bold absolute top-5 end-5" :class="{
                    'text-blue-500': word.jlpt === 'N5',
                    'text-green-500': word.jlpt === 'N4',
                    'text-yellow-500': word.jlpt === 'N3',
                    'text-orange-600': word.jlpt === 'N2',
                    'text-red-700': word.jlpt === 'N1',
                }">
                    {{ word.jlpt }}
                </p>
                <p class="dark:text-gray-100 text-2xl font-bold text-center">{{ word.word }}</p>
                <p class="dark:text-gray-300 text-center">{{ word.kana }}</p>
            </div>

            <!-- Back -->
            <div
                class="absolute inset-0 rotate-y-180 backface-hidden flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-xl">
                <p class="dark:text-gray-100">{{ word.meaning_zh }}</p>
                <p class="dark:text-gray-300 text-sm p-3">{{ word.examples[0] }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['toggle-favorite']);
interface Word {
    jlpt: string
    word: string
    kana: string
    meaning_zh: string
    examples: string[]
    isFavorite: boolean
}
const props = defineProps<{
    word: Word
}>()

const fliped = ref(false);

</script>

<style scoped>
.preserve-3d {
    transform-style: preserve-3d;
}
</style>