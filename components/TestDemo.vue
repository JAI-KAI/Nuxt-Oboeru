<template>
	<p data-test="test-text">
		{{ msg }}
	</p>
	<button
		data-test="add-button"
		@click="changeMsg"
	>
		點我增加
	</button>
</template>

<script setup lang="ts">
const msg = ref('123');

function changeMsg() {
	msg.value += '!';
}

definePageMeta({
	layout: 'default',
});

useSeoMeta({
	title: 'Test Page',
	description: 'this is desc',
});
</script>
