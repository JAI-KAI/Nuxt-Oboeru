import type { Word } from '~/pages/index.vue';
import type { Database } from '~/supabase.ts';

export const useWordApi = () => {
	const supabase = useSupabaseClient<Database>();
	const words = ref<Word[]>([]);

	// 讀取資料
	const fetchWords = async () => {
		const { data, error } = await supabase
			.from('jlpt_words')
			.select('*');

		if (error) {
			console.error('Error fetching words:', error);
			return;
		}

		words.value = data ?? [];
	};

	onMounted(() => {
		fetchWords();
	});

	// 建立單字
	const createWords = async (data: Word) => {
		const { data: created, error } = await supabase
			.from('jlpt_words')
			.insert(data)
			.select()
			.single();

		if (error) {
			console.error('Error creating word:', error);
			throw error;
		}

		words.value.push(created);
	};

	// 更新單字
	const updateWords = async (id: number, data: Omit<Word, 'id' | 'isFavorite'>) => {
		const { data: updated, error } = await supabase
			.from('jlpt_words')
			.update(data)
			.eq('id', id)
			.select()
			.single();

		if (error) {
			console.error('Error updating word:', error);
			throw error;
		}

		const index = words.value.findIndex(w => w.id === id);
		if (index !== -1) words.value[index] = updated;
	};

	// 刪除單字
	const deleteWords = async (id: number) => {
		const { error } = await supabase
			.from('jlpt_words')
			.delete()
			.eq('id', id);

		if (error) {
			console.error('Error deleting word:', error);
			throw error;
		}

		words.value = words.value.filter(w => w.id !== id);
	};

	return { words, createWords, updateWords, deleteWords, fetchWords };
};
