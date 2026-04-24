import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import QuizIndex from '~/pages/quiz/index.vue';

// 1. 模擬 Composable 的回傳資料
mockNuxtImport('useWordApi', () => {
	return () => ({
		// 這裡模擬 API 傳回的原始單字資料
		words: ref([
			{ word: '...', jlpt: 'N5' },
			{ word: '...', jlpt: 'N5' }, // 重複的 N5
			{ word: '...', jlpt: 'N3' },
			{ word: '...', jlpt: 'N1' },
		]),
	});
});

describe('index 測驗首頁測試', () => {
	it('傳入word應正常顯示jlpt', async () => {
		const wrapper = await mountSuspended(QuizIndex);

		const links = wrapper.findAll('a');
		expect(links.length).toBe(4);
		expect(wrapper.text()).toContain('N5');
		expect(wrapper.text()).toContain('N3');
		expect(wrapper.text()).toContain('N1');
		expect(wrapper.text()).not.toContain('N4');
		expect(wrapper.text()).not.toContain('N2');
	});

	it('按鈕應該連結到正確的測驗路徑', async () => {
		const wrapper = await mountSuspended(QuizIndex);

		// 找到 N5 的按鈕 (假設它是列表中的一個)
		const n5Link = wrapper.find('a[href="/quiz/N5"]');
		expect(n5Link.exists()).toBe(true);

		const n1Link = wrapper.find('a[href="/quiz/N1"]');
		expect(n1Link.exists()).toBe(true);
	});
});
