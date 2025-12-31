[正體中文](README.md) | [日本語](README-ja.md)

# JLPT 日本語単語学習サイト

本プロジェクトは **Nuxt 3** を用いて開発した  
**JLPT 日本語単語学習プラットフォーム**です。

単語の一覧表示・お気に入り登録・テストモード・  
CRUD（作成 / 編集 / 削除）機能を提供しています。

バックエンドは **MockAPI** を使用して擬似的に構築し、  
**Vercel** にデプロイしています。

---

## 機能概要

- **遅延読み込み（Lazy Loading）**  
  IntersectionObserver を利用し、単語リストの遅延読み込みを実装。  
  大量データを扱う場合でも初期表示のパフォーマンスを向上させています。

- **テーマ切り替え（ダーク / ライトモード）**  
  Tailwind CSS とグローバルステート管理を用いて、  
  ページ間で一貫したテーマ表示を実現しています。

- **単語一覧表示**  
  JLPT レベル（N1〜N5）ごとに単語を分類・表示。

- **お気に入り機能**  
  LocalStorage を利用し、単語をお気に入りとして保存可能。

- **テストモード**  
  ランダム出題、即時判定、回答履歴の管理に対応。

- **CRUD 操作（擬似）**  
  単語データの追加・編集・削除をフロントエンドから操作可能。

- **レスポンシブ対応**  
  Tailwind CSS による Mobile First 設計。

- **MockAPI 連携**  
  実際の API 通信を想定したリクエスト処理および  
  エラーハンドリングを実装。

---

## 使用技術

- **Nuxt 3**（Composition API / Routing / Layout）
- **TypeScript**
- **Pinia**（状態管理）
- **Tailwind CSS**
- **MockAPI**
- **Vercel**（自動デプロイ）
- **ESLint / ESLint Stylistic**（コード品質管理）

---

## デモ

🔗 **デモサイト**  
https://nuxt-oboeru.vercel.app/

---

## ローカル環境での起動方法（Get Started）

本プロジェクトをローカル環境で動作させる場合は、  
以下の手順に従ってください。

1.  **リポジトリをクローン：**
    ```bash
    git clone [https://github.com/JAI-KAI/Nuxt-Oboeru.git]
    cd Nuxt-Oboeru
    ```

2.  **依存関係のインストール：**
    ```bash
    npm install
    # 或 yarn install
    ```

3.  **開発サーバーを起動：**
    ```bash
    npm run dev
    ```