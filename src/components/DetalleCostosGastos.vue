<template>
  <div
    class="flex w-[35%] flex-col rounded-lg border-2 border-dashed border-[#1A52B7] bg-white p-8 shadow-md"
  >
    <div class="flex h-full w-full flex-col">
      <div class="flex h-full w-full flex-col">
        <div class="flex w-full justify-center text-xl font-bold">{{ gastoTitulo }}</div>
        <div class="flex flex-col">
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(value, key) in gastoSelected">
              <div>{{ key }}</div>
              <div
                class="min-w-[120px] truncate rounded-md border border-[#7C8495] px-6 py-3"
              >
                ${{ value.toLocaleString("en-US") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProyectosEnProceso } from "../stores/proyectosEnProceso"
import { storeToRefs } from "pinia"

const store = useProyectosEnProceso()
const { gastoSelected, gastoTitulo } = storeToRefs(store)
</script>
