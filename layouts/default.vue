<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 dark:text-white py-3 shadow-lg sticky top-0 z-30">
      <div class="container mx-auto flex justify-between items-center px-4">
        <nuxt-link to="/" class="text-lg hover:text-gray-200 font-semibold xl:text-xl">覚エル</nuxt-link>
        <button @click="() => { categoryToggler.toggle('favorite') }"
          class="flex items-center gap-1 cursor-pointer group p-2 outline-amber-300 outline-2 rounded-lg">
          <div class="relative -top-0.5 w-7 h-7">
            <Icon name="i-uis:star"
              class="absolute inset-0 text-transparent group-hover:text-yellow-400 text-3xl z-50" />
            <Icon name="i-uil:star" class="absolute inset-0 text-yellow-400  text-3xl" />
          </div>
          <span class="font-bold">已收藏</span>
        </button>
        <button @click="toggleTheme" class="px-4 py-2 bg-gray-200 dark:bg-gray-800">
          切換主題（目前：{{ colorMode.preference }})
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container flex-1 mx-auto p-6 xl:px-50">
      <category-nav />
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="text-xs bg-gray-800 text-white text-center py-4 xl:text-sm">
      <p>JAIKAI版權所有 © {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup>
const categoryToggler = useCategoryStore();
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

</script>