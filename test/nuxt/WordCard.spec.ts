import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import WordCard from '~/components/WordCard.vue';
import type { Word } from '~/pages/index.vue';

const mockWord = {
	id: 1,
	word: '猫',
	kana: 'ねこ',
	meaning_zh: '貓',
	jlpt: 'N5',
	examples: '可愛い猫ですね',
};

describe('WordCard 組件', () => {
	it('應該正確顯示單字與假名', async () => {
		const wrapper = await mountSuspended(WordCard, {
			props: { word: mockWord },
		});

		expect(wrapper.text()).toContain('猫');
		expect(wrapper.text()).toContain('ねこ');
	});

	it('點擊刪除按鈕後應該發出 request-delete 事件', async () => {
		const wrapper = await mountSuspended(WordCard, {
			props: { word: mockWord },
		});

		// 找到刪除按鈕 (假設你加了 data-test="btn-delete")
		const deleteBtn = wrapper.find('[data-test="btn-delete"]');

		//  觸發點擊
		await deleteBtn.trigger('click');

		//  檢查有沒有 emit 事件
		// emitted() 會回傳一個物件，記錄所有發出的事件
		expect(wrapper.emitted()).toHaveProperty('request-delete');

		// 檢查傳出去的資料對不對
		const emittedDelete = wrapper.emitted()['request-delete'][0] as Word[];
		expect(emittedDelete[0]).toEqual(mockWord);
	});

	it('點擊編輯按鈕後應該發出 request-updateWord 事件', async () => {
		const wrapper = await mountSuspended(WordCard, {
			props: { word: mockWord },
		});

		// 找到刪除按鈕 (假設你加了 data-test="btn-delete")
		const deleteBtn = wrapper.find('[data-test="btn-update"]');

		//  觸發點擊
		await deleteBtn.trigger('click');

		//  檢查有沒有 emit 事件
		// emitted() 會回傳一個物件，記錄所有發出的事件
		expect(wrapper.emitted()).toHaveProperty('request-updateWord');

		// 檢查傳出去的資料對不對
		const emittedDelete = wrapper.emitted()['request-updateWord'][0] as Word[];
		expect(emittedDelete[0]).toEqual(mockWord);
	});

	it('點擊收藏按鈕後應該發出 toggle-favorite 事件', async () => {
		const wrapper = await mountSuspended(WordCard, {
			props: { word: mockWord },
		});

		// 找到刪除按鈕 (假設你加了 data-test="btn-delete")
		const deleteBtn = wrapper.find('[data-test="favorite"]');

		//  觸發點擊
		await deleteBtn.trigger('click');

		//  檢查有沒有 emit 事件
		// emitted() 會回傳一個物件，記錄所有發出的事件
		expect(wrapper.emitted()).toHaveProperty('toggle-favorite');

		// 檢查傳出去的資料對不對
		const emittedDelete = wrapper.emitted()['toggle-favorite'][0] as Word[];
		expect(emittedDelete[0]).toEqual(mockWord);
	});

	it('點擊卡片後應正確翻轉', async () => {
		const wrapper = await mountSuspended(WordCard, {
			props: { word: mockWord },
		});

		const fliped = wrapper.find('[data-test="fliped"]');
		const rotate = wrapper.find('[data-test="rotate"]');

		await fliped.trigger('click');

		expect(rotate.classes()).toContain('rotate-y-180');
	});
});
