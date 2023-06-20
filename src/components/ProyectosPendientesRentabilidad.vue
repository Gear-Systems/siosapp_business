<template>
  <div class="flex w-full shadow-md max-w-[350px]">
    <div
      class="flex h-full w-full flex-col items-center rounded-md bg-[#E9F0FC] p-8"
    >
      <!-- titulo -->
      <div class="mb-8 flex items-center justify-around space-x-4">
        <div class="flex items-center justify-center rounded-md bg-white p-2">
          <img src="/img/rentabilidad_parcial.svg" />
        </div>
        <div class="flex text-xl font-semibold">
          Rentabilidad <br />
          Parcial
        </div>
      </div>
      <div class="flex w-full flex-col space-y-8">
        <!-- tarjeta bruta -->
        <div class="flex w-full rounded-xl bg-white">
          <div
            class="flex w-full flex-col items-center justify-center space-y-2 py-5"
          >
            <div class="w-full pl-9 text-xl">Bruta</div>
            <div class="flex items-center justify-between w-[70%]">
              <div
                :class="[
                  colorTextoRentabilidadBruta(data.business_unit),
                  'flex max-w-[200px] items-center justify-between truncate text-4xl font-bold',
                ]"
                :title="rentabilidad.brutaInicial.toFixed(2)"
              >
                {{ rentabilidad.brutaInicial.toFixed(2) }}
              </div>
              <div :class="[colorTextoRentabilidadBruta(data.business_unit), 'text-5xl font-bold']">%</div>
            </div>
          </div>
        </div>
        <!-- tarjeta neta -->
        <div class="flex w-full rounded-xl bg-white">
          <div
            class="flex w-full flex-col items-center justify-center space-y-2 py-5"
          >
            <div class="w-full pl-9 text-xl">Neta</div>
            <div class="flex items-center justify-between w-[70%]">
                <div
                  :class="[
                    colorTextoRentabilidadNeta(data.business_unit),
                    'flex items-center justify-between truncate text-4xl font-bold',
                  ]"
                  :title="rentabilidad.netaInicial.toFixed(2)"
                >
                  {{ rentabilidad.netaInicial.toFixed(2) }}
                </div>
                <div :class="[colorTextoRentabilidadNeta(data.business_unit), 'text-5xl font-bold']">%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useProyectoPendiente } from "../stores/proyectosPendientes"
import { storeToRefs } from "pinia"
import {
  colorDegradado,
  colorDegradadoDos,
  colorFondo,
  colorTextoRentabilidadBruta,
  colorTextoRentabilidadNeta,
} from "@/utils/color.js"

const store = useProyectoPendiente()
const { data, rentabilidad } = storeToRefs(store)
</script>
