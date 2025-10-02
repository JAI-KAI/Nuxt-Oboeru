import type { Word } from "~/pages/index.vue"

export const useWordApi = () => {
    const { data: words, refresh, pending, error } = useFetch<Word[]>('https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words', {
        method: 'get',
        key: 'words',
        default: () => [] 
    })
    const newWords = (data: {}) => {
        $fetch('https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words', {
            method: 'post',
            body: data
        })
    }
    const editWords = (id: string, data: {}) => {
        $fetch(`https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words/${id}`, {
            method: 'put',
            body: data
        })
    }
    const deleteWords = (id: string) => {
        words.value = words.value.filter((w) => w.id !== id)
        $fetch(`https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words/${id}`, {
            method: 'delete'
        })
    }

    return { words, newWords, editWords, deleteWords }
}