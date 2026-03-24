import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import ThemeButton from '~/components/ThemeButton.vue';

const mockColorMode = {
	preference: 'dark',
};

mockNuxtImport('useColorMode', () => {
	return () => mockColorMode;
});

describe('ThemeToggle', () => {
	it('should render', async () => {
		const wrapper = await mountSuspended(ThemeButton);

		expect(wrapper.exists()).toBe(true);
	});

	it('should set isLight based on localStorage', async () => {
		localStorage.setItem('theme', 'light');

		const wrapper = await mountSuspended(ThemeButton);

		const checkbox = wrapper.get('[data-test="btn-theme"]');

		expect((checkbox.element as HTMLInputElement).checked).toBe(true);
	});

	it('toggles theme', async () => {
		const wrapper = await mountSuspended(ThemeButton);

		const checkbox = wrapper.get('[data-test="btn-theme"]');

		await checkbox.setValue(false);

		expect(mockColorMode.preference).toBe('dark');
		expect(localStorage.getItem('theme')).toBe('dark');
	});
});
