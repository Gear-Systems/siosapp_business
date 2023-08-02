<template>
  <div class="flex h-full w-full flex-col space-y-12 px-6 py-6" v-if="data">
    <div class="flex h-auto w-full justify-evenly">
      <div class="flex h-full w-[25%] items-center justify-center">
        <div :class="[colorDegradado(), 'h-32 w-32 rounded-full p-1']">
          <div
            :class="[
              colorFondo(),
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
      <!-- Tarjeta de proyecto -->
      <div class="flex w-[40%] w-full flex-col items-start">
        <div class="flex w-[60%] flex-col space-y-4">
          <div class="flex justify-center text-xl font-semibold">
            {{ data.nombre }}
          </div>
          <div class="flex justify-between">
            <div class="text-[#7C8495]">Fecha de inicio:</div>
            <div class="font-semibold">{{ data.created_format }}</div>
          </div>
          <div class="flex justify-between">
            <div class="text-[#7C8495]">Estado:</div>
            <div class="font-semibold text-[#2166E5]">
              {{ data.status }}
            </div>
          </div>
        </div>
      </div>
      <!-- Fin tarjeta de proyecto -->
      <div class="flex w-[60%] select-none items-center space-x-[10%]">
        <!-- Ingresos -->
        <div class="flex h-full w-[30%] flex-col">
          <div class="flex h-full w-full flex-col space-y-4">
            <div class="flex w-full items-center justify-center">Ingresos</div>
            <div>
              <div class="flex flex-col rounded-lg py-2 px-4 shadow-md">
                <div class="text-sm">{{ iFinal ? "Inicial" : "Final" }}</div>
                <div class="font-semibold text-[#2166E5]">${{ (data.amountTotal).toLocaleString("en-US") }}</div>
              </div>
            </div>
            <div v-if="iFinal">
              <div class="flex flex-col rounded-lg py-2 px-4 shadow-md">
                <div class="text-sm">Final</div>
                <div class="font-semibold text-[#2166E5]">{{ iFinal }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Rentabilidades -->
        <div class="flex h-full flex-col space-y-4">
          <div>Rentabilidad inicial</div> 
          <div class="flex w-full justify-center space-x-3.5">
            <div
              :class="[
                colorFondoRentabilidadBruta(),
                'flex w-auto rounded bg-[#A6C2F5] px-3.5',
              ]"
            >
              <img src="/img/icono_bruta.svg" />
            </div>
            <div class="flex flex-col">
              <div class="flex justify-start text-xs text-[#7C8495]">Bruta</div>
              <div class="text-base font-semibold">
                {{ data.rentabilidades.brutaInicial.toFixed(2) }}%
              </div>
            </div>
          </div>
          <div class="flex w-full justify-center space-x-3.5">
            <div
              :class="[
                colorFondoRentabilidadNeta(),
                'flex w-auto rounded px-3.5',
              ]"
            >
              <img src="/img/icono_neta.svg" />
            </div>
            <div class="flex flex-col">
              <div class="flex justify-start text-xs text-[#7C8495]">Neta</div>
              <div class="text-base font-semibold">
                {{ data.rentabilidades.netaInicial.toFixed(2) }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col space-y-4">
      <div class="flex w-full flex-col space-y-2">
        <!-- Tarjeta en proceso -->
        <div class="flex w-full space-x-4">
          <div class="flex w-[50%] space-x-2">
            <div class="flex items-center justify-center">
              <div class="h-4 w-4 rounded-full bg-[#2166E5]"></div>
            </div>
            <div class="flex flex-col">
              <div class="font-semibold">Resultados</div>
              <div class="text-sm">Logros del proyecto</div>
            </div>
          </div>
          <div class="flex w-[50%] justify-end space-x-24">
            <button
              class="min-w-[150px] rounded-lg bg-[#2166E5] py-2 px-6 text-white"
              type="button"
              @click="$store.commit('openModalReabrirProyecto')"
            >
              Reabrir proyecto
            </button>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-center">
        <proyectos-finalizados-resumen
          v-if="!detalle"
          :data="data"
          :dataFinal="dataFinal"
          :rentabilidadFinal="rentabilidadFinal"
          :efectividad="efectividad"
          :coloresRentabilidadFondo="colorRentabilidadFondo"
          :coloresRentabilidadTexto="colorRentabilidadTexto"
          :coloresEfectividad="colorEfectividad"
          :colorDegradadoDetalle="colorDegradadoDetalle"
        />
      </div>
    </div>

    <modal-reabrir-proyecto :keyData="$route.params.key" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getDatabase, ref as refDB, get, update } from "firebase/database";
import ProyectosFinalizadosResumen from "@/components/ProyectosFinalizadosResumen.vue";
import ProyectosFinalizadosDetalle from "@/components/ProyectosFinalizadosDetalle.vue";
import ModalReabrirProyecto from "@/components/ModalReabrirProyecto.vue";
import { useRoute } from "vue-router";
import { useProyectosFinalizados } from "@/stores/proyectosFinalizados"
import { storeToRefs } from "pinia"

const store = useProyectosFinalizados()
const { data } = storeToRefs(store)
const { fetchData } = store 
const database = getDatabase();
const route = useRoute();
const detalle = ref(false);
// const data = ref({ nombre: "", rentabilidad: { bruta: 0, neta: 0 } });
const dataFinal = ref({ rentabilidad: { bruta: 0, neta: 0 } });
const rentabilidadFinal = ref({
  bruta: Number,
  neta: Number,
});
const iTotal = ref(0);
const creado = ref();
const efectividad = ref({
  bruta: 0,
  neta: 0,
});
const iFinal = ref();
const colorRentabilidadTexto = ref({
  neta: String,
  bruta: String,
  fondo: String,
});
const colorRentabilidadFondo = ref({
  neta: String,
  bruta: String,
});
const colorEfectividad = ref({
  texto: String,
  fondo: String,
});
const colorDegradadoDetalle = ref();

