import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TodoApp from '~/components/TodoApp.vue';

describe('測試todo組件', () => {
	it('點擊新增todo後應該更新todo陣列', async () => {
		const wrapper = await mount(TodoApp);
		await wrapper.find('[data-test="todo-input"]').setValue('打掃房間');
		await wrapper.find('[data-test="add-button"]').trigger('click');

		const items = wrapper.findAll('[data-test="todo-item"]'); // findAll(...): 它的目標是找 「一群」 元素。它回傳的是一個 陣列 (Array)。只有陣列才有 length 可以檢查。
		expect(items.length).toBe(1);
		expect(items[0].text()).toContain('打掃房間');
	});
});
