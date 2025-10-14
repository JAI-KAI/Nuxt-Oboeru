import { th } from "@nuxt/ui/runtime/locale/index.js"
import type { Word } from "~/pages/index.vue"

export const useWordApi = () => {
    const baseUrl = 'https://68d3e90c214be68f8c67afe2.mockapi.io/api/v1/words'
    const { data: words, refresh, pending, error } = useFetch<Word[]>(baseUrl, {
        method: 'get',
        key: 'words',
        default: () => []
    })
    const createWords = async (data: Word) => {
        try {
            const existing: Word[] = await $fetch<Word[]>(baseUrl)
            if(existing.length >= 100) {
                throw new Error("Cannot update more than 100 words")
            }
            const created: Word = await $fetch(baseUrl, {
                method: 'post',
                body: data
            })
            words.value.push(created)
        } catch (err) {
            throw err
        }
    }
    const updateWords = async (id: string, data: Word) => {
        try {
            const updated: Word = await $fetch(`${baseUrl}/${id}`, {
                method: 'put',
                body: data
            })
            const index = words.value.findIndex((w) => w.id == id)
            if (index !== -1) {
                words.value[index] = updated
            }
        } catch (err) {
            throw err
        }
    }
    const deleteWords = async (id: string) => {
        try {
            await $fetch(`${baseUrl}/${id}`, {
                method: 'delete'
            })
            words.value = words.value.filter((w) => w.id !== id)
        } catch (err) {
            throw err
        }
    }

    return { words, createWords, updateWords, deleteWords }
}