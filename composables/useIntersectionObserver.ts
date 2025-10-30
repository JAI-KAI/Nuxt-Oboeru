import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useIntersectionObserver(
	callback: (entry: IntersectionObserverEntry) => void,
	options: IntersectionObserverInit = {},
) {
	const target = ref<HTMLElement | null>(null);
	let observer: IntersectionObserver | null = null;

	onMounted(() => {
		observer = new IntersectionObserver((entries) => {
			const entry = entries[0];

			if (entry.isIntersecting && callback) {
				callback(entry);
			}
		}, options);

		if (target.value) {
			observer.observe(target.value);
		}
	});

	onBeforeUnmount(() => {
		if (target.value && observer) {
			observer.unobserve(target.value);
			observer.disconnect();
		}
	});

	return {
		target,
	};
}
