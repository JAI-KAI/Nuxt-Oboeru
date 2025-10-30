<template>
	<div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
		<!-- Header -->
		<header class="bg-white dark:bg-gray-800 dark:text-white shadow-lg sticky top-0 z-30">
			<div class=" max-w-7xl mx-auto px-4">
				<div class="flex justify-between items-center py-4">
					<nuxt-link
						to="/"
						class="hover:text-gray-200 font-semibold text-xl xl:text-xl"
					>覚エル</nuxt-link>
					<div class="flex items-center space-x-4">
						<nuxt-link
							to="/quiz"
							class="flex items-center gap-1 cursor-pointer p-1 lg:p-2 text-white  bg-green-400 hover:bg-green-600 rounded-lg"
						>
							<div class="flex items-center justify-center">
								<Icon
									name="i-clarity:note-solid"
									class="text-2xl xl:text-3xl"
								/>
							</div>
							<span class="font-bold hidden xl:block">測驗模式</span>
						</nuxt-link>
						<ThemeButton class="xl:ms-5" />
					</div>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<main class="container mx-auto flex-1 p-6 xl:px-50">
			<slot />
		</main>

		<!-- Footer -->
		<footer class="text-xs bg-gray-100 dark:bg-gray-800 dark:text-white text-center py-4 xl:text-sm">
			<p>JAIKAI版權所有 © {{ new Date().getFullYear() }}</p>
		</footer>
	</div>
</template>

<script setup>

</script>
