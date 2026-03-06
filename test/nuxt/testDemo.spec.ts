import { mount } from '@vue/test-utils';
import { describe, it } from 'vitest';
import Test from '~/components/TestDemo.vue';

describe('my describe', () => {
	it('test', () => {
		const wrapper = mount(Test);

		console.log(wrapper.html());
	});
});
