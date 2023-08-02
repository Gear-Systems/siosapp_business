<template>
  <div class="flex h-full w-full select-none flex-col">
    <div class="flex h-full w-full items-center justify-center space-x-12">
      <div class="flex flex-col">
        <GraficaFinalizados
          :porcentaje="data.rentabilidadBrutaPorcentaje"
          :color="props.coloresRentabilidadTexto.bruta"
        />
        <div
          class="min-h-10 flex h-10 w-full items-center justify-center space-x-4"
        >
          <div
            :class="[
              props.coloresRentabilidadFondo.bruta,
              'flex h-full w-auto rounded px-3.5',
            ]"
          >
            <img src="/img/icono_bruta.svg" />
          </div>
          <div class="text-lg font-semibold">Rentabilidad Bruta</div>
        </div>
      </div>
      <div class="flex flex-col">
        <GraficaFinalizados
          :porcentaje="data.rentabilidadNetaPorcentaje"
          :color="props.coloresRentabilidadTexto.neta"
        />
        <div
          class="min-h-10 flex h-10 w-full items-center justify-center space-x-4"
        >
          <div
            :class="[
              props.coloresRentabilidadFondo.neta,
              'flex h-full w-auto rounded px-3.5',
            ]"
          >
            <img src="/img/icono_neta.svg" />
          </div>
          <div class="text-lg font-semibold">Rentabilidad Neta</div>
        </div>
      </div>
      <div class="flex flex-col">
        <GraficaFinalizados
          :porcentaje="
            props.efectividad.neta
              ? (
                  (props.efectividad.neta + props.efectividad.bruta) /
                  2
                ).toFixed(2)
              : 100
          "
          :color="props.coloresEfectividad.texto"
        />
        <div
          class="min-h-10 flex h-10 w-full items-center justify-center space-x-4"
        >
          <div
            :class="[
              props.coloresEfectividad.fondo,
              'flex h-full rounded px-3.5',
            ]"
          >
            <img src="/img/efectividad.svg" />
          </div>
          <div class="text-lg font-semibold">Efectividad</div>
        </div>
      </div>
    </div>
    <div class="mt-12 flex w-full items-center justify-center text-[#2166E5]">
      <div
        @click="detalle = detalle ? false : true"
        class="h-auto w-auto cursor-pointer hover:underline"
      >
        Ver detalles
      </div>
    </div>
    <TransitionRoot
      :show="detalle"
      enter="transition-opacity duration-400"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-500"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <ProyectosFinalizadosDetalle
        :data="props.data"
        :dataFinal="props.dataFinal"
        :coloresRentabilidadFondo="props.coloresRentabilidadFondo"
        :coloresRentabilidadTexto="props.coloresRentabilidadTexto"
        :colorDegradadoDetalle="props.colorDegradadoDetalle"
      />
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import GraficaFinalizados from "./GraficaFinalizados.vue";
import ProyectosFinalizadosDetalle from "./ProyectosFinalizadosDetalle.vue";
import { TransitionRoot } from "@headlessui/vue";
import { useProyectosFinalizados } from "@/stores/proyectosFinalizados"
import { storeToRefs } from "pinia"

const store = useProyectosFinalizados()
const { data } = storeToRefs(store)
const detalle = ref(false);
const props = defineProps([
  "data",
  "dataFinal",
  "rentabilidadFinal",
  "efectividad",
  "coloresRentabilidadFondo",
  "coloresRentabilidadTexto",
  "coloresEfectividad",
  "colorDegradadoDetalle",
]);
</script>
