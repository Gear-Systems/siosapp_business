<template>
  <div class="flex w-[32%] flex-col justify-between">
    <!-- Costo Interno -->
    <div
      class="flex h-[200px] flex-col space-y-6 rounded-2xl border bg-white px-4 py-1 shadow-md"
    >
      <div class="flex w-full items-center space-x-4">
        <div
          :class="[
            colorDegradadoDos(data.business_unit),
            'h-12 w-12 rounded-full p-1',
          ]"
        >
          <div
            :class="[
              colorTextoRentabilidadNeta(data.business_unit),
              'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
            ]"
          >
            <div class="text-xl font-bold">CI</div>
          </div>
        </div>
        <div class="text-lg font-semibold">Costo Interno</div>
      </div>

      <div class="flex w-full items-center justify-center space-x-[10%]">
        <div class="flex w-[35%] flex-col">
          <label for="costoInternoMaterial" class="text-[#7C8495]"
            >Material</label
          >
          <input
            v-model="costos.costoInterno.material"
            @change="() =>
                (costos.costoInterno.material = !costos.costoInterno.material || costos.costoInterno.material < 0
                  ? 0
                  : costos.costoInterno.material)"
            class="rounded-lg border-2 border-[#7C8495] bg-white"
            type="number"
            min="0"
          />
        </div>
        <div class="flex w-[45%] flex-col">
          <label for="costoInternoMaterial" class="text-[#7C8495]"
            >Mano de obra</label
          >
          <input
            v-model="costos.costoInterno.manoDeObra"
            @change="() =>
                (costos.costoInterno.manoDeObra = !costos.costoInterno.manoDeObra || costos.costoInterno.manoDeObra < 0
                  ? 0
                  : costos.costoInterno.manoDeObra)"
            class="rounded-lg border-2 border-[#7C8495] bg-white"
            type="number"
            min="0"
          />
        </div>
      </div>
      <div class="-mt-12 flex w-full items-center justify-end space-x-4">
        <div>Total |</div>
        <div
          class="max-w-[200px] truncate text-lg font-semibold text-blue-siosapp"
          :title="costos.costoInterno.total"
        >
          {{ costos.costoInterno.total.toLocaleString("en-Us") }}
        </div>
        <div class="text-lg font-semibold text-blue-siosapp">mxn</div>
      </div>
    </div>
    <!-- Costo Externo -->
    <div
      class="flex h-[200px] flex-col space-y-6 rounded-2xl border bg-white px-4 py-1 shadow-md"
    >
      <div class="flex w-full items-center space-x-4">
        <div
          :class="[
            colorDegradadoDos(data.business_unit),
            'h-12 w-12 rounded-full p-1',
          ]"
        >
          <div
            :class="[
              colorTextoRentabilidadNeta(data.business_unit),
              'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
            ]"
          >
            <div class="text-xl font-bold">CE</div>
          </div>
        </div>
        <div class="text-lg font-semibold">Costo Externo</div>
      </div>
      <div class="flex w-full items-center justify-center space-x-[10%]">
        <div class="flex w-[35%] flex-col">
          <label for="costoInternoMaterial" class="text-[#7C8495]"
            >Material</label
          >
          <input
            v-model="costos.costoExterno.material"
            @change="() =>
                (costos.costoExterno.material = !costos.costoExterno.material || costos.costoExterno.material < 0
                  ? 0
                  : costos.costoExterno.material)"
            class="rounded-lg border-2 border-[#7C8495] bg-white"
            type="number"
            min="0"
          />
        </div>
        <div class="flex w-[45%] flex-col">
          <label for="costoInternoMaterial" class="text-[#7C8495]"
            >Mano de obra</label
          >
          <input
            v-model="costos.costoExterno.manoDeObra"
            @change="() =>
                (costos.costoExterno.manoDeObra = !costos.costoExterno.manoDeObra || costos.costoExterno.manoDeObra < 0
                  ? 0
                  : costos.costoExterno.manoDeObra)"
            class="rounded-lg border-2 border-[#7C8495] bg-white"
            type="number"
            min="0"
          />
        </div>
      </div>
      <div
        class="flex w-full items-center justify-end space-x-4"
      >
        <div>Total |</div>
        <div
          class="max-w-[200px] truncate text-lg font-semibold text-blue-siosapp"
          :title="costos.costoExterno.total"
        >
          {{ (costos.costoExterno.total).toLocaleString("en-US") }}
        </div>
        <div class="text-lg font-semibold text-blue-siosapp">mxn</div>
      </div>
    </div>
    <!-- Gastos Administrativos -->
    <div
      class="flex h-[230px] flex-col rounded-2xl border bg-white px-4 py-2 shadow-md"
    >
      <div class="flex w-full items-center space-x-4">
        <div
          :class="[
            colorDegradadoDos(data.business_unit),
            'h-12 w-12 rounded-full p-1',
          ]"
        >
          <div
            :class="[
              colorTextoRentabilidadNeta(data.business_unit),
              'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
            ]"
          >
            <div class="text-xl font-bold">GA</div>
          </div>
        </div>
        <div class="text-lg font-semibold">Gastos Administrativos</div>
      </div>
      <div class="flex w-full items-center justify-center space-x-[10%]">
        <div class="flex w-[35%] flex-col">
          <label for="gastoFijo" class="text-[#7C8495]">Fijo</label>
          <input
            v-model="costos.gastosAdministrativos.fijo"
            @change="totalGastos"
            class="rounded-lg border-2 border-[#7C8495] bg-white"
            type="number"
            min="0"
          />
        </div>
        <div class="flex w-[35%] flex-col">
          <label for="gastoNomina" class="text-[#7C8495]">Nomina</label>
          <input
            v-model="costos.gastosAdministrativos.nomina"
            @change="totalGastos"
            class="rounded-lg border-2 border-[#7C8495] bg-white"
            type="number"
            min="0"
          />
        </div>
      </div>
      <div class="flex w-full items-center justify-center space-x-[10%]">
        <div class="flex w-[35%] flex-col">
          <label for="gastoVariable" class="text-[#7C8495]">Variable</label>
          <input
            v-model="costos.gastosAdministrativos.variable"
            @change="totalGastos"
            class="rounded-lg border-2 border-[#7C8495] bg-white"
            type="number"
            min="0"
          />
        </div>
        <div class="flex w-[35%] flex-col">
          <label for="gastoOtros" class="text-[#7C8495]">Otros</label>
          <input
            v-model="costos.gastosAdministrativos.otros"
            @change="totalGastos"
            class="rounded-lg border-2 border-[#7C8495] bg-white"
            type="number"
            min="0"
          />
        </div>
      </div>
      <div
        class="flex w-full items-center justify-end space-x-4"
      >
        <div>Total |</div>
        <div
          class="max-w-[200px] truncate text-lg font-semibold text-blue-siosapp"
          :title="costos.gastosAdministrativos.total"
        >
          {{ (costos.gastosAdministrativos.total).toLocaleString("en-US") }}
        </div>
        <div class="text-lg font-semibold text-blue-siosapp">mxn</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"
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
const { data, costos } = storeToRefs(store)
</script>
