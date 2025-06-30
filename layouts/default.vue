<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-blue-600 text-white py-3 shadow-lg sticky top-0 z-30">
      <div class="container mx-auto flex justify-between items-center px-4">
        <nuxt-link to="/" class="text-xl hover:text-gray-200 font-semibold">覚エル</nuxt-link>
        <button class="flex items-center gap-1 cursor-pointer group p-2 outline-amber-300 outline-2 rounded-lg">
          <div class="relative -top-0.5 w-7 h-7">
            <Icon name="i-uis:star" class="absolute inset-0 text-transparent group-hover:text-yellow-400 text-3xl z-50" />
            <Icon name="i-uil:star" class="absolute inset-0 text-yellow-400  text-3xl" />
          </div>
          <span class="font-bold">已收藏</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto p-6">
      <category-nav />
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="text-sm bg-gray-800 text-white text-center py-4">
      <p>JAIKAI版權所有 © {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script setup>

</script>