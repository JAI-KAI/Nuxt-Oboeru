interface Message {
	id: number;
	text: string;
}

const messages = ref<Message[]>([]);

export const useMessage = () => {
	const addMessage = (text: string) => {
		const id: number = Date.now();
		messages.value.push({ id, text });

		setTimeout(() => {
			messages.value = messages.value.filter(msg => msg.id !== id);
		}, 2000);
	};

	return {
		messages,
		addMessage,
	};
};
