<template>
	<div class="mt-10 text-center">
		<div>
			<NuxtLink
				to="/quiz/records"
				class="text-center px-5 py-2 rounded bg-gray-300 dark:bg-gray-800 hover:opacity-50"
			>
				測驗紀錄
			</NuxtLink>
			<h2 class="text-lg mt-10">
				請選擇以下級別以進入測驗
			</h2>
		</div>
		<div class="flex flex-col items-center space-y-8 mt-10 text-white">
			<nuxt-link
				v-for="(item, index) in jlpt"
				:key="index"
				:to="`/quiz/${item}`"
				class="w-full max-w-50 text-center py-2 rounded hover:opacity-50"
				:class="{
					'bg-blue-500': item === 'N5',
					'bg-green-500': item === 'N4',
					'bg-yellow-500': item === 'N3',
					'bg-orange-600': item === 'N2',
					'bg-red-700': item === 'N1',
				}"
			>
				{{ item }}
			</nuxt-link>
		</div>
	</div>
</template>

<script setup>
const { words } = useWordApi();

definePageMeta({
	layout: 'quiz',
});

const jlpt = computed(() => [...new Set(words.value.map(w => w.jlpt))]);
</script>
