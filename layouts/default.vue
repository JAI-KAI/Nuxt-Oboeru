<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 dark:text-white shadow-lg sticky top-0 z-30">
      <div class=" max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <div class="space-x-3 xl:space-x-5">
            <nuxt-link to="/" class="hover:text-gray-200 font-semibold text-xl xl:text-xl">覚エル</nuxt-link>
            <nuxt-link to="/about" class="hover:text-gray-200 font-semibold text-sm xl:text-base">關於</nuxt-link>
          </div>
          <div class="flex items-center space-x-2 xl:space-x-4">
            <button @click="confirmModalStore.modalOn(); confirmModalStore.toggleType('create')"
              class="flex items-center gap-1 cursor-pointer p-1 lg:p-2 text-white  bg-blue-400 hover:bg-blue-600 rounded-lg">
              <div class="flex items-center justify-center">
                <Icon name="i-typcn:plus" class="text-2xl xl:text-3xl" />
              </div>
              <span class="font-bold hidden xl:block">新增單字</span>
            </button>
            <nuxt-link to="/quiz"
              class="flex items-center gap-1 cursor-pointer p-1 lg:p-2 text-white  bg-green-400 hover:bg-green-600 rounded-lg">
              <div class="flex items-center justify-center">
                <Icon name="i-clarity:note-solid" class="text-2xl xl:text-3xl" />
              </div>
              <span class="font-bold hidden xl:block">測驗模式</span>
            </nuxt-link>
            <ThemeButton class="ms-2 lg:ms-5" />
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class=" relative container flex-1 mx-auto p-4 lg:p-6 xl:px-50">
      <category-nav class="sticky top-[64px] lg:top-[78px]" />
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="text-xs bg-gray-100 dark:bg-gray-800 dark:text-white text-center py-4 xl:text-sm">
      <p>JAIKAI版權所有 © {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup>
const categoryToggler = useCategoryStore()
const confirmModalStore = useConfirmModalStore()


</script>