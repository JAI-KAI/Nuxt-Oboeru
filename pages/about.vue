<template>
    <div class=" px-1 xl:px-24 py-6">
        <!-- 主標題 -->
        <h1 class="text-xl font-bold text-blue-600 dark:text-white text-center mb-4">關於本站</h1>
        <h3 class="text-lg font-bold text-blue-600 dark:text-white text-center mb-4">JLPT 日語單字學習工具，提供單字瀏覽、收藏、測驗模式，幫助學習者更有效率記憶日語單字。</h3>
        <!-- 內容區域 -->
        <div class="max-w-3xl mx-auto bg-white dark:bg-gray-700  p-6 rounded-lg shadow-lg">
            <p class="text-lg text-gray-800 dark:text-white">功能特色：</p>
            <ul class="list-disc list-inside text-gray-700 dark:text-white space-y-2 mt-1">
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">單字依 JLPT 等級分類 (N1~N5)</span></li>
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">收藏單字清單</span></li>
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">測驗模式（隨機題目 / 即時答題）</span></li>
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">懶加載(IntersectionObserver)</span></li>
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">響應式設計(手機 / 桌機)</span></li>
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">夜間模式切換</span></li>
            </ul>
            <p class="text-lg text-gray-800 dark:text-white mt-2">使用技術：</p>
            <!-- 技術列表 -->
            <ul class="list-disc list-inside text-gray-700 dark:text-white space-y-2 mt-1">
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">Nuxt.js</span></li>
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">Pinia</span></li>
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">Tailwind CSS</span></li>
                <li><span class="font-semibold text-blue-500 dark:text-gray-200">IntersectionObserver composable</span></li>
            </ul>
            <!-- 其他作品鏈接 -->
            <div class="mt-2">
                <p class="text-lg text-gray-800 dark:text-white mb-2">更多作品：</p>
                <a href="https://github.com/JAI-KAI" target="_blank"
                    class="text-blue-500 hover:text-blue-700 dark:text-gray-200 dark:hover:text-gray-400 font-semibold transition duration-100">
                    前往我的 GitHub 查看更多作品 
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'quiz'
})

</script>
