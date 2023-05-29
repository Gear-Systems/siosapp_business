<template>
  <div class="flex flex-col lg:pl-4 xl:pl-4 lg:flex-row xl:flex-row h-auto w-full select-none space-y-4 lg:space-y-0 xl:space-y-0 lg:space-x-[4%] xl:space-x-[4%]">
    <div
      class="flex w-full md:w-[50%] lg:w-[32%] xl:w-[32%] flex-col rounded-2xl border bg-white p-8 shadow-md"
    >
      <!-- Icono / Nombre proyecto / Funciones -->
      <div class="flex w-full flex-col items-center justify-center space-y-6">
        <!-- icono -->
        <div class="flex h-full w-full items-center justify-center">
          <div
            :class="[colorDegradado(data.unidad), 'h-32 w-32 rounded-full p-1']"
          >
            <div
              :class="[
                colorFondo(data.unidad),
                'flex h-full w-full flex-col items-center justify-center rounded-full border-8 border-white',
              ]"
            >
              <div class="text-xs text-white">Unidad</div>
              <div class="text-sm font-semibold text-white">
                {{ data.unidad }}
              </div>
            </div>
          </div>
        </div>
        <!-- Nombre proyecto / Funciones -->
        <div class="flex w-full flex-row items-center justify-center space-x-6">
          <div
            class="h-auto w-auto max-w-[40%] truncate text-xl font-bold"
            :title="nombre"
          >
            {{ nombre }}
          </div>
          <div class="h-auto w-auto max-w-[30%] truncate" :title="nombre">
            <img src="/img/menu.svg" alt="" />
          </div>
        </div>
      </div>
      <!-- FIN Icono / Nombre proyecto / Funciones -->
      <!-- Fecha creación / estado -->
      <div class="mt-14 flex w-full flex-col space-y-4">
        <div class="flex w-full items-center">
          <div class="h-3 w-3 rounded-full bg-[#7C8495]"></div>
          <div class="ml-3 w-[50%] min-w-[60%] text-lg text-[#7C8495]">
            Fecha de creación:
          </div>
          <div class="flex w-[35%] justify-end text-base font-bold">
            {{ creado }}
          </div>
        </div>
        <div class="flex w-full items-center">
          <div class="h-3 w-3 rounded-full bg-[#7C8495]"></div>
          <div class="ml-3 w-[30%] text-lg text-[#7C8495]">Estado:</div>
          <div
            class="flex w-[70%] justify-end text-base font-bold text-[#2166E5]"
          >
            {{ estado }}
          </div>
        </div>
      </div>
      <!-- Fin fecha creación / estado -->
      <!-- Ingreso total -->
      <div
        class="mt-14 flex w-full flex-col items-center justify-center space-y-4"
      >
        <div class="text-lg font-semibold">Ingresos totales</div>
        <div class="text-lg font-bold text-[#2166E5]">{{ iTotal }}</div>
      </div>
      <!-- Fin ingreso total -->
      <div
        class="mt-14 flex w-full flex-col items-center justify-center space-y-4"
      >
        <!-- Volumetrías / Tiempo -->
        <div class="flex w-full font-semibold">Volumetrías</div>
        <!-- Tiempo -->
        <div class="flex w-full items-center justify-between">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-md bg-[#E9F0FC]"
          >
            <img src="/img/time.svg" />
          </div>
          <div class="-ml-9 text-[#7C8495]">Tiempo total</div>
          <div class="text-lg font-semibold">{{ tiempo }}</div>
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
          <div class="flex w-full">
            <ul class="flex w-full flex-col justify-between">
              <li
                class="flex pl-16"
                v-for="(volumen, key) in volumetrias"
                :key="volumen"
              >
                <div class="flex w-full justify-between">
                  <div class="text-base text-[#7C8495]">{{ key }}</div>
                  <div class="text-lg font-semibold">
                    {{ volumen.cantidad.toLocaleString("en") }}
                  </div>
                  <div>{{ volumen.unidad }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full md:w-[50%] lg:w-[32%] xl:w-[32%] flex-col space-y-[4%]">
      <!-- Costo Interno -->
      <div
        class="flex h-full min-h-[32%] flex-col space-y-6 rounded-2xl border bg-white p-8 shadow-md"
      >
        <div class="flex w-full items-center space-x-4">
          <div
            :class="[
              colorDegradadoDos(data.unidad),
              'h-12 w-12 rounded-full p-1',
            ]"
          >
            <div
              :class="[
                colorTextoRentabilidadNeta(data.unidad),
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
              v-model="costoInternoMaterial"
              @change="totalCostoInterno"
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
              v-model="costoInternoManoObra"
              @change="totalCostoInterno"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div
          class="flex w-full items-center justify-end space-x-4"
          v-if="costoInternoMaterial || costoInternoManoObra"
        >
          <div>Total |</div>
          <div
            class="truncate text-lg font-semibold text-[#2166E5]"
            :title="costoInternoTotal"
          >
            {{ costoInternoTotal }} mxn
          </div>
        </div>
      </div>
      <!-- Costo Externo -->
      <div
        class="flex h-full min-h-[28%] flex-col space-y-6 rounded-2xl border bg-white p-8 shadow-md"
      >
        <div class="flex w-full items-center space-x-4">
          <div
            :class="[
              colorDegradadoDos(data.unidad),
              'h-12 w-12 rounded-full p-1',
            ]"
          >
            <div
              :class="[
                colorTextoRentabilidadNeta(data.unidad),
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
              v-model="costoExternoMaterial"
              @change="totalCostoExterno"
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
              v-model="costoExternoManoObra"
              @change="totalCostoExterno"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div
          class="flex w-full items-center justify-end space-x-4"
          v-if="costoExternoMaterial || costoExternoManoObra"
        >
          <div>Total |</div>
          <div
            class="truncate text-lg font-semibold text-[#2166E5]"
            :title="costoExternoTotal"
          >
            {{ costoExternoTotal }} mxn
          </div>
        </div>
      </div>
      <!-- Gastos Administrativos -->
      <div
        class="flex h-full flex-col space-y-2 rounded-2xl border bg-white p-8 shadow-md"
      >
        <div class="flex w-full items-center space-x-4">
          <div
            :class="[
              colorDegradadoDos(data.unidad),
              'h-12 w-12 rounded-full p-1',
            ]"
          >
            <div
              :class="[
                colorTextoRentabilidadNeta(data.unidad),
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
              v-model="gastoFijo"
              @change="totalGastos"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
          <div class="flex w-[35%] flex-col">
            <label for="gastoNomina" class="text-[#7C8495]">Nomina</label>
            <input
              v-model="gastoNomina"
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
              v-model="gastoVariable"
              @change="totalGastos"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
          <div class="flex w-[35%] flex-col">
            <label for="gastoOtros" class="text-[#7C8495]">Otros</label>
            <input
              v-model="gastoOtros"
              @change="totalGastos"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div
          class="flex w-full items-center justify-end space-x-4"
          v-if="gastoFijo || gastoNomina || gastoVariable || gastoOtros"
        >
          <div>Total |</div>
          <div
            class="truncate text-lg font-semibold text-[#2166E5]"
            :title="gastoTotal"
          >
            {{ gastoTotal }} mxn
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full md:w-[50%] lg:w-[32%] xl:w-[32%] flex-col items-center space-y-[4%] px-8">
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
              <div class="text-xl w-full pl-9">Bruta</div>
              <div
                :class="[
                  colorTextoRentabilidadBruta(data.unidad),
                  'truncate text-4xl font-bold flex justify-between items-center w-[70%]',
                ]"
                :title="rentabilidadBruta"
              >
                {{ rentabilidadBruta }} <span class="text-5xl">%</span>
              </div>
            </div>
           
          </div>
          <!-- tarjeta neta -->
          <div class="flex w-full rounded-xl bg-white">
            <div
              class="flex w-full flex-col items-center justify-center space-y-2 py-5"
            >
              <div class="text-xl w-full pl-9">Neta</div>
              <div
                :class="[
                  colorTextoRentabilidadNeta(data.unidad),
                  'truncate text-4xl font-bold flex justify-between items-center w-[70%]',
                ]"
                :title="rentabilidadNeta"
              >
                {{ rentabilidadNeta }} <span class="text-5xl">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex h-full w-full flex-col items-center justify-center space-y-10 lg:space-y-20 xl:space-y-20 pt-5"
      >
        <button
          @click="$router.push('/proyectos')"
          class="cursor-pointer font-medium text-[#2166E5] hover:underline"
        >
          Ir a proyectos
        </button>
        <button
          v-if="(costoInternoTotal || costoExternoTotal) && gastoTotal"
          @click="$store.commit('openModalConfirmacion')"
          class="cursor-pointer rounded-xl bg-[#2166E5] px-8 py-4 font-medium text-white"
        >
          Iniciar proyecto
        </button>
      </div>
    </div>
    <modal-confirmacion
      :id="$route.params.key"
      :rentabilidad="{ bruta: rentabilidadBruta, neta: rentabilidadNeta }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalConfirmacion from "@/components/ModalConfirmacion.vue";
