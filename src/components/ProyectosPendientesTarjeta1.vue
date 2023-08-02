<template>
    <div
      class="flex w-full md:w-[50%] lg:w-[32%] xl:w-[32%] flex-col px-4 rounded-2xl border bg-white shadow-md py-4"
    >
      <!-- Icono / Nombre proyecto / Funciones -->
      <div class="flex w-full flex-col items-center justify-center space-y-6">
        <!-- icono -->
        <div class="flex h-full w-full items-center justify-center">
          <div
            :class="[colorDegradado(data.business_unit), 'h-32 w-32 rounded-full p-1']"
          >
            <div
              :class="[
                colorFondo(data.business_unit),
                'flex h-full w-full flex-col items-center justify-center rounded-full border-8 border-white',
              ]"
            >
              <div class="text-xs text-white">Unidad</div>
              <div class="text-sm font-semibold text-white">
                {{ data.business_unit }}
              </div>
            </div>
          </div>
        </div>
        <!-- Nombre proyecto / Funciones -->
        <div class="flex w-full flex-row items-center justify-center space-x-6">
          <div
            class="h-auto w-auto max-w-[40%] truncate text-xl font-bold"
            :title="data.name"
          >
            {{ data.name }}
          </div>
          <div class="h-auto w-auto max-w-[30%] truncate" :title="data.name">
            <img src="/img/menu.svg" alt="" />
          </div>
        </div>
      </div>
      <!-- FIN Icono / Nombre proyecto / Funciones -->
      <!-- Fecha creación / estado -->
      <div class="mt-10 flex w-full flex-col space-y-2">
        <div class="flex w-full items-center">
          <div class="h-2 w-2 rounded-full bg-[#7C8495]"></div>
          <div class="ml-3 w-[50%] min-w-[60%] text-lg text-[#7C8495]">
            Fecha de creación:
          </div>
          <div class="flex w-[35%] justify-end text-base font-bold">
            {{ data.created_format }}
          </div>
        </div>
        <div class="flex w-full items-center">
          <div class="h-2 w-2 rounded-full bg-[#7C8495]"></div>
          <div class="ml-3 w-[30%] text-lg text-[#7C8495]">Estado:</div>
          <div
            class="flex w-[70%] justify-end text-base font-bold text-[#2166E5]"
          >
            {{ data.status }}
          </div>
        </div>
      </div>
      <!-- Fin fecha creación / estado -->
      <!-- Ingreso total -->
      <div
        class="mt-8 flex w-full flex-col items-center justify-center space-y-4"
      >
        <div class="text-md font-semibold text-gray-text">Ingreso total</div>
        <div class="text-lg font-bold text-[#2166E5]">$ {{ (data.amountTotal).toLocaleString("en-Us") }}</div>
        <div class="text-lg font-semibold text-gray-text">MXN</div>
      </div>
      <!-- Fin ingreso total -->
      <div
        class="mt-8 flex w-full flex-col items-center justify-center space-y-4"
      >
        <!-- Volumetrías / Tiempo -->
        <!-- Tiempo -->
        <div class="flex w-full items-center justify-between">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-md bg-[#E9F0FC]"
          >
            <img src="/img/time.svg" />
          </div>
          <div class="-ml-9 text-[#7C8495]">Tiempo total</div>
          <div class="text-lg font-semibold">{{ data.time }}</div>
          <div>días</div>
        </div>
        <!-- Separador -->
        <div class="flex h-[1.5px] w-[70%] justify-center bg-[#7C8495]"></div>
        <!-- Volumetrias -->
        <div class="flex w-full flex-col">
          <div class="flex w-full items-center space-x-4">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-md bg-[#E9F0FC]"
            >
              <img src="/img/volumetria.svg" />
            </div>
            <div class="text-[#7C8495]">Volumetrías</div>
          </div>
          <div class="flex w-full mt-3">
            <ul class="flex w-full flex-col justify-between">
              <li
                class="flex pl-16"
                v-for="(volumen, key) in data.volumetryData"
                :key="volumen"
              >
                <div class="flex w-full justify-between">
                  <div class="text-base text-[#7C8495]">{{ volumen.volumetry_type }}</div>
                  <div class="text-lg font-semibold">
                    {{ volumen.volumetry.toLocaleString("en") }}
                  </div>
                  <div>{{ volumen.volumetry_unit.atajo }}</div>
                </div>
              </li>
            </ul>
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
} from "@/utils/color.js";

const store = useProyectoPendiente()
const { data } = storeToRefs(store)

</script>