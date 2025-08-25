<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 dark:text-white shadow-lg sticky top-0 z-30">
      <div class=" max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <nuxt-link to="/" class="text-lg hover:text-gray-200 font-semibold xl:text-xl">覚エル</nuxt-link>
          <div class="flex items-center space-x-4">
            <nuxt-link to="/quiz"
              class="flex items-center gap-1 cursor-pointer group p-2 text-white  bg-green-400 hover:bg-green-600 rounded-lg">
              <div class="relative -top-0.5 w-7 h-7">
                <Icon name="i-clarity:note-solid" class="absolute inset-0 text-3xl group-" />
              </div>
              <span class="font-bold">測驗模式</span>
            </nuxt-link>
            <ThemeButton class="ms-5"/>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container flex-1 mx-auto p-6 xl:px-50">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="text-xs bg-gray-100 dark:bg-gray-800 dark:text-white text-center py-4 xl:text-sm">
      <p>JAIKAI版權所有 © {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup>


</script>