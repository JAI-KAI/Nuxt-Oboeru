<template>
  <div
    class="bg-gray-50 dark:bg-gray-900 border-b-2 border-black dark:border-white text-white w-full z-30"
  >
    <div
      class="flex justify-between lg:justify-start space-x-2 px-2 text-base xl:text-lg xl:space-x-4"
    >
      <button
        class="px-2 lg:px-3 py-1 font-bold bg-gray-500 rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-gray-600"
        @click="categoryToggler.reset"
      >
        全部
      </button>
      <button
        class="flex items-center px-2 lg:px-3 py-1 font-bold bg-yellow-300 rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-yellow-400"
        @click="categoryToggler.toggle('favorite')"
      >
        <Icon name="i-uis:star" class="text-white text-xl xl:text-3xl z-50" />
      </button>
      <button
        class="px-2 lg:px-3 py-1 font-bold bg-blue-500 rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-blue-600"
        @click="categoryToggler.toggle('N5')"
      >
        N5
      </button>
      <button
        class="px-2 lg:px-3 py-1 font-bold bg-green-500 rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-green-600"
        @click="categoryToggler.toggle('N4')"
      >
        N4
      </button>
      <button
        class="px-2 lg:px-3 py-1 font-bold bg-yellow-500 rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-yellow-600"
        @click="categoryToggler.toggle('N3')"
      >
        N3
      </button>
      <button
        class="px-2 lg:px-3 py-1 font-bold bg-orange-600 rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-orange-700"
        @click="categoryToggler.toggle('N2')"
      >
        N2
      </button>
      <button
        class="px-2 lg:px-3 py-1 font-bold bg-red-700 rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-red-800"
        @click="categoryToggler.toggle('N1')"
      >
        N1
      </button>
    </div>
  </div>
</template>

<script setup>
const categoryToggler = useCategoryStore()
</script>