import {
  colorDegradado,
  colorDegradadoDos,
  colorFondo,
  colorTextoRentabilidadBruta,
  colorTextoRentabilidadNeta,
} from "@/utils/color.js";
import {
  getDatabase,
  get,
  ref as refDB,
  child,
  update,
} from "@firebase/database";

const route = useRoute();
const router = useRouter();
const database = getDatabase();
const proyectoRef = refDB(database);
const nombre = ref("");
const creado = ref();
const estado = ref();
const iTotal = ref();
const iTotalAritmetico = ref(0);
const volumetrias = ref();
const costoInternoMaterial = ref(0);
const costoInternoManoObra = ref(0);
const costoInternoTotal = ref(0);

const datosSinFormato = ref({
  costoExternoTotal: 0,
  costoInternoTotal: 0,
  gastoTotal: 0,
});

const costoExternoMaterial = ref(0);
const costoExternoManoObra = ref(0);
const costoExternoTotal = ref(0);
const costoTotal = ref(0);
const tiempo = ref();

const gastoFijo = ref(0);
const gastoNomina = ref(0);
const gastoVariable = ref(0);
const gastoOtros = ref(0);
const gastoTotal = ref(0);

const rentabilidadNeta = ref(0);
const rentabilidadBruta = ref(0);

const data = ref({
  unidad: String,
});