fetchData(route.params.key)

const colorFondo = () => {
  let color;
  let efectividadTexto;
  let efectividadFondo;
  switch (data.value.business_unit) {
    case "Poliza":
      color = "bg-poliza";
      efectividadFondo = "bg-poliza";
      efectividadTexto = "text-poliza";
      break;
    case "Megacable":
      color = "bg-megacable";
      efectividadFondo = "bg-megacable";
      efectividadTexto = "text-megacable";
      break;
    case "Infraestructura":
      color = "bg-infraestructura";
      efectividadFondo = "bg-infraestructura";
      efectividadTexto = "text-infraestructura";
      break;
    case "Ventas":
      color = "bg-ventas";
      efectividadFondo = "bg-ventas";
      efectividadTexto = "text-ventas";
      break;
  }
  colorEfectividad.value.fondo = efectividadFondo;
  colorEfectividad.value.texto = efectividadTexto;
  return color;
};

const colorFondoRentabilidadBruta = () => {
  let color;
  let grafico;
  switch (data.value.business_unit) {
    case "Poliza":
      color = "bg-poliza-3";
      grafico = "text-poliza-3";
      break;
    case "Megacable":
      color = "bg-megacable-3";
      grafico = "text-megacable-3";
      break;
    case "Infraestructura":
      color = "bg-infraestructura-3";
      grafico = "text-infraestructura-3";
      break;
    case "Ventas":
      color = "bg-ventas-3";
      grafico = "text-ventas-3";
      break;
  }
  colorRentabilidadFondo.value.bruta = color;
  colorRentabilidadTexto.value.bruta = grafico;
  return color;
};

const colorFondoRentabilidadNeta = () => {
  let color;
  let grafico;
  let fondo;
  switch (data.value.business_unit) {
    case "Poliza":
      color = "bg-poliza-2";
      grafico = "text-poliza-2";
      fondo = "text-poliza";
      break;
    case "Megacable":
      color = "bg-megacable-2";
      grafico = "text-megacable-2";
      fondo = "text-megacable";
      break;
    case "Infraestructura":
      color = "bg-infraestructura-2";
      grafico = "text-infraestructura-2";
      fondo = "text-infraestructura";
      break;
    case "Ventas":
      color = "bg-ventas-2";
      grafico = "text-ventas-2";
      fondo = "text-ventas";
      break;
  }
  colorRentabilidadFondo.value.neta = color;
  colorRentabilidadTexto.value.neta = grafico;
  colorRentabilidadTexto.value.fondo = fondo;
  return color;
};

const colorDegradado = () => {
  let colorDegradado;
  let colorDegradadoDetalleFunc;
  switch (data.value.business_unit) {
    case "Poliza":
      colorDegradado = "bg-gradient-to-tr from-poliza via-poliza-2 to-poliza-3";
      colorDegradadoDetalleFunc = "bg-gradient-to-tr from-poliza to-poliza-3";
      break;
    case "Megacable":
      colorDegradado =
        "bg-gradient-to-tr from-megacable via-megacable-2 to-megacable-3";
      colorDegradadoDetalleFunc =
        "bg-gradient-to-tr from-megacable to-megacable-3";
      break;
    case "Infraestructura":
      colorDegradado =
        "bg-gradient-to-tr from-infraestructura via-infraestructura-2 to-infraestructura-3";
      colorDegradadoDetalleFunc =
        "bg-gradient-to-tr from-infraestructura to-infraestructura-3";
      break;
    case "Ventas":
      colorDegradado = "bg-gradient-to-tr from-ventas via-ventas-2 to-ventas-3";
      colorDegradadoDetalleFunc = "bg-gradient-to-tr from-ventas to-ventas-3";
      break;
  }
  colorDegradadoDetalle.value = colorDegradadoDetalleFunc;
  return colorDegradado;
};

// onMounted(() => {
//   get(refDB(database, `proyectos/${route.params.key}`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const date = new Date(snapshot.val().creado);
//         data.value = snapshot.val();
//         iTotal.value = snapshot.val().ingresoTotal.toLocaleString("en", {
//           style: "currency",
//           currency: "MXN",
//         });
//         creado.value =
//           date.getDate() +
//           "/" +
//           String(date.getMonth() + 1).padStart(2, "0") +
//           "/" +
//           date.getFullYear();
//       }
//     })
//     .then(() => {
//       get(refDB(database, `avanceProyectos/${route.params.key}`)).then(
//         (snapshot) => {
//           if (snapshot.exists()) {
//             dataFinal.value = snapshot.val();
//             if (snapshot.hasChild("rentabilidad")) {
//               if (snapshot.hasChild("rentabilidad/bruta")) {
//                 rentabilidadFinal.value.bruta =
//                   snapshot.val().rentabilidad.bruta;
//                 efectividad.value.bruta =
//                   (rentabilidadFinal.value.bruta * 100) /
//                   data.value.rentabilidad.bruta;
//               }
//               if (snapshot.hasChild("rentabilidad/neta")) {
//                 rentabilidadFinal.value.neta = snapshot.val().rentabilidad.neta;
//                 efectividad.value.neta =
//                   (rentabilidadFinal.value.neta * 100) /
//                   data.value.rentabilidad.neta;
//               }
//             } else {
//               efectividad.value.bruta = 100;
//               efectividad.value.neta = 100;
//             }
//             if (snapshot.hasChild("ingresoFinal"))
//               iFinal.value = snapshot.val().ingresoFinal;
//           }
//         }
//       );
//     });
// });
</script>
