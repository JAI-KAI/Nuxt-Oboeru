<template>
  <div
    class="bg-gray-50 dark:bg-gray-900 border-b-2 border-black dark:border-white text-white w-full z-30">
    <div class="flex justify-between lg:justify-start space-x-2 px-2 text-base xl:text-lg xl:space-x-4">
      <button @click="categoryToggler.reset"
        class="px-2 lg:px-3 py-1 font-bold bg-gray-500  rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-gray-600">全部</button>
      <button @click="() => { categoryToggler.toggle('favorite') }"
        class="flex items-center px-2 lg:px-3 py-1 font-bold bg-yellow-300 rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-yellow-400">
          <Icon name="i-uis:star" class=" text-white text-xl xl:text-3xl z-50" />
      </button>
      <button @click="() => { categoryToggler.toggle('N5') }"
        class="px-2 lg:px-3 py-1 font-bold bg-blue-500  rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-blue-600">N5</button>
      <button @click="() => { categoryToggler.toggle('N4') }"
        class="px-2 lg:px-3 py-1 font-bold bg-green-500  rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-green-600">N4</button>
      <button @click="() => { categoryToggler.toggle('N3') }"
        class="px-2 lg:px-3 py-1 font-bold bg-yellow-500  rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-yellow-600">N3</button>
      <button @click="() => { categoryToggler.toggle('N2') }"
        class="px-2 lg:px-3 py-1 font-bold bg-orange-600  rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-orange-700">N2</button>
      <button @click="() => { categoryToggler.toggle('N1') }"
        class="px-2 lg:px-3 py-1 font-bold bg-red-700  rounded-t-xl whitespace-nowrap cursor-pointer hover:bg-red-800">N1</button>
    </div>
  </div>
</template>

<script setup>
const categoryToggler = useCategoryStore();

</script>