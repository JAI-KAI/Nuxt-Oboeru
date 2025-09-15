<template>
    <div class="flex justify-center mt-10 relative">
        <div v-if="haveRecords" class=" ">
            <button @click="clearRecords" class="absolute -end-1 -top-1 px-2 py-1 bg-red-400 rounded cursor-pointer hover:opacity-70">
                清除紀錄
            </button>
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
                        <td class="border dark:border-gray-300 dark:text-gray-300 px-5 py-2 font-medium">{{ item.score
                        }}
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
        <div v-else class="text-center">
            <p>目前尚未有測驗紀錄</p>
            <p>請至測驗模式進行測驗</p>
        </div>
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

let records = ref(getLocalStorageItem<records[]>('records', [])) 
let aveScore = (records.value.reduce((sum, r) => sum + r.score, 0) / (records.value.length || 1)).toFixed(1)
const haveRecords = computed(() => {
    return records.value.length >= 1
})

function getLocalStorageItem<T>(key: string, defaultValue: T): T {
    if (import.meta.client) {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) as T : defaultValue
    }
    return defaultValue
}
function clearRecords() {
    localStorage.removeItem('records')
    records.value = []
}

</script>