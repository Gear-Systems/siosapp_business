<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center space-y-10 pt-5 lg:space-y-10 xl:space-y-10"
  >
    <button
      @click="$router.push({ name: 'proyectos' })"
      class="cursor-pointer font-medium text-[#2166E5] hover:underline"
      :disabled="loadings.save || loadings.init"
    >
      Ir a proyectos
    </button>
    <button
      @click="saveData()"
      :class="[
        colorFondo(data.business_unit),
        'flex justify-center min-w-[180px] cursor-pointer rounded-xl px-8 py-4 font-medium text-white',
        colorDegradadoHover(data.business_unit),
      ]"
      :disabled="loadings.save || loadings.init"
    >
      <IconSpinner v-if="loadings.save" />
      <span v-else> Guardar</span>
    </button>
    <button
      @click="confirmModal = true"
      class="flex justify-center min-w-[180px] cursor-pointer rounded-xl bg-[#2166E5] px-8 py-4 font-medium text-white"
      :disabled="loadings.save || loadings.init"
    >
    <IconSpinner v-if="loadings.init" />
      <span v-else> Iniciar proyecto</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { colorFondo, colorDegradadoHover } from "@/utils/color.js"
import { useProyectoPendiente } from "../stores/proyectosPendientes"
import { useModals } from "../stores/modals"
import { storeToRefs } from "pinia"
import IconSpinner from "@/components/icons/IconSpinner.vue"


const store = useProyectoPendiente()
const modals = useModals()
const { saveData } = store
const { data, loadings } = storeToRefs(store)
const { confirmModal } = storeToRefs(modals)
</script>
