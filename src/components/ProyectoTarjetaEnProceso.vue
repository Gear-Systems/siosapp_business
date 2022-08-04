<template>
  <div
    class="flex h-full w-full cursor-pointer flex-col space-y-2 rounded-lg bg-[url('/img/tarjeta_fondo_enproceso.svg')] bg-cover bg-no-repeat p-6 shadow-md select-none"
    @click="$router.push(`/proyectos/en-proceso/${props.data.key}`)"
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
            <div class="flex h-full w-auto rounded bg-[#A6C2F5] px-3.5">
              <img src="/img/icono_bruta.svg" />
            </div>
            <div class="flex flex-col">
              <div class="flex justify-start text-xs text-[#7C8495]">Bruta</div>
              <div class="text-base font-semibold">
                {{ cambioRentabilidad.bruta ? cambioRentabilidad.bruta : props.data.value.rentabilidad.bruta }}%
              </div>
            </div>
          </div>
          <div class="flex space-x-3.5">
            <div class="flex h-full w-auto rounded bg-[#3775E8] px-3.5">
              <img src="/img/icono_neta.svg" />
            </div>
            <div class="flex flex-col">
              <div class="flex justify-start text-xs text-[#7C8495]">Neta</div>
              <div class="text-base font-semibold">
                {{ cambioRentabilidad.neta ? cambioRentabilidad.neta : props.data.value.rentabilidad.neta }}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="z-50 flex h-full -mt-4 w-full items-end justify-end">
        <div
          class="flex h-8 w-8 rotate-180 items-center justify-center rounded-full bg-[#2166E5] text-white"
        >
          <svg
            width="10"
            height="16"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.755037 7.65076L5.94337 12.8299C6.02859 12.9158 6.12997 12.984 6.24167 13.0306C6.35338 13.0771 6.47319 13.1011 6.5942 13.1011C6.71521 13.1011 6.83503 13.0771 6.94673 13.0306C7.05844 12.984 7.15982 12.9158 7.24504 12.8299C7.41577 12.6582 7.5116 12.4258 7.5116 12.1837C7.5116 11.9415 7.41577 11.7092 7.24504 11.5374L2.70754 6.95409L7.24504 2.41659C7.41577 2.24484 7.5116 2.01251 7.5116 1.77034C7.5116 1.52817 7.41577 1.29584 7.24504 1.12409C7.16014 1.03748 7.0589 0.968572 6.94718 0.921367C6.83546 0.874162 6.71549 0.849597 6.5942 0.849093C6.47292 0.849597 6.35295 0.874162 6.24123 0.921367C6.12951 0.968572 6.02827 1.03748 5.94337 1.12409L0.755037 6.30326C0.661991 6.3891 0.587733 6.49328 0.536943 6.60924C0.486153 6.72519 0.459932 6.85042 0.459932 6.97701C0.459932 7.1036 0.486153 7.22882 0.536943 7.34478C0.587733 7.46074 0.661991 7.56492 0.755037 7.65076V7.65076Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getDatabase, ref as refDB, get, child } from 'firebase/database';
const props = defineProps(["data"]);
const cambioRentabilidad = ref({
  bruta: null,
  neta: null,
})
const db = getDatabase();

get(child(refDB(db), `/avanceProyectos/${props.data.key}`)).then((snapshot) =>{
  // Valida si existe un avance de proyecto
  if(snapshot.exists){
    // Valida si existe cambios en las rentabilidades
    if(snapshot.hasChild("rentabilidad")) {
      // Valida si el cambio es en la rentabilidad bruta
      if(snapshot.hasChild("rentabilidad/bruta")) {
        cambioRentabilidad.value.bruta = snapshot.val().rentabilidad.bruta;
      }
      // Valida si el cambio es en la rentabilidad neta
      if(snapshot.hasChild("rentabilidad/neta")) {
        cambioRentabilidad.value.neta = snapshot.val().rentabilidad.neta;
      }
    }
  }
})

</script>
