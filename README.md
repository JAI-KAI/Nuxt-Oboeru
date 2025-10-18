# JLPT 日語單字學習網站

這是一個使用 **Nuxt 3** 開發的日語單字練習平台，  
提供單字展示、收藏、測驗模式與 CRUD（建立、編輯、刪除）操作。  
透過 **MockAPI** 模擬後端資料來源，並部署於 **Vercel**。

---

## ✨ 功能特色
- 🔹 **單字展示**：依 JLPT 等級（N1～N5）分類顯示單字  
- ⭐ **收藏功能**：可將單字加入收藏，使用 LocalStorage 保存  
- 🧩 **測驗模式**：隨機題目、即時答題判斷與紀錄功能  
- 🛠️ **CRUD 模擬操作**：前端可新增、編輯、刪除單字資料  
- ⚙️ **懶加載機制**：使用 `IntersectionObserver` 提升效能  
- 📱 **響應式設計**：以 Tailwind 實現 Mobile-First，強化使用體驗  
- 🧪 **MockAPI 整合**：模擬真實 API 請求與錯誤處理場景  

---

## 🧰 使用技術
- **Nuxt 3**（Composition API, Routing, Layout）
- **TypeScript**
- **Pinia** 狀態管理
- **Tailwind CSS**
- **MockAPI**
- **Vercel** 自動部署

---

## 🚀 Demo
🔗 [線上試用](https://nuxt-oboeru.vercel.app/)