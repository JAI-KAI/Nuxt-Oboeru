<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-blue-600 text-white py-4 shadow-lg sticky top-0 z-30">
      <div class="container mx-auto flex justify-between items-center px-4">
        <nav class="flex space-x-6">
          <nuxt-link to="/" class="text-xl hover:text-gray-200 font-semibold">覚エル</nuxt-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto p-6">
      <category-nav/>
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