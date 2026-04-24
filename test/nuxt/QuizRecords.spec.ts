import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import RecordsPage from '~/pages/quiz/records.vue';

describe('RecordsPage 紀錄頁面測試', () => {
	it('當 localStorage 沒有資料時，應顯示提示文字', async () => {
		localStorage.clear();

		const wrapper = await mountSuspended(RecordsPage);

		expect(wrapper.text()).toContain('目前尚未有測驗紀錄');
		expect(wrapper.find('table').exists()).toBe(false);
	});

	it('當有紀錄時，應正確顯示列表與計算平均分數', async () => {
		// 1. 模擬資料：存入兩筆紀錄
		const mockRecords = [
			{ jlpt: 'N1', score: 100 },
			{ jlpt: 'N2', score: 80 },
		];
		localStorage.setItem('records', JSON.stringify(mockRecords));

		const wrapper = await mountSuspended(RecordsPage);

		// 2. 檢查表格行數
		const rows = wrapper.findAll('tbody tr');
		expect(rows).toHaveLength(2);

		// 3. 檢查平均分數
		expect(wrapper.text()).toContain('90');
		expect(wrapper.text()).toContain('N1');
		expect(wrapper.text()).toContain('N2');
	});

	it('點擊清除紀錄按鈕後，畫面應切換為無紀錄狀態', async () => {
		localStorage.setItem('records', JSON.stringify([{ jlpt: 'N3', score: 60 }]));

		const wrapper = await mountSuspended(RecordsPage);

		const clearBtn = wrapper.find('button');
		await clearBtn.trigger('click');

		expect(localStorage.getItem('records')).toBeNull();
		expect(wrapper.text()).toContain('目前尚未有測驗紀錄');
		expect(wrapper.find('table').exists()).toBe(false);
	});
});
