<template>
  <div
    class="flex h-full w-full cursor-pointer flex-col space-y-2 rounded-lg bg-[url('/img/tarjeta_fondo_finalizado.svg')] bg-auto bg-right-top bg-no-repeat p-6 shadow-md"
    @click="$router.push(`/proyectos/finalizados/${data.key}`)"
  >
    <div class="flex h-full w-full flex-col">
      <div class="flex flex-col">
        <div
          class="flex w-full truncate text-base font-semibold"
          :title="data.name"
        >
          {{ data.name }}
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
            <!-- <div class="flex flex-col">
              <div class="text-xs text-[#7C8495]">Bruta</div>
              <div class="text-base font-semibold">
                {{
                  cambioRentabilidad.bruta
                    ? cambioRentabilidad.bruta
                    : props.data.value.rentabilidad.bruta
                }}%
              </div>
            </div> -->
          </div>
          <div class="flex h-full space-x-3.5">
            <div class="flex w-auto rounded bg-[#3775E8] px-3.5">
              <img src="/img/icono_neta.svg" />
            </div>
            <div class="flex flex-col">
              <div class="text-xs text-[#7C8495]">Neta</div>
              <!-- <div class="text-base font-semibold">
                {{
                  cambioRentabilidad.neta
                    ? cambioRentabilidad.neta
                    : props.data.value.rentabilidad.neta
                }}%
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="mt-2 flex flex-col">
        <div class="mb-1 flex justify-between">
          <span class="text-sm text-black dark:text-white">Efectividad</span>
          <!-- <span class="text-sm text-black dark:text-white">{{ efectividad.total ? efectividad.total : 100 }}%</span> -->
        </div>
        <div class="h-2 w-full rounded-full bg-[#E9F0FC] dark:bg-gray-700">
          <!-- <div
            class="h-2 rounded-full bg-[#143D89]"
            :style="`width: ${efectividad.total ? efectividad.total : 100}%`"
          ></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getDatabase, ref as refDB, get, child } from "firebase/database";
const props = defineProps(["data"]);

const cambioRentabilidad = ref({
  bruta: null,
  neta: null,
});
const db = getDatabase();

const efectividad = ref({
  bruta: 0,
  neta: 0,
  total: 0,
});

// get(child(refDB(db), `/avanceProyectos/${props.data.key}`)).then((snapshot) => {
//   // Valida si existe un avance de proyecto
//   if (snapshot.exists) {
//     // Valida si existe cambios en las rentabilidades
//     if (snapshot.hasChild("rentabilidad")) {
//       // Valida si el cambio es en la rentabilidad bruta
//       if (snapshot.hasChild("rentabilidad/bruta")) {
//         cambioRentabilidad.value.bruta = snapshot.val().rentabilidad.bruta;
//         efectividad.value.bruta =
//           (cambioRentabilidad.value.bruta * 100) /
//           props.data.value.rentabilidad.bruta;
//       }
//       // Valida si el cambio es en la rentabilidad neta
//       if (snapshot.hasChild("rentabilidad/neta")) {
//         cambioRentabilidad.value.neta = snapshot.val().rentabilidad.neta;
//         efectividad.value.neta =
//           (cambioRentabilidad.value.neta * 100) /
//           props.data.value.rentabilidad.neta;
//       }
//       efectividad.value.total = ((efectividad.value.bruta + efectividad.value.neta) / 2).toFixed(2);
//     }
//   }
// });
</script>
