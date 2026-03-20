import { useCategoryStore } from '#imports';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createTestingPinia } from '@pinia/testing'; // 需要安裝 @pinia/testing
import { describe, expect, it, vi } from 'vitest';
import CategoryNav from '~/components/CategoryNav.vue';

describe('CategoryTabs 分類切換組件', () => {
	it('點擊「已收藏」按鈕後 Store 的狀態應該切換', async () => {
		// 1. 初始化測試用的 Pinia
		// stubActions: false 代表我們要執行真實的 store 動作
		const wrapper = await mountSuspended(CategoryNav, {
			global: {
				plugins: [createTestingPinia({
					stubActions: false,
					createSpy: vi.fn,
				})],
			},
		});

		const store = useCategoryStore();

		// 2. 找到「已收藏」按鈕並點擊 (假設你加了 data-test="btn-favorite")
		const favoriteBtn = wrapper.find('[data-test="btn-N1"]');
		await favoriteBtn.trigger('click');

		// 3. 斷言：檢查 Store 的狀態是否變成 'favorite'
		expect(store.category).toBe('N1');
	});
});
