import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createTestingPinia } from '@pinia/testing';
import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import HomePage from '~/pages/index.vue';
import { useCategoryStore } from '~/stores/category';

vi.mock('~/composables/useWordApi', () => {
	// 💡 關鍵：把變數定義在 mock 的 return 裡面，不要寫在外面
	return {
		useWordApi: () => {
			const words = ref([
				{ id: 1, word: 'あ', jlpt: 'N1', isFavorite: true },
				{ id: 2, word: 'い', jlpt: 'N2', isFavorite: false },
				{ id: 3, word: 'う', jlpt: 'N1', isFavorite: false },
				{ id: 4, word: 'え', jlpt: 'N1', isFavorite: false },
			]);

			return {
				words,
				getWords: vi.fn().mockResolvedValue(words.value),
				createWords: vi.fn(),
				updateWords: vi.fn(),
				deleteWords: vi.fn(),
			};
		},
	};
});

describe('主頁單字過濾邏輯', () => {
	it('應該正確過濾 N1 分類的單字並限制顯示數量', async () => {
		// 掛載並注入初始狀態
		const wrapper = await mountSuspended(HomePage, {
			global: {
				plugins: [createTestingPinia({
					createSpy: vi.fn,
					initialState: {
						categoryToggler: { category: 'N1' },
						confirmModal: { isModalOpen: false },
					},
				})],
			},
		});

		const categoryStore = useCategoryStore();

		// 測試 N1 過濾
		// 預期：N1 有 3 個，如果 loadedCount 預設夠大，應該看到 3 個
		let items = wrapper.findAll('[data-test="word-item"]');
		expect(items.length).toBe(3);

		// 測試 toReversed 順序
		categoryStore.category = 'all';
		await nextTick();
		items = wrapper.findAll('[data-test="word-item"]');
		// 最後一個進來的 (え) 應該在第一個 (因為 toReversed)
		expect(items[1].text()).toContain('う');
	});

	it('應該正確過濾「已收藏」的單字', async () => {
		// mount 之前，先餵假資料給 localStorage
		vi.stubGlobal('localStorage', {
			getItem: vi.fn().mockReturnValue(JSON.stringify(['あ', 'い'])),
		});

		const wrapper = await mountSuspended(HomePage, {
			global: {
				plugins: [createTestingPinia({
					createSpy: vi.fn,
					initialState: {
						categoryToggler: { category: 'favorite' },
					},
				})],
			},
		});

		await nextTick();
		expect(wrapper.findAll('[data-test="word-item"]').length).toBe(2);
	});
});
