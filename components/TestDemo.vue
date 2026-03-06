<template>
	<p>{{ msg }}</p>
</template>

<script setup lang="ts">
const msg = ref('123');

function changeMsg() {
	msg.value += '!';
}
</script>
