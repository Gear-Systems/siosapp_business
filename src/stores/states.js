import { ref } from "vue"
import { defineStore } from "pinia"

export const useStates = defineStore("states", () => {
    const volumetryControl = ref(1)

    return { volumetryControl }
})