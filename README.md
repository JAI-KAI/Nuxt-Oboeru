## JLPT 日語單字學習網站
這是一個使用 Nuxt 3 開發的日語單字練習網站，
主要功能包含單字展示、收藏、測驗模式與 CRUD（建立、編輯、刪除）操作。
使用 MockAPI 模擬後端資料來源，並已成功部署至 Vercel。

## 功能特色
- 單字展示:顯示不同 JLPT 等級的日語單字，支援分類與篩選
- 收藏單字:可收藏喜歡的單字，並儲存在 LocalStorage
- 測驗模式：隨機題目，答題即時判斷
- CRUD 操作:可在前端進行新增、編輯、刪除單字的模擬操作
- 懶加載:使用IntersectionObserver提升效能
- 響應式設計:使用Tailwind實現Mobile-First設計，提升可讀性與維護性和載入效能
- 使用mockAPI模擬CRUD操作

## 使用技術：
- Nuxt.js 
- TypeScript
- Pinia
- Tailwind CSS
- mockAPI
- Vercel

## Demo
🔗 [線上試用](https://nuxt-oboeru.vercel.app/)