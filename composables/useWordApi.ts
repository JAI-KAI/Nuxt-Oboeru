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
    const updateWords = async(id: string, data: Word) => {
        const updated: Word = await $fetch(`https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words/${id}`, {
            method: 'put',
            body: data
        })
        const index = words.value.findIndex((w) => w.id == id)
        if  (index !== -1) {
            words.value[index] = updated
        }
    }
    const deleteWords = (id: string) => {
        words.value = words.value.filter((w) => w.id !== id)
        $fetch(`https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words/${id}`, {
            method: 'delete'
        })
    }

    return { words, newWords, updateWords, deleteWords }
}