<template>
    <div class="flex items-center">
        <!-- Switch Container -->
        <label class="relative inline-flex items-center cursor-pointer">
            <!-- Hidden Checkbox -->
            <input v-model="isLight" name="isLight" type="checkbox" class="sr-only peer" />
            <!-- Background -->
            <div class="w-12 h-6 bg-black outline-solid outline-gray-500 peer-checked:bg-white rounded-full transition">
            </div>
            <!-- SVG Icon Knob -->
            <div
                class="absolute w-5 h-5 flex items-center justify-center text-gray-700 
                rounded-full left-0 top-0  
                translate-x-1 translate-y-0.5 
                transition-transform "
                :class="isLight ? '[transform:translateX(1.3rem)]' : ''">
                <!-- Default Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="size-6 text-white absolute transition-opacity duration-300"
                    :class="{ 'opacity-100': !isLight, 'opacity-0': isLight }">
                    <path fill-rule="evenodd"
                        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                        clip-rule="evenodd" />
                </svg>
                <!-- Checked Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="size-6 text-amber-600 absolute transition-opacity duration-300"
                    :class="{ 'opacity-100': isLight, 'opacity-0': !isLight }">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isLight = ref<boolean>()

onMounted(() => {
    const saveTheme = localStorage.getItem('theme')
    isLight.value = saveTheme === 'light'
}),

watch(isLight, (newValue) => {
    colorMode.preference = newValue ? 'light' : 'dark'
    localStorage.setItem('theme', newValue ? 'light' : 'dark')
})

</script>