<template>
    <div>
        歡迎來到 {{ jlpt }} 測驗
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'quiz'
})
const route = useRoute()
const jlpt = route.params.jlpt

</script>