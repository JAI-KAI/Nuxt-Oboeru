import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import ThemeButton from '~/components/ThemeButton.vue';

const mockColorMode = reactive({
	preference: 'dark',
	value: 'dark',
});

mockNuxtImport('useColorMode', () => {
	return () => mockColorMode;
});

describe('ThemeButton 組件測試', () => {
	it('應該正常渲染組件', async () => {
		const wrapper = await mountSuspended(ThemeButton);
		expect(wrapper.exists()).toBe(true);
	});

	it('當點擊切換時，應該正確更新 colorMode 的偏好設定', async () => {
		const wrapper = await mountSuspended(ThemeButton);
		const checkbox = wrapper.get<HTMLInputElement>('[data-test="btn-theme"]');

		await checkbox.setValue(false);
		expect(mockColorMode.preference).toBe('dark');

		await checkbox.setValue(true);
		expect(mockColorMode.preference).toBe('light');
	});

	it('當主題為亮色時，旋鈕應含有位移 Class', async () => {
		// 模擬初始狀態為亮色
		mockColorMode.value = 'light';
		mockColorMode.preference = 'light';

		const wrapper = await mountSuspended(ThemeButton);
		await nextTick(); // 確保 onMounted 執行完畢

		const knob = wrapper.find('.transition-transform');

		expect(knob.classes()).toContain('[transform:translateX(1.3rem)]');
	});
});
