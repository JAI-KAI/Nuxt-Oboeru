<template>
	<div>
		<div class="grid grid-cols-2 gap-4 mt-4 xl:grid-cols-5 xl:gap-6 xl:mt-6">
			<WordCard
				v-for="word in viewJpwords"
				:key="word.id"
				:word="word"
				@toggle-favorite="toggleFavorite"
				@request-delete="pendingDelete"
				@request-update-word="pendingUpdate"
			/>
		</div>
		<ConfirmModal
			v-show="confirmModalStore.isModalOpen"
			:delete-word="pendingDeleteWord"
			:update-word="pendingUpdateWord"
			:create-word="pendingCreateWord"
			@confirm-delete="handleDelete"
			@confirm-create="handleCreate"
			@confirm-update="handleUpdate"
			@cancel="cancelModal"
		/>
		<light-box />
		<div
			ref="loadMoreRef"
			class="h-10"
		/>
	</div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '~/composables/useIntersectionObserver';

const { addMessage } = useMessage();
const { words, createWords, updateWords, deleteWords } = useWordApi();
const categoryToggler = useCategoryStore(); // 分類狀態
const confirmModalStore = useConfirmModalStore(); // 視窗狀態
const pendingDeleteWord = ref<Word>({
	id: '',
	jlpt: '',
	word: '',
	kana: '',
	meaning_zh: '',
	examples: [''],
	isFavorite: false,
}); // 待刪除單字
const pendingUpdateWord = ref<Omit<Word, 'id' | 'isFavorite'>>({
	jlpt: '',
	word: '',
	kana: '',
	meaning_zh: '',
	examples: [''],
}); // 待編輯單字
const pendingCreateWord = ref<Omit<Word, 'id' | 'isFavorite'>>({
	jlpt: 'JLPT Level',
	word: '',
	kana: '',
	meaning_zh: '',
	examples: [''],
}); // 待新增單字

export interface Word {
	id: string;
	jlpt: string;
	word: string;
	kana: string;
	meaning_zh: string;
	examples: string[];
	isFavorite: boolean;
}

const favoriteWords = ref<string[]>([]);
onMounted(() => {
	const stored = localStorage.getItem('favoriteWords');
	if (stored) {
		favoriteWords.value = JSON.parse(stored);
	}
});
const jpWords = computed(() => {
	if (!words.value) return [];

	return words.value.map(w => ({
		...w,
		isFavorite: favoriteWords.value.includes(w.word),
	}));
});

const filterJpwords = computed(() => {
	const cat = categoryToggler.category;

	if (cat === 'all') return jpWords.value;

	if (cat === 'favorite') {
		return jpWords.value.filter(w => w.isFavorite);
	}

	// 其餘 N1~N5
	return jpWords.value.filter(w => w.jlpt === cat);
});

const viewJpwords = computed(() => {
	// 用 toReversed() (不改變原陣列)
	return filterJpwords.value.toReversed().slice(0, loadedCount.value);
});

function toggleFavorite(w: Word) {
	w.isFavorite = !w.isFavorite;
	saveFavorite();
}

function saveFavorite(): void {
	favoriteWords.value = jpWords.value.filter(w => w.isFavorite).map(w => w.word);
	localStorage.setItem('favoriteWords', JSON.stringify(favoriteWords.value));
}

const loadedCount = ref(20); // 初始單字數量
function loadMore(): void {
	if (loadedCount.value < filterJpwords.value.length) {
		loadedCount.value += 10;
	}
}

watch(() => categoryToggler.category, () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
	loadedCount.value = 10;
	loadMore();
});

const { target: loadMoreRef } = useIntersectionObserver(() => {
	loadMore();
});

const cancelModal = () => {
	confirmModalStore.modalOff();
	pendingDeleteWord.value = {
		id: '',
		jlpt: '',
		word: '',
		kana: '',
		meaning_zh: '',
		examples: [''],
		isFavorite: false,
	};
	pendingUpdateWord.value = {
		jlpt: '',
		word: '',
		kana: '',
		meaning_zh: '',
		examples: [''],
	};
	pendingCreateWord.value = {
		jlpt: 'JLPT Level',
		word: '',
		kana: '',
		meaning_zh: '',
		examples: [''],
	};
};

// CRUD操作

// 刪除單字
const pendingDelete = (w: Word) => {
	confirmModalStore.modalOn();
	confirmModalStore.toggleType('delete');
	pendingDeleteWord.value = JSON.parse(JSON.stringify(w)); // 深拷貝
};

const handleDelete = async () => {
	try {
		await deleteWords(pendingDeleteWord.value.id);
		cancelModal();
		addMessage('單字已刪除');
	}
	catch (error) {
		addMessage(`刪除單字錯誤:${error}`);
		console.error('Error deleting word:', error);
	}
};

// 編輯單字
const pendingUpdate = (w: Word) => {
	pendingUpdateWord.value = JSON.parse(JSON.stringify(w)); // 深拷貝
	confirmModalStore.modalOn();
	confirmModalStore.toggleType('update');
};

const handleUpdate = async (w: Word) => {
	try {
		await updateWords(w.id, w);
		cancelModal();
		addMessage('單字已更新');
	}
	catch (error) {
		addMessage(`更新單字錯誤:${error}`);
		console.error('Error updating word:', error);
	}
};

// 新增單字
const handleCreate = async (w: Word) => {
	try {
		await createWords(w);
		cancelModal();
		addMessage('單字已新增');
	}
	catch (error) {
		addMessage(`新增單字錯誤:${error}`);
		console.error('Error creating word:', error);
	}
};
</script>
