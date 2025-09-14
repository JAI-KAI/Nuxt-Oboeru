<template>
    <div class="flex justify-center mt-10">
        <table class="table-auto border-2 dark:border-gray-300 text-center">
            <caption class="caption-top pb-4">
                測驗紀錄
            </caption>
            <thead class="dark:bg-gray-600">
                <tr>
                    <th class="border dark:border-gray-300 px-5 py-2">級別</th>
                    <th class="border dark:border-gray-300 px-5 py-2">分數</th>
                </tr>
            </thead>
            <tbody class="dark:bg-gray-800">
                <tr v-for="(item, index) in records" :key="index">
                    <th class="border dark:border-gray-300 px-5 py-2 font-bold">{{ item.jlpt }}</th>
                    <td class="border dark:border-gray-300 dark:text-gray-300 px-5 py-2 font-medium">{{ item.score }}
                    </td>
                </tr>
            </tbody>
            <tfoot class="dark:bg-gray-800">
                <tr>
                    <th class="border dark:border-gray-300 px-5 py-2">分數平均</th>
                    <td class="border dark:border-gray-300 px-5 py-2 font-bold">{{ aveScore }}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'quiz'
})
interface records {
    jlpt: string,
    score: number
}

function getLocalStorageItem<T>(key: string, defaultValue: T): T {
    if (import.meta.client) {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) as T : defaultValue
    }
    return defaultValue
}

let records = getLocalStorageItem<records[]>('records', [])
let aveScore = (records.reduce((sum, r) => sum + r.score, 0) / (records.length || 1)).toFixed(1)

</script>