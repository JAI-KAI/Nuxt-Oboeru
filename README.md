## JLPT 日語單字學習網站

這是一個使用 **Nuxt 3** 開發的日語單字練習平台，  
提供單字展示、收藏、測驗模式與 CRUD（建立、編輯、刪除）操作。  
透過 **MockAPI** 模擬後端資料來源，並部署於 **Vercel**。

## 功能特色
-  **懶加載機制**：使用 IntersectionObserver 實現單字列表懶加載，有效提升處理大量資料時的初始載入速度與流暢度
-  **主題切換**: 實作深色 / 淺色模式切換，並透過 Tailwind CSS 與全域狀態管理，確保不同頁面與元件能保持一致的顯示風格，提升使用者體驗。   
-  **單字展示**：依 JLPT 等級（N1～N5）分類顯示單字  
-  **收藏功能**：可將單字加入收藏，使用 LocalStorage 保存  
-  **測驗模式**：隨機題目、即時答題判斷與紀錄功能  
-  **CRUD 模擬操作**：前端可新增、編輯、刪除單字資料  
-  **響應式設計**：以 Tailwind 實現 Mobile-First，強化使用體驗
-  **MockAPI 整合**：模擬真實 API 請求與錯誤處理場景  

## 使用技術
- **Nuxt 3**（Composition API, Routing, Layout）
- **TypeScript**
- **Pinia** 狀態管理
- **Tailwind CSS**
- **MockAPI**
- **Vercel** 自動部署
- **ESLint & ESLint Stylistic** 程式碼品質與風格管控

## Demo
🔗 [線上試用](https://nuxt-oboeru.vercel.app/)


## 如何在本機運行 (Get Started)

若想在本機環境運行與測試本專案，請依循以下步驟：

1.  **複製專案：**
    ```bash
    git clone [https://github.com/JAI-KAI/Nuxt-Oboeru.git]
    cd [專案資料夾名稱]
    ```

2.  **安裝依賴：**
    ```bash
    npm install
    # 或 yarn install
    ```

3.  **運行開發伺服器：**
    ```bash
    npm run dev
    ```
