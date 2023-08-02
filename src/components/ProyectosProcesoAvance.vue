<template>
  <div class="flex w-full">
    <div class="flex h-fit w-[100%] flex-col">
      <!-- Avance -->
      <div class="flex h-full w-fit flex-col">
        <!-- Tiempo -->
        <div class="flex w-full">
          <div class="flex w-full flex-col">
            <!-- Componente -->
            <div class="mb-12 flex w-full justify-between" v-if="data.time">
              <div class="flex w-[70%] flex-col">
                <div class="flex w-full justify-between py-1">
                  <div class="flex h-[60%] w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-[#7C8495]"
                      for="iTotal"
                      >Avance</label
                    >
                    <div class="relative flex w-full">
                      <input
                        @change="validateInput('time')"
                        v-model="avances.time.new"
                        class="h-full w-full rounded-md border border-[#7C8495] bg-white pr-12 text-lg font-semibold"
                        type="number"
                        id="rNeta"
                        min="0"
                      />
                      <div
                        v-show="avances.time.isChange"
                        class="absolute inset-y-0 right-[42px] flex items-center justify-center"
                      >
                        <div v-if="!loadings.time" class="flex w-full">
                          <div
                            @click="saveNewTime"
                            class="cursor-pointer px-0.5 text-gray-500 hover:text-black"
                          >
                            <CheckIcon class="h-5 w-5" />
                          </div>
                          <div
                            @click="avances.time.new = 0"
                            class="cursor-pointer px-0.5 text-gray-500 hover:text-black"
                          >
                            <XIcon class="h-5 w-5" />
                          </div>
                        </div>
                        <div v-else class="flex w-full">
                          <IconSpinner />
                        </div>
                      </div>
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        días
                      </div>
                    </div>
                  </div>
                  <div class="flex h-[60%] w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-[#7C8495]"
                      for="tiempoActual"
                      >A la fecha</label
                    >
                    <div class="flex w-full">
                      <div
                        class="flex h-10 w-full items-center justify-center rounded-md border border-[#7C8495] bg-white text-center text-lg font-semibold"
                        type="text"
                        id="tiempoActual"
                      >
                        {{ avances.time.current }}
                      </div>
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        días
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex w-[28%] flex-col rounded-md bg-[#E9F0FC] p-2"
                  >
                    <label
                      class="flex w-full justify-start text-sm font-bold text-[#1A52B7]"
                      for="tiempoTotal"
                      >Tiempo total</label
                    >
                    <div class="flex w-full">
                      <div
                        class="flex h-10 w-full items-center justify-center rounded-md border border-[#7C8495] bg-white text-center text-lg font-semibold"
                        type="text"
                        id="tiempoTotal"
                      >
                        {{ data.time }}
                      </div>
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
                      >{{ avances.time.progress.toFixed(2) }}%</span
                    >
                  </div>
                  <div
                    class="h-2.5 w-full overflow-hidden rounded-full bg-[#E9F0FC]"
                  >
                    <div
                      :class="[
                        colorFondoRentabilidadBruta(data.business_unit),
                        'h-2.5 rounded-full transition-all duration-500',
                      ]"
                      :style="`width: ${avances.time.progress}%`"
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
              class="mb-12 flex w-full justify-between"
              v-for="(volumen, index) in avances.volumetrias"
              :key="index"
            >
              <div class="flex w-[70%] flex-col">
                <div class="flex w-full justify-between py-1">
                  <div class="flex h-[60%] w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-texto-gris"
                      :for="`nuevoAvance[${index}]`"
                      >Avance</label
                    >
                    <div class="relative flex w-full">
                      <input
                        @change="validateInput('', index)"
                        v-model="volumen.new"
                        class="h-full w-full max-w-[125px] rounded-md border border-[#7C8495] bg-white pr-12 text-lg font-semibold"
                        type="number"
                      />
                      <div
                        v-show="volumen.isChange"
                        class="absolute inset-y-0 right-[14px] flex items-center justify-center"
                      >
                        <div v-if="!volumen.loading" class="flex w-full">
                          <div
                            @click="saveNewVolumetry(index)"
                            class="cursor-pointer px-0.5 text-gray-500 hover:text-black"
                          >
                            <CheckIcon class="h-5 w-5" />
                          </div>
                          <div
                            @click="volumen.new = 0"
                            class="cursor-pointer px-0.5 text-gray-500 hover:text-black"
                          >
                            <XIcon class="h-5 w-5" />
                          </div>
                        </div>
                        <div v-else class="flex w-full">
                          <IconSpinner />
                        </div>
                      </div>
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        {{ volumen.atajo }}
                      </div>
                    </div>
                  </div>
                  <div class="flex h-[60%] w-[25.5%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-texto-gris"
                      :for="`volumetriaActual[${index}]`"
                      >Actuales</label
                    >
                    <div class="flex w-full">
                      <input
                        v-model="volumen.current"
                        class="h-full w-full rounded-md border bg-white text-center text-lg font-semibold"
                        type="text"
                        readonly
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        {{ volumen.atajo }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex w-[25.5%] flex-col rounded-md bg-[#E9F0FC] p-2"
                  >
                    <label
                      class="flex w-full justify-start text-sm font-bold text-[#1A52B7]"
                      for="tiempoTotal"
                    >
                      Total {{ volumen.type }}</label
                    >
                    <div class="flex w-full">
                      <div
                        class="flex h-10 w-full items-center justify-center rounded-md border border-[#7C8495] bg-white text-center text-lg font-semibold"
                        type="text"
                        id="tiempoTotal"
                      >
                        {{ volumen.total }}
                      </div>
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        {{ volumen.atajo }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Progress bar-->
                <div class="flex w-full flex-col overflow-hidden">
                  <div class="mb-1 flex w-full justify-between">
                    <span class="text-sm">Progreso</span>
                    <span class="text-sm font-medium"
                      >{{ volumen.progress.toFixed(2) }}%</span
                    >
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-[#E9F0FC]">
                    <div
                      :class="[
                        colorFondoRentabilidadBruta(data.business_unit),
                        'h-2.5 rounded-full transition-all duration-500',
                      ]"
                      :style="`width: ${volumen.progress}%`"
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
      class="flex h-full w-[30%] flex-col items-center justify-center font-semibold"
    >
      <div class="flex w-full items-center justify-center space-x-4">
        <div
          :class="[
            colorFondoRentabilidadNeta(data.business_unit),
            'h-5 w-5 rounded-full',
          ]"
        ></div>
        <div class="text-lg font-semibold">Rentabilidad Actual</div>
      </div>
      <div
        class="flex w-[100%] flex-col items-center justify-center space-y-3 rounded-lg bg-transparent p-4"
      >
        <div class="flex w-full rounded-xl border bg-white shadow-md">
          <div
            class="flex w-full flex-col items-center justify-center space-y-2 py-5"
          >
            <div class="text-xl">Bruta</div>
            <div
              :class="[
                colorTextoRentabilidadBruta(data.business_unit),
                'flex w-[60%] items-center justify-between truncate text-4xl font-bold',
              ]"
              :title="
                (data.rentabilidades.brutaFinal
                  ? data.rentabilidades.brutaFinal
                  : data.rentabilidades.brutaInicial
                ).toFixed(2)
              "
            >
              {{
                (data.rentabilidades.brutaFinal
                  ? data.rentabilidades.brutaFinal
                  : data.rentabilidades.brutaInicial
                ).toFixed(2)
              }}
              <span class="text-5xl">%</span>
            </div>
          </div>
        </div>
        <div class="flex w-full rounded-xl border bg-white shadow-md">
          <div
            class="flex w-full flex-col items-center justify-center space-y-2 py-5"
          >
            <div class="text-xl">Neta</div>
            <div
              :class="[
                colorTextoRentabilidadNeta(data.business_unit),
                'flex w-[60%] items-center justify-between truncate text-4xl font-bold',
              ]"
              :title="
                (data.rentabilidades.netaFinal
                  ? data.rentabilidades.netaFinal
                  : data.rentabilidades.netaInicial
                ).toFixed(2)
              "
            >
              {{
                (data.rentabilidades.netaFinal
                  ? data.rentabilidades.netaFinal
                  : data.rentabilidades.netaInicial
                ).toFixed(2)
              }}
              <span class="text-5xl">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
