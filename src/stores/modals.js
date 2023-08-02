import { ref } from "vue"
import { defineStore } from "pinia"

export const useModals = defineStore('modals', () => {
    const newProyect = ref(false)
    const confirmModal = ref(false)

    return { newProyect, confirmModal }
})