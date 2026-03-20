import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import LightBox from '~/components/LightBox.vue';

const { addMessage } = useMessage();

describe('LightBox 整合測試', () => {
	it('新增messege後應該更新msg元素', async () => {
		vi.useFakeTimers();
		// 1. 掛載組件
		const wrapper = await mountSuspended(LightBox);

		// 2. 模擬外部觸發
		addMessage('新增訊息');
		await nextTick(); // 讓 Vue 渲染新訊息

		// 3. 檢查訊息是否出現在 DOM 中
		expect(wrapper.findAll('[data-test="lightbox-msg"]').length).toBe(1);
		expect(wrapper.findAll('[data-test="lightbox-msg"]')[0].text()).toContain('新增訊息');

		// 4. 快進 2000ms
		vi.advanceTimersByTime(2000);
		await nextTick();

		// 5. 重新抓取 DOM 元素，檢查是否消失
		const itemsAfterWait = wrapper.find('[data-test="lightbox-msg"]');
		expect(itemsAfterWait.exists()).toBe(false);

		vi.useRealTimers();
	});
});