import {
  getDatabase,
  ref as refDB,
  set,
  child,
  get,
  update,
} from "firebase/database"
// import { store } from "@/store";
import {
  colorFondoRentabilidadBruta,
  colorFondoRentabilidadNeta,
  colorTextoRentabilidadBruta,
  colorTextoRentabilidadNeta,
} from "@/utils/color.js"
import { useRouter } from "vue-router"
import { useProyectosEnProceso } from "@/stores/proyectosEnProceso"
import { storeToRefs } from "pinia"
import { CheckIcon, XIcon } from "@heroicons/vue/outline"
import IconSpinner from "./icons/IconSpinner.vue"

const store = useProyectosEnProceso()
const { data, avances, loadings } = storeToRefs(store)
const { validateInput, saveNewTime, saveNewVolumetry } = store
// const props = defineProps(["data"]);
const tiempoAvance = ref(0)
const tiempoNuevoAvance = ref(0)
const tiempoPorcentaje = ref(0)
const database = getDatabase()
const refAvance = refDB(database)
const porcentaje = ref([])
const avance = ref([])
const nuevoAvance = ref([])
const sumaAvance = ref(0)
const rentabilidadAvance = ref({
  bruta: null,
  neta: null,
})
const router = useRouter()

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
  })
}

const calcPoliza = (index) => {
  console.log(props.data.val().ingresoTotal * (sumaAvance.value / 100))
  store.commit(
    "ingresoFinalSave",
    props.data.val().ingresoTotal * (sumaAvance.value / 100)
  )
  if (props.data.val().ingresoTotal * (sumaAvance.value / 100) != 0) {
    rentabilidad(props.data.val().ingresoTotal * (sumaAvance.value / 100))
  } else {
    rentabilidad(props.data.val().ingresoTotal)
  }
}

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
            ].avance + nuevoAvance.value[index]
        } else sumaAvance.value = nuevoAvance.value[index]
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
          ).toFixed(2)
          avance.value[index] = sumaAvance.value
          nuevoAvance.value[index] = 0
        })
        // Actualizar el tiempo
      } else {
        if (snapshot.hasChild("tiempo")) {
          sumaAvance.value = tiempoNuevoAvance.value + snapshot.val().tiempo
        } else {
          sumaAvance.value = tiempoNuevoAvance.value
        }
        update(refDB(database, `avanceProyectos/${props.data.key}`), {
          tiempo: sumaAvance.value,
        }).then(() => {
          tiempoPorcentaje.value = (
            (sumaAvance.value / props.data.val().tiempo) *
            100
          ).toFixed(2)
          tiempoAvance.value = sumaAvance.value
          tiempoNuevoAvance.value = 0
        })
      }
      if (
        data.business_unit == "Poliza" &&
        Object.keys(props.data.val().volumetrias)[index] === "Poliza"
      ) {
        calcPoliza(index)
        update(refDB(database, `avanceProyectos/${props.data.key}`), {
          ingresoFinal:
            store.state.b.ingresoFinal == 0 ||
            store.state.b.ingresoFinal === "$0.00"
              ? null
              : store.state.b.ingresoFinal,
        })
        router.go(0)
      }
    }
  )
}

