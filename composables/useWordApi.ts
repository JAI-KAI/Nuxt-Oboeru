interface Word {
    id: string
    jlpt: string
    word: string
    kana: string
    meaning_zh: string
    examples: string[]
    isFavorite: boolean
}

export const useWordApi = () => {
    const getWords = () => {
        const { data: words } = useFetch<Word[]>('https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words')
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