const totalCostoInterno = () => {
  costoInternoTotal.value =
    costoInternoMaterial.value + costoInternoManoObra.value;
  datosSinFormato.value.costoInternoTotal = costoInternoTotal.value;
  if (costoInternoTotal.value === 0) {
    costoInternoTotal.value = null;
  } else {
    costoInternoTotal.value = costoInternoTotal.value.toLocaleString("en");
  }

  update(refDB(database, `proyectos/${route.params.key}/costoInterno`), {
    material: costoInternoMaterial.value ? costoInternoMaterial.value : null,
    manoDeObra: costoInternoManoObra.value ? costoInternoManoObra.value : null,
    total: costoInternoTotal.value ? costoInternoTotal.value : null,
  }).then(() => {
    rentabilidad();
  });
};

const totalCostoExterno = () => {
  costoExternoTotal.value =
    costoExternoMaterial.value + costoExternoManoObra.value;
  datosSinFormato.value.costoExternoTotal = costoExternoTotal.value;
  if (costoExternoTotal.value === 0) {
    costoExternoTotal.value = null;
  } else {
    costoExternoTotal.value = costoExternoTotal.value.toLocaleString("en");
  }
  update(refDB(database, `proyectos/${route.params.key}/costoExterno`), {
    material: costoExternoMaterial.value ? costoExternoMaterial.value : null,
    manoDeObra: costoExternoManoObra.value ? costoExternoManoObra.value : null,
    total: costoExternoTotal.value ? costoExternoTotal.value : null,
  }).then(() => {
    rentabilidad();
  });
};

