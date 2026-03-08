import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Test from '~/components/TestDemo.vue';

describe('my first test', () => {
	it('點擊按鈕後，文字應增加一個驚嘆號', async () => {
		const wrapper = await mount(Test);
		await wrapper.find('[data-test="add-button"]').trigger('click');
		expect(wrapper.find('[data-test="test-text"]').text()).toBe('123!');
	});
});
