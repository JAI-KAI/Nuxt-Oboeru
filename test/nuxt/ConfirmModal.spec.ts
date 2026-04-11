import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createTestingPinia } from '@pinia/testing';
import { describe, expect, it, vi } from 'vitest';
import ConfirmModal from '~/components/ConfirmModal.vue';

describe('ConfirmModal視窗組件', () => {
	it('當為刪除模式時，應該正確顯示單字名稱', async () => {
		const mockWord = {
			jlpt: 'N1',
			word: '懸念',
			kana: 'けねん',
		};

		const wrapper = await mountSuspended(ConfirmModal, {
			props: {
				deleteWord: mockWord,
				updateWord: null,
				createWord: null,
			},
			global: {
				plugins: [createTestingPinia({
					stubActions: false,
					createSpy: vi.fn,
					initialState: {
						// 直接設定初始狀態，有助於簡化測試流程
						confirmModal: { modalType: 'delete' },
					},
				})],
			},
		});

		await nextTick();
		expect(wrapper.text()).toContain('確定刪除 N1單字「懸念」嗎');
	});

	it('當為編輯模式時，input 應正確帶入原本的假名', async () => {
		const mockWord = {
			id: 123,
			word: '勉強',
			kana: 'べんきょう',
		};

		const wrapper = await mountSuspended(ConfirmModal, {
			props: {
				updateWord: mockWord,
				deleteWord: null,
				createWord: null,
			},
			global: {
				plugins: [createTestingPinia({
					stubActions: false,
					createSpy: vi.fn,
					initialState: { confirmModal: { modalType: 'update' } },
				})],
			},
		});

		await nextTick();

		// 找到假名的 input (placeholder 為 "假名")
		const kanaInput = wrapper.find('input[placeholder="假名"]');

		// 驗證 input 的值是否正確
		expect((kanaInput.element as HTMLInputElement).value).toBe('べんきょう');
	});

	it('點擊刪除按鈕後應該發出confirmDelete事件', async () => {
		const mockWord = {
			jlpt: 'N1',
			word: '懸念',
			kana: 'けねん',
		};

		const wrapper = await mountSuspended(ConfirmModal, {
			props: {
				deleteWord: mockWord,
				updateWord: null,
				createWord: null,
			},
			global: {
				plugins: [createTestingPinia({
					stubActions: false,
					createSpy: vi.fn,
					initialState: {
						// 直接設定初始狀態，有助於簡化測試流程
						confirmModal: { modalType: 'delete' },
					},
				})],
			},
		});

		await nextTick();

		// 找到刪除按鈕 (假設你加了 data-test="btn-delete")
		const deleteBtn = wrapper.find('[data-test="btn-delete"]');

		//  觸發點擊
		await deleteBtn.trigger('click');

		//  檢查有沒有 emit 事件
		// emitted() 會回傳一個物件，記錄所有發出的事件
		expect(wrapper.emitted()).toHaveProperty('confirmDelete');

		// 確認它被觸發過
		expect(wrapper.emitted('confirmDelete')).toBeTruthy();
		expect(wrapper.emitted('confirmDelete')!.length).toBe(1);
	});

	it('點擊新增按鈕後應該發出confirmCreate事件', async () => {
		const mockWord = {
			jlpt: 'N1',
			word: '懸念',
			kana: 'けねん',
			meaning_zh: '懸念',
			examples: '懸念がある',
		};

		const wrapper = await mountSuspended(ConfirmModal, {
			props: {
				deleteWord: null,
				updateWord: null,
				createWord: mockWord,
			},
			global: {
				plugins: [createTestingPinia({
					stubActions: false,
					createSpy: vi.fn,
				})],
			},
		});
		const confirmModalStore = useConfirmModalStore();
		confirmModalStore.modalType = 'create'; // 手動改，觸發 watch

		await nextTick();

		const createBtn = wrapper.find('[data-test="btn-create"]');

		//  觸發點擊
		await createBtn.trigger('click');

		//  檢查有沒有 emit 事件
		// emitted() 會回傳一個物件，記錄所有發出的事件
		expect(wrapper.emitted()).toHaveProperty('confirmCreate');

		// 確認它被觸發過
		expect(wrapper.emitted('confirmCreate')).toBeTruthy();
		expect(wrapper.emitted('confirmCreate')!.length).toBe(1);
	});
});
