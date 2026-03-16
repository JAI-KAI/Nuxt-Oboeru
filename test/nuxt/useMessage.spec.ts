import { useMessage } from '#imports';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { messages, addMessage } = useMessage();

describe('useMessage 整合測試', () => {
	// 每個 it 執行前，都會跑一次這裡
	beforeEach(() => {
		messages.value = []; // 清空全域變數，避免測試 A 影響測試 B
		vi.useRealTimers(); // 確保時間回到現實
	});

	it('應該能成功新增訊息', () => {
		addMessage('更新成功');

		expect(messages.value.length).toBe(1);
		expect(messages.value[0].text).toBe('更新成功');
	});

	it('訊息應該在 2 秒後自動消失', () => {
		vi.useFakeTimers();

		addMessage('快閃訊息');
		expect(messages.value.length).toBe(1);

		vi.advanceTimersByTime(2000);

		expect(messages.value.length).toBe(0);

		vi.useRealTimers();
	});

	it('新增多則訊息時id應該是唯一的', () => {
		vi.useFakeTimers();

		addMessage('訊息1');
		vi.advanceTimersByTime(100);
		addMessage('訊息2');

		expect(messages.value[0].id).not.toBe(messages.value[1].id);

		vi.useRealTimers();
	});
});
