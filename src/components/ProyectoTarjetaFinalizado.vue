<template>
  <div
    class="flex h-full w-full cursor-pointer flex-col space-y-2 rounded-lg bg-[url('/img/tarjeta_fondo_finalizado.svg')] bg-auto bg-right-top bg-no-repeat p-6 shadow-md"
    @click="$router.push(`/proyectos/finalizados/${props.data.key}`)"
  >
    <div class="flex h-full w-full flex-col">
      <div class="flex flex-col">
        <div
          class="flex w-full truncate text-base font-semibold"
          :title="props.data.value.nombre"
        >
          {{ props.data.value.nombre }}
        </div>
      </div>
      <div class="flex w-full flex-col items-start space-y-3">
        <div class="text-sm">Rentabilidad</div>
        <div
          class="flex h-auto w-full flex-col items-start justify-between space-y-2"
        >
          <div class="flex space-x-3.5">
            <div class="flex w-auto rounded bg-[#A6C2F5] px-3.5">
              <img src="/img/icono_bruta.svg" />
            </div>
            <div class="flex flex-col">
              <div class="text-xs text-[#7C8495]">Bruta</div>
              <div class="text-base font-semibold">
                {{ props.data.value.rentabilidad.bruta }}%
              </div>
            </div>
          </div>
          <div class="flex h-full space-x-3.5">
            <div class="flex w-auto rounded bg-[#3775E8] px-3.5">
              <img src="/img/icono_neta.svg" />
            </div>
            <div class="flex flex-col">
              <div class="text-xs text-[#7C8495]">Neta</div>
              <div class="text-base font-semibold">
                {{ props.data.value.rentabilidad.neta }}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-2">
        <div class="mb-1 flex justify-between">
          <span class="text-sm text-black dark:text-white"
            >Eficiencia</span
          >
          <span class="text-sm text-black dark:text-white"
            >45%</span
          >
        </div>
        <div class="h-2 w-full rounded-full bg-[#E9F0FC] dark:bg-gray-700">
          <div class="h-2 rounded-full bg-[#143D89]" style="width: 45%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["data"]);
</script>
