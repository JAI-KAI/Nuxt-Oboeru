<template>
	<!-- 刪除 -->
	<div
		v-if="confirmModalStore.modalType == 'delete'"
		class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg"
	>
		<p>確定刪除 {{ deletedWord?.jlpt }}單字「{{ deletedWord?.word }}」嗎</p>
		<div class="flex justify-center gap-2 mt-4 lg:gap-6">
			<button
				class="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
				data-test="btn-delete"
				@click="$emit('confirmDelete')"
			>
				確定刪除
			</button>
			<button
				class="px-3 py-1 bg-gray-300 text-black rounded cursor-pointer"
				data-test="btn-cancel"
				@click="$emit('cancel')"
			>
				取消
			</button>
		</div>
	</div>

	<!-- 編輯 -->
	<div
		v-else-if="confirmModalStore.modalType == 'update' && updatedWord"
		class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg"
	>
		<p>編輯單字</p>
		<form action="">
			<div class="flex flex-col gap-2 mt-4">
				<select
					v-model="updatedWord.jlpt"
					name="JLPT"
					class="p-2 border rounded dark:bg-gray-700"
				>
					<option>N1</option>
					<option>N2</option>
					<option>N3</option>
					<option>N4</option>
					<option>N5</option>
				</select>
				<input
					v-model="updatedWord.word"
					type="text"
					placeholder="單字"
					class="p-2 border rounded"
				>
				<input
					v-model="updatedWord.kana"
					type="text"
					placeholder="假名"
					class="p-2 border rounded"
				>
				<input
					v-model="updatedWord.meaning_zh"
					type="text"
					placeholder="中文意思"
					class="p-2 border rounded"
				>
				<textarea
					v-model="updatedWord.examples"
					type="text"
					placeholder="例句"
					class="p-2 border rounded"
				/>
			</div>
		</form>
		<div class="flex justify-center gap-2 mt-4 lg:gap-6">
			<button
				class="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
				@click="$emit('confirmUpdate', updatedWord)"
			>
				確定修改
			</button>
			<button
				class="px-3 py-1 bg-gray-300 text-black rounded cursor-pointer"
				@click="$emit('cancel')"
			>
				取消
			</button>
		</div>
	</div>

	<!-- 新增 -->
	<div
		v-else-if="confirmModalStore.modalType == 'create' && createdWord"
		class="fixed top-1/2 left-1/2 z-50 text-center bg-white dark:bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 p-6 lg:p-16 rounded shadow-lg"
	>
		<p>新增單字</p>
		<form action="">
			<div class="flex flex-col gap-2 mt-4">
				<select
					name="JLPT"
					class="p-2 border rounded dark:bg-gray-700"
				>
					<option
						value=""
						disabled
					>
						請選擇等級
					</option>
					<option>N1</option>
					<option>N2</option>
					<option>N3</option>
					<option>N4</option>
					<option>N5</option>
				</select>
				<input
					v-model="createdWord.word"
					type="text"
					placeholder="單字"
					class="p-2 border rounded"
				>
				<input
					v-model="createdWord.kana"
					type="text"
					placeholder="假名"
					class="p-2 border rounded"
				>
				<input
					v-model="createdWord.meaning_zh"
					type="text"
					placeholder="中文意思"
					class="p-2 border rounded"
				>
				<textarea
					v-model="createdWord.examples"
					type="text"
					placeholder="例句"
					class="p-2 border rounded"
				/>
			</div>
		</form>
		<div class="flex justify-center gap-2 mt-4 lg:gap-6">
			<button
				class="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
				data-test="btn-create"
				@click="$emit('confirmCreate', createdWord)"
			>
				確定新增
			</button>
			<button
				class="px-3 py-1 bg-gray-300 text-black rounded cursor-pointer"
				@click="$emit('cancel')"
			>
				取消
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Word } from '~/pages/index.vue';

const confirmModalStore = useConfirmModalStore(); // 視窗狀態
defineEmits(['confirmDelete', 'confirmCreate', 'confirmUpdate', 'cancel']);
const props = defineProps<{
	deleteWord: Partial<Word> | null;
	updateWord: Partial<Word> | null;
	createWord: Omit<Word, 'id' | 'isFavorite'> | null;
}>();
const deletedWord = ref<Partial<Word> | null>({ ...props.deleteWord });
const updatedWord = ref<Partial<Word> | null>({ ...props.updateWord });
const createdWord = ref<Omit<Word, 'id' | 'isFavorite'> | null>(null);

watch(
	() => props.deleteWord,
	(newVal) => {
		deletedWord.value = { ...newVal };
	},
);

watch(
	() => props.updateWord,
	(newVal) => {
		updatedWord.value = { ...newVal };
	},
);

watch(
	() => confirmModalStore.modalType,
	(newVal) => {
		if (newVal == 'create') {
			createdWord.value = {
				jlpt: 'N5',
				word: '',
				kana: '',
				meaning_zh: '',
				examples: '',
			};
		}
	},
);
</script>