const totalGastos = () => {
  gastoTotal.value =
    gastoFijo.value +
    gastoNomina.value +
    gastoVariable.value +
    gastoOtros.value;
  datosSinFormato.value.gastoTotal = gastoTotal.value;
  if (gastoTotal.value === 0) {
    gastoTotal.value = null;
  } else {
    gastoTotal.value = gastoTotal.value.toLocaleString("en");
  }
  update(refDB(database, `proyectos/${route.params.key}/gastos`), {
    fijo: gastoFijo.value ? gastoFijo.value : null,
    nomina: gastoNomina.value ? gastoNomina.value : null,
    variable: gastoVariable.value ? gastoVariable.value : null,
    otros: gastoOtros.value ? gastoOtros.value : null,
    total: gastoTotal.value ? gastoTotal.value : null,
  }).then(() => {
    rentabilidad();
  });
};

const rentabilidad = () => {
  costoTotal.value =
    datosSinFormato.value.costoExternoTotal +
    datosSinFormato.value.costoInternoTotal;
  rentabilidadNeta.value =
    (1 -
      (costoTotal.value + datosSinFormato.value.gastoTotal) /
        iTotalAritmetico.value) *
    100;
  rentabilidadNeta.value = rentabilidadNeta.value.toFixed(2);
  rentabilidadBruta.value =
    (1 - costoTotal.value / iTotalAritmetico.value) * 100;
  rentabilidadBruta.value = rentabilidadBruta.value.toFixed(2);
};

onMounted(() => {
  get(child(proyectoRef, `proyectos/${route.params.key}`)).then((snapshot) => {
    if (snapshot.exists()) {
      data.value = snapshot.val();
      nombre.value = snapshot.val().nombre;
      const date = new Date(snapshot.val().creado);
      creado.value =
        date.getDate() +
        "/" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "/" +
        date.getFullYear();
      estado.value = snapshot.val().estado;
      iTotalAritmetico.value = snapshot.val().ingresoTotal;
      iTotal.value = snapshot
        .val()
        .ingresoTotal.toLocaleString("en", {
          style: "currency",
          currency: "MXN",
        })
        .replace("MX", "");
      if (snapshot.hasChild("volumetrias")) {
        volumetrias.value = snapshot.val().volumetrias;
      }
      if (snapshot.hasChild("tiempo")) tiempo.value = snapshot.val().tiempo;
      if (snapshot.hasChild("costoInterno/material"))
        costoInternoMaterial.value = snapshot.val().costoInterno.material;
      if (snapshot.hasChild("costoInterno/manoDeObra"))
        costoInternoManoObra.value = snapshot.val().costoInterno.manoDeObra;
      // if (snapshot.hasChild('costoInterno/total')) costoInternoTotal.value = snapshot.val().costoInterno.total;

      if (snapshot.hasChild("costoExterno/material"))
        costoExternoMaterial.value = snapshot.val().costoExterno.material;
      if (snapshot.hasChild("costoExterno/manoDeObra"))
        costoExternoManoObra.value = snapshot.val().costoExterno.manoDeObra;
      // if (snapshot.hasChild('costoExterno/total')) costoExternoTotal.value = snapshot.val().costoExterno.total

      if (snapshot.hasChild("gastos/fijo"))
        gastoFijo.value = snapshot.val().gastos.fijo;
      if (snapshot.hasChild("gastos/nomina"))
        gastoNomina.value = snapshot.val().gastos.nomina;
      if (snapshot.hasChild("gastos/variable"))
        gastoVariable.value = snapshot.val().gastos.variable;
      if (snapshot.hasChild("gastos/otros"))
        gastoOtros.value = snapshot.val().gastos.otros;
      // if (snapshot.hasChild('gastos/total')) gastoTotal.value = snapshot.val().gastos.total
      totalCostoInterno();
      totalCostoExterno();
      totalGastos();
      rentabilidad();
    }
  });
});
</script>