// if (props.data.val().volumetrias)
//   for (const element in props.data.val().volumetrias) {
//     nuevoAvance.value.push(0);
//   }

// await get(child(refAvance, `avanceProyectos/${props.data.key}`)).then(
//   (snapshot) => {
//     if (snapshot.exists()) {
//       var i = 0;
//       if (snapshot.hasChild("volumetrias")) {
//         Object.values(snapshot.val().volumetrias).forEach((element) => {
//           avance.value.push(element.avance);
//           porcentaje.value[i] = (
//             (element.avance /
//               Object.values(props.data.val().volumetrias)[i].cantidad) *
//             100
//           ).toFixed(2);
//           i++;
//         });
//       }
//       if (snapshot.hasChild("tiempo")) {
//         tiempoAvance.value = snapshot.val().tiempo;
//         tiempoPorcentaje.value = (
//           (snapshot.val().tiempo / props.data.val().tiempo) *
//           100
//         ).toFixed(2);
//       }
//     } else {
//       for (const element in props.data.val().volumetrias) {
//         avance.value.push(0);
//         porcentaje.value.push(0);
//       }
//     }
//     if (snapshot.hasChild("rentabilidad")) {
//       rentabilidadAvance.value.bruta = snapshot.val().rentabilidad.bruta;
//       rentabilidadAvance.value.neta = snapshot.val().rentabilidad.neta;
//     }
//     if (snapshot.hasChild("ingresoFinal")) {
//       store.commit("ingresoFinalSave", snapshot.val().ingresoFinal);
//     } else store.commit("ingresoFinalSave", 0.0);
//   }
// );
</script>
