<template>
	<div class="todo-app">
		<h1>我的待辦清單</h1>

		<input
			v-model="newTodo"
			placeholder="輸入任務..."
			data-test="todo-input"
		>

		<button
			data-test="add-button"
			@click="addTodo"
		>
			新增
		</button>

		<ul>
			<li
				v-for="(todo, index) in todos"
				:key="index"
				data-test="todo-item"
			>
				{{ todo }}
				<button
					data-test="delete-button"
					@click="removeTodo(index)"
				>
					刪除
				</button>
			</li>
		</ul>

		<p
			v-if="todos.length === 0"
			data-test="empty-msg"
		>
			目前沒有任務
		</p>
	</div>
</template>

<script setup lang="ts">
const todos = ref<string[]>([]);
const newTodo = ref('');

function addTodo() {
	if (newTodo.value.trim()) {
		todos.value.push(newTodo.value);
		newTodo.value = ''; // 清空輸入框
	}
}

function removeTodo(index: number) {
	todos.value.splice(index, 1);
}
</script>
