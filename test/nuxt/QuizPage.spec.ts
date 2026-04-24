import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import QuizPage from '~/pages/quiz/[jlpt].vue';

// 1. 模擬路由
mockNuxtImport('useRoute', () => {
	return () => ({
		params: { jlpt: 'N1' },
	});
});

// 2. 模擬 API 資料
const mockWords = [
	{ word: '懸念', kana: 'けねん', jlpt: 'N1' },
	{ word: '勉強', kana: 'べんきょう', jlpt: 'N1' },
];

mockNuxtImport('useWordApi', () => {
	return () => ({
		words: ref(mockWords),
	});
});

describe('Quiz 測驗頁面測試', () => {
	it('進入頁面時應正確過濾出 N1 的單字並顯示標題', async () => {
		const wrapper = await mountSuspended(QuizPage);

		expect(wrapper.text()).toContain('歡迎來到 N1 測驗');
		// 檢查是否只抽出了 N1 的內容
	});

	it('輸入正確答案並跳下一題時，分數不應扣分', async () => {
		const wrapper = await mountSuspended(QuizPage);

		// 1. 從組件狀態中抓取當前真正的題目
		const currentWord = wrapper.vm.quizWord[0];

		// 2. 根據這筆資料動態輸入正確答案
		const input = wrapper.find('input[type="text"]');
		await input.setValue(currentWord.kana);

		// 3. 觸發按鈕
		const nextBtn = wrapper.find('button');
		await nextBtn.trigger('click');

		// 檢查是否跳到下一題
		expect(wrapper.vm.wordIndex).toBe(1);
		expect(wrapper.vm.wrongWords.length).toBe(0);

		// 錯誤時wrongWords增加
		await input.setValue('fdsagdsfg');
		await input.trigger('keydown.enter');

		expect(wrapper.vm.wordIndex).toBe(2);
		expect(wrapper.vm.wrongWords.length).toBe(1);
	});

	it('測驗結束後應顯示總分並寫入紀錄', async () => {
		const wrapper = await mountSuspended(QuizPage);

		wrapper.vm.wordIndex = wrapper.vm.quizWord.length - 1;
		await nextTick();

		const nextBtn = wrapper.find('button');
		await nextBtn.trigger('click');

		await nextTick();

		expect(wrapper.text()).toContain('恭喜完成測驗');

		const savedRecords = JSON.parse(localStorage.getItem('records') || '[]');
		expect(savedRecords.length).toBeGreaterThan(0);
		expect(savedRecords[0].score).toBeDefined();
		expect(savedRecords[0].jlpt).toBe('N1');
	});
});
