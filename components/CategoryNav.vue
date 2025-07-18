<template>
   <div class=" bg-gray-900 shadow-sm border-b-2 w-full sticky top-[68px] z-30">
        <div class="flex space-x-2 px-2 text-base xl:text-lg xl:space-x-4">
          <button @click="categoryToggler.reset" class="px-3 py-1 font-bold text-gray-100 bg-gray-800 rounded-t-xl whitespace-nowrap cursor-pointer hover:text-gray-200">全部</button>
          <button @click="()=>{categoryToggler.toggle('N5')}" class="px-3 py-1 font-bold text-blue-400 bg-gray-800 rounded-t-xl whitespace-nowrap cursor-pointer hover:text-blue-200">N5</button>
          <button @click="()=>{categoryToggler.toggle('N4')}" class="px-3 py-1 font-bold text-green-500 bg-gray-800 rounded-t-xl whitespace-nowrap cursor-pointer hover:text-green-300">N4</button>
          <button @click="()=>{categoryToggler.toggle('N3')}" class="px-3 py-1 font-bold text-yellow-500 bg-gray-800 rounded-t-xl whitespace-nowrap cursor-pointer hover:text-yellow-300">N3</button>
          <button @click="()=>{categoryToggler.toggle('N2')}" class="px-3 py-1 font-bold text-orange-600 bg-gray-800 rounded-t-xl whitespace-nowrap cursor-pointer hover:text-orange-400">N2</button>
          <button @click="()=>{categoryToggler.toggle('N1')}" class="px-3 py-1 font-bold text-red-700 bg-gray-800 rounded-t-xl whitespace-nowrap cursor-pointer hover:text-red-500">N1</button>
        </div>
      </div>
</template>

<script setup>
const categoryToggler = useCategoryStore();

</script>