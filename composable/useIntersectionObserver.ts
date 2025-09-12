import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useIntersectionObserver(callback: Function, options = {}) {
    const target = ref(null)
    let observer: IntersectionObserver | null = null
    
    onMounted(() => {
        observer = new IntersectionObserver((entries) => {
            const entry = entries[0]

            if(entry.isIntersecting && callback) {
                callback(entry)
            }
        })

        if(target.value) {
            observer.observe(target.value)
        }
    })

    onBeforeUnmount(() => {
        if(target.value && observer) {
            observer.unobserve(target.value)
            observer.disconnect()
        }
        
    })

    return {
        target
    }
}