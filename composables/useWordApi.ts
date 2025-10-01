import type { Word } from "~/pages/index.vue"

export const useWordApi = () => {
    const getWords = async() => {
        const { data: words } = await useFetch<Word[]>('https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words', {
            method: 'get',
            key: 'words-list',
        })
        return computed(() => words.value ?? [])
    }
    const newWords = (data: {}) => {
        $fetch('https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words', {
            method: 'post',
            body: data
        })
    }
    const editWords = (id: number, data: {}) => {
        $fetch(`https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words/${id}`, {
            method: 'put',
            body: data
        })
    }
    const deleteWords = (id: number) => {
        $fetch(`https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words/${id}`, {
            method: 'delete'
        })
    }

    return { getWords, newWords, editWords, deleteWords }
}