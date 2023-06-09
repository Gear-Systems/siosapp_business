<template>
  <div class="flex flex-col lg:flex-row md:flex-row w-full">
    <div class="flex flex-col w-full lg:w-[70%] md:w-[70%] h-fit">
      <!-- Avance -->
      <div class="flex h-full flex-col w-fit">
        <!-- Tiempo -->
        <div class="flex w-full">
          <div class="flex w-full flex-col">
            <!-- Componente -->
            <div
              class="mb-12 flex flex-col lg:flex-row md:flex-row space-y-6 lg:space-y-0 md:space-y-0 w-full justify-between"
              v-if="props.data.val().tiempo"
            >
              <div class="flex w-full lg:w-[70%] md:w-[70%] flex-col">
                <div class="flex flex-col lg:flex-row md:flex-row w-full justify-between py-1">
                  <div class="flex h-[60%] w-full lg:w-[28%] md:w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-[#7C8495]"
                      for="iTotal"
                      >Avance</label
                    >
                    <div class="flex w-full">
                      <input
                        v-model="tiempoNuevoAvance"
                        @change="guardar('tiempo')"
                        class="h-full w-full rounded-md border border-[#7C8495] bg-white text-lg font-semibold"
                        type="number"
                        id="rNeta"
                        min="0"
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        días
                      </div>
                    </div>
                  </div>
                  <div class="flex h-[60%] w-full lg:w-[28%] md:w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-[#7C8495]"
                      for="tiempoActual"
                      >A la fecha</label
                    >
                    <div class="flex w-full">
                      <input
                        class="h-full w-full rounded-md border border-[#7C8495] bg-white text-center text-lg font-semibold"
                        type="text"
                        id="tiempoActual"
                        :value="tiempoAvance"
                        readonly
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        días
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex w-full lg:w-[28%] md:w-[28%] flex-col rounded-md bg-[#E9F0FC] p-2"
                  >
                    <label
                      class="flex w-full justify-start text-sm font-bold text-[#1A52B7]"
                      for="tiempoTotal"
                      >Tiempo total</label
                    >
                    <div class="flex w-full">
                      <input
                        class="h-full w-full rounded-md border border-[#7C8495] bg-white text-center text-lg font-semibold"
                        type="text"
                        id="tiempoTotal"
                        :value="props.data.val().tiempo"
                        readonly
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        días
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Progress bar-->
                <div class="flex w-full flex-col">
                  <div class="mb-1 flex w-full justify-between">
                    <span class="text-sm">Progreso</span>
                    <span class="text-sm font-medium"
                      >{{ tiempoPorcentaje }}%</span
                    >
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-[#E9F0FC]">
                    <div
                      :class="[
                        colorFondoRentabilidadBruta(props.data.val().unidad),
                        'h-2.5 rounded-full transition-all duration-500',
                      ]"
                      :style="`width: ${tiempoPorcentaje}%`"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="ml-2 flex h-full flex-col justify-center">
                <div class="text-lg font-semibold">Estado:</div>
                <div>Proyecto en buen camino</div>
              </div>
            </div>
            <!-- Fin componente 1-->
            <!-- Componente 2 -->
            <div
              class="mb-12 flex flex-col lg:flex-row md:flex-row w-full justify-between space-y-6 lg:space-y-0 md:space-y-0"
              v-for="(volumen, key, index) in props.data.val().volumetrias"
              :key="index"
            >
              <div class="flex w-full lg:w-[70%] md:w-[70%] flex-col">
                <div class="flex flex-col lg:flex-row md:flex-row w-full justify-between py-1">
                  <div class="flex h-[60%] w-full lg:w-[28%] md:w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-texto-gris"
                      :for="`nuevoAvance[${index}]`"
                      >Avance</label
                    >
                    <div class="flex w-full">
                      <input
                        v-model="nuevoAvance[index]"
                        @change="guardar(index)"
                        class="h-full w-full rounded-md border bg-white text-lg font-semibold"
                        type="number"
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        {{ volumen.unidad }}
                      </div>
                    </div>
                  </div>
                  <div class="flex h-[60%] w-full lg:w-[28%] md:w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-texto-gris"
                      :for="`volumetriaActual[${index}]`"
                      >Actuales</label
                    >
                    <div class="flex w-full">
                      <input
                        v-model="avance[index]"
                        class="h-full w-full rounded-md border bg-white text-center text-lg font-semibold"
                        type="text"
                        :id="`volumetriaActual[${index}]`"
                        readonly
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        {{ volumen.unidad }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex w-full lg:w-[28%] md:w-[28%] flex-col rounded-md bg-[#E9F0FC] p-2"
                  >
                    <label
                      class="flex w-full justify-start text-sm font-bold text-[#1A52B7]"
                      for="tiempoTotal"
                      >{{ volumen.unidad }} total {{ key }}</label
                    >
                    <div class="flex w-full">
                      <input
                        class="h-full w-full rounded-md border bg-white text-center text-lg font-semibold"
                        type="text"
                        id="tiempoTotal"
                        :value="volumen.cantidad"
                        readonly
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        {{ volumen.unidad }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Progress bar-->
                <div class="flex w-full flex-col overflow-hidden">
                  <div class="mb-1 flex w-full justify-between">
                    <span class="text-sm">Progreso</span>
                    <span class="text-sm font-medium"
                      >{{ porcentaje[index] }}%</span
                    >
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-[#E9F0FC]">
                    <div
                      :class="[
                        colorFondoRentabilidadBruta(props.data.val().unidad),
                        'h-2.5 rounded-full transition-all duration-500',
                      ]"
                      :style="`width: ${porcentaje[index]}%`"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="ml-2 flex h-full flex-col justify-center">
                <div class="text-lg font-semibold">Estado:</div>
                <div>Proyecto en buen camino</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Volumetría -->
      </div>
    </div>
    <div
      class="flex h-full flex-col items-center justify-center font-semibold w-full lg:w-[30%] md:w-[30%]"
    >
      <div class="flex w-full items-center justify-center space-x-4">
        <div
          :class="[
            colorFondoRentabilidadNeta(data.val().unidad),
            'h-5 w-5 rounded-full',
          ]"
        ></div>
        <div class="text-lg font-semibold">Rentabilidad Actual</div>
      </div>
      <div
        class="flex flex-col items-center justify-center space-y-3 rounded-lg bg-transparent p-4 w-[85%]"
      >
        <div class="flex w-full rounded-xl bg-white shadow-md border">
            <div
              class="flex w-full flex-col items-center justify-center space-y-2 py-5"
            >
              <div class="text-xl">Bruta</div>
              <div
                :class="[
                  colorTextoRentabilidadBruta(props.data.val().unidad),
                  'truncate text-4xl font-bold flex justify-between items-center w-[60%]',
                ]"
                :title="rentabilidadBruta"
              >
                {{ (rentabilidadAvance.bruta
                ? rentabilidadAvance.bruta
                : props.data.val().rentabilidad.bruta) }} <span class="text-5xl">%</span>
              </div>
            </div>
          </div>
        <div class="flex w-full rounded-xl bg-white shadow-md border">
            <div
              class="flex w-full flex-col items-center justify-center space-y-2 py-5"
            >
              <div class="text-xl">Neta</div>
              <div
                :class="[
                  colorTextoRentabilidadNeta(props.data.val().unidad),
                  'truncate text-4xl font-bold flex justify-between items-center w-[60%]',
                ]"
                :title="rentabilidadAvance.neta"
              >
                {{ (rentabilidadAvance.neta
                ? rentabilidadAvance.neta
                : props.data.val().rentabilidad.neta) }} <span class="text-5xl">%</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import {
  getDatabase,
  ref as refDB,
  set,
  child,
  get,
  update,
} from "firebase/database";
import { store } from "@/store";
import {
  colorFondoRentabilidadBruta,
  colorFondoRentabilidadNeta,
  colorTextoRentabilidadBruta,
  colorTextoRentabilidadNeta,
} from "@/utils/color.js";
import { useRouter } from "vue-router";

const props = defineProps(["data"]);
const tiempoAvance = ref(0);
const tiempoNuevoAvance = ref(0);
const tiempoPorcentaje = ref(0);
const database = getDatabase();
const refAvance = refDB(database);
const porcentaje = ref([]);
const avance = ref([]);
const nuevoAvance = ref([]);
const sumaAvance = ref(0);
const rentabilidadAvance = ref({
  bruta: null,
  neta: null,
});
const router = useRouter();

const rentabilidad = (ingreso) => {
  update(refDB(database, `avanceProyectos/${props.data.key}`), {
    rentabilidad: {
      bruta: (
        (1 -
          ((props.data.val().costoExterno.manoDeObra
            ? props.data.val().costoExterno.manoDeObra
            : 0) +
            (props.data.val().costoExterno.material
              ? props.data.val().costoExterno.material
              : 0) +
            ((props.data.val().costoInterno.manoDeObra
              ? props.data.val().costoInterno.manoDeObra
              : 0) +
              (props.data.val().costoInterno.material
                ? props.data.val().costoInterno.material
                : 0))) /
            ingreso) *
        100
      ).toFixed(2),
      neta: (
        (1 -
          ((props.data.val().costoExterno.manoDeObra
            ? props.data.val().costoExterno.manoDeObra
            : 0) +
            (props.data.val().costoExterno.material
              ? props.data.val().costoExterno.material
              : 0) +
            ((props.data.val().costoInterno.manoDeObra
              ? props.data.val().costoInterno.manoDeObra
              : 0) +
              (props.data.val().costoInterno.material
                ? props.data.val().costoInterno.material
                : 0)) +
            ((props.data.val().gastos.fijo ? props.data.val().gastos.fijo : 0) +
              (props.data.val().gastos.nomina
                ? props.data.val().gastos.nomina
                : 0) +
              (props.data.val().gastos.otros
                ? props.data.val().gastos.otros
                : 0) +
              (props.data.val().gastos.variable
                ? props.data.val().gastos.variable
                : 0))) /
            ingreso) *
        100
      ).toFixed(2),
    },
  });
};

const calcPoliza = (index) => {
  console.log(props.data.val().ingresoTotal * (sumaAvance.value / 100));
  store.commit(
    "ingresoFinalSave",
    props.data.val().ingresoTotal * (sumaAvance.value / 100)
  );
  if(props.data.val().ingresoTotal * (sumaAvance.value / 100) != 0){
  rentabilidad(props.data.val().ingresoTotal * (sumaAvance.value / 100));
  }
  else{
    rentabilidad(props.data.val().ingresoTotal);
  }
};

const guardar = (index) => {
  get(child(refAvance, `avanceProyectos/${props.data.key}`)).then(
    (snapshot) => {
      if (index != "tiempo") {
        // Actualizar las volumetrías
        if (
          snapshot.hasChild(
            `volumetrias/${Object.keys(props.data.val().volumetrias)[index]}`
          )
        ) {
          sumaAvance.value =
            snapshot.val().volumetrias[
              Object.keys(props.data.val().volumetrias)[index]
            ].avance + nuevoAvance.value[index];
        } else sumaAvance.value = nuevoAvance.value[index];
        update(
          refDB(
            database,
            `avanceProyectos/${props.data.key}/volumetrias/${
              Object.keys(props.data.val().volumetrias)[index]
            }`
          ),
          {
            avance: sumaAvance.value,
          }
        ).then(() => {
          porcentaje.value[index] = (
            (sumaAvance.value /
              Object.values(props.data.val().volumetrias)[index].cantidad) *
            100
          ).toFixed(2);
          avance.value[index] = sumaAvance.value;
          nuevoAvance.value[index] = 0;
        });
        // Actualizar el tiempo
      } else {
        if (snapshot.hasChild("tiempo")) {
          sumaAvance.value = tiempoNuevoAvance.value + snapshot.val().tiempo;
        } else {
          sumaAvance.value = tiempoNuevoAvance.value;
        }
        update(refDB(database, `avanceProyectos/${props.data.key}`), {
          tiempo: sumaAvance.value,
        }).then(() => {
          tiempoPorcentaje.value = (
            (sumaAvance.value / props.data.val().tiempo) *
            100
          ).toFixed(2);
          tiempoAvance.value = sumaAvance.value;
          tiempoNuevoAvance.value = 0;
        });
      }
      if (
        props.data.val().unidad == "Poliza" &&
        Object.keys(props.data.val().volumetrias)[index] === "Poliza"
      ) {
        
        calcPoliza(index);
        update(refDB(database, `avanceProyectos/${props.data.key}`), {
          ingresoFinal:
            store.state.b.ingresoFinal == 0 || store.state.b.ingresoFinal === '$0.00' ? null : store.state.b.ingresoFinal,
        });
        router.go(0);
      }
    }
  );
};

if (props.data.val().volumetrias)
  for (const element in props.data.val().volumetrias) {
    nuevoAvance.value.push(0);
  }

await get(child(refAvance, `avanceProyectos/${props.data.key}`)).then(
  (snapshot) => {
    if (snapshot.exists()) {
      var i = 0;
      if (snapshot.hasChild("volumetrias")) {
        Object.values(snapshot.val().volumetrias).forEach((element) => {
          avance.value.push(element.avance);
          porcentaje.value[i] = (
            (element.avance /
              Object.values(props.data.val().volumetrias)[i].cantidad) *
            100
          ).toFixed(2);
          i++;
        });
      }
      if (snapshot.hasChild("tiempo")) {
        tiempoAvance.value = snapshot.val().tiempo;
        tiempoPorcentaje.value = (
          (snapshot.val().tiempo / props.data.val().tiempo) *
          100
        ).toFixed(2);
      }
    } else {
      for (const element in props.data.val().volumetrias) {
        avance.value.push(0);
        porcentaje.value.push(0);
      }
    }
    if (snapshot.hasChild("rentabilidad")) {
      rentabilidadAvance.value.bruta = snapshot.val().rentabilidad.bruta;
      rentabilidadAvance.value.neta = snapshot.val().rentabilidad.neta;
    }
    if (snapshot.hasChild("ingresoFinal")) {
      store.commit("ingresoFinalSave", snapshot.val().ingresoFinal);
    } else store.commit("ingresoFinalSave", 0.0);
  }
);
</script>
