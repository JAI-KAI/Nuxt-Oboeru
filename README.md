# JLPT 日語單字學習工具

一個用 Nuxt.js 建立的日語單字學習平台，支援單字分類、收藏、測驗模式，並優化效能。

## Demo
👉 [線上試用](https://jai-kai.github.io/Nuxt-Oboeru/)

## 功能特色
- 單字依 JLPT 等級 (N1~N5) 分類
- 收藏功能，快速回顧常用單字
- 測驗模式：隨機題目，答題即時判斷
- IntersectionObserver 懶加載，提升效能
- 響應式設計（支援手機 / 桌機）

## 技術棧
- Nuxt.js 3
- Pinia
- Tailwind CSS
- IntersectionObserver composable

## 安裝
```bash
git clone https://github.com/JAI-KAI/Nuxt-Oboeru.git
cd Nuxt-Oboeru
npm install
npm run dev
