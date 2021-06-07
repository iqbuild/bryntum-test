import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/Example/Example.vue';

describe('Example.vue', () => {
	it('renders', () => {
		const msg = 'Example';
		const wrapper = shallowMount(HelloWorld, {
			props: { msg },
		});
		expect(wrapper.text()).toMatch(msg);
		expect(wrapper.element).toMatchSnapshot();
	});
});
