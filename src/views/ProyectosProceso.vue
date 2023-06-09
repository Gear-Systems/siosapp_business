<template>
  <div class="flex h-full w-full flex-col space-y-6 px-6 py-6">
    <div
      class="mb-10 flex w-full flex-col items-center md:h-[20%] md:flex-row lg:h-[20%] lg:flex-row lg:items-start"
    >
      <!-- Icono -->
      <div class="flex h-full w-fit items-center justify-center">
        <div
          :class="[
            colorDegradado(data.val().unidad),
            'h-32 w-32 rounded-full p-1',
          ]"
        >
          <div
            :class="[
              colorFondo(data.val().unidad),
              'flex h-full w-full flex-col items-center justify-center rounded-full border-8 border-white',
            ]"
          >
            <div class="text-xs text-white">Unidad</div>
            <div class="text-sm font-semibold text-white">
              {{ data.val().unidad }}
            </div>
          </div>
        </div>
      </div>
      <!-- Tarjeta de proyecto -->
      <div
        class="mt-6 flex w-full flex-col items-start md:mt-0 md:w-[60%] lg:mt-0 lg:w-[60%] lg:items-center"
      >
        <div class="flex w-[60%] flex-col space-y-4">
          <div class="flex justify-start text-xl font-semibold">
            {{ data.val().nombre }}
          </div>
          <div class="flex justify-between">
            <div class="flex items-center justify-center space-x-4">
              <div class="h-3 w-3 rounded-full bg-[#7C8495]"></div>
              <div class="text-[#7C8495]">Fecha de inicio:</div>
            </div>
            <div class="font-bold">{{ creado }}</div>
          </div>
          <div class="flex justify-between">
            <div class="flex items-center justify-center space-x-4">
              <div class="h-3 w-3 rounded-full bg-[#7C8495]"></div>
              <div class="text-[#7C8495]">Estado:</div>
            </div>
            <div class="font-bold text-[#2166E5]">
              {{ data.val().estado }}
            </div>
          </div>
        </div>
      </div>
      <!-- Fin tarjeta de proyecto -->
      <div
        class="flex w-full mt-6 lg:mt-0 md:mt-0 flex-col items-start md:w-[60%] md:flex-row md:items-center lg:w-[60%] lg:flex-row lg:items-center lg:space-x-[10%]"
      >
        <!-- Ingreso total -->
        <div class="flex w-full justify-center">
          <div
            class="flex w-[60%] flex-col justify-center space-y-4 md:w-[40%] lg:w-[60%]"
          >
            <div class="flex w-full justify-center">Ingresos</div>
            <div
              class="group relative mb-6 w-full rounded-lg border-2 px-4 pt-4 drop-shadow-sm"
            >
              <input
                type="text"
                name="ingreso_inicial"
                class="peer block w-full border-none bg-transparent py-2.5 px-0 text-lg font-bold text-[#2166E5]"
                placeholder=" "
                :value="iTotal.replace('MX', '')"
                disabled
              />
              <label
                for="ingreso_inicial"
                class="absolute top-7 origin-[0] -translate-y-6 scale-75 transform text-base font-medium text-black duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                {{
                  $store.state.b.ingresoFinal == "$0.00" ? "Actual" : "Inicial"
                }}</label
              >
            </div>
            <TransitionRoot
              appear
              :show="$store.state.b.ingresoFinal != '$0.00'"
              enter="transition-opacity duration-500"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-500"
              leave-from="opacity-100"
              leave-to="opacity-0"
              :class="$store.state.b.ingresoFinal != '$0.00' ? '' : 'absolute'"
            >
              <div
                class="group relative mb-6 w-full rounded-lg border-2 px-4 pt-4 drop-shadow-sm"
              >
                <input
                  type="text"
                  name="ingreso_inicial"
                  class="peer block w-full border-none bg-transparent py-2.5 px-0 text-lg font-bold text-[#2166E5]"
                  placeholder=" "
                  :value="$store.state.b.ingresoFinal"
                  disabled
                />
                <label
                  for="ingreso_inicial"
                  class="absolute top-7 origin-[0] -translate-y-6 scale-75 transform text-base font-medium text-black duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                  >Actual</label
                >
              </div>
            </TransitionRoot>
          </div>
        </div>
        <!-- Rentabilidad inicial -->
        <div class="flex w-full flex-col space-y-4 mt-4 lg:mt-0 md:mt-0">
          <div class="flex w-full justify-center text-lg font-medium">
            Rentabilidad Inicial
          </div>
          <div class="flex w-full space-x-4">
            <div class="flex justify-start">
              <div
                :class="[
                  colorFondoRentabilidadBruta(data.val().unidad),
                  'flex items-center justify-center rounded-md px-5',
                ]"
              >
                <img src="/img/icono_bruta.svg" alt="" />
              </div>
            </div>
            <div class="flex flex-col">
              <div>Bruta Inicial</div>
              <div class="text-lg font-bold">
                {{ data.val().rentabilidad.bruta + " %" }}
              </div>
            </div>
          </div>
          <div class="flex w-full space-x-4">
            <div class="flex justify-start">
              <div
                :class="[
                  colorFondoRentabilidadNeta(data.val().unidad),
                  'flex items-center justify-center rounded-md px-5',
                ]"
              >
                <img src="/img/icono_neta.svg" alt="" />
              </div>
            </div>

            <div class="flex flex-col">
              <div>Neta Inicial</div>
              <div class="text-lg font-bold">
                {{ data.val().rentabilidad.neta + " %" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Componente avance -->
    <div class="flex w-full flex-col space-y-2">
      <!-- Tarjeta en proceso -->
      <div class="flex w-fit space-x-4">
        <div class="flex items-center justify-center">
          <div
            :class="[
              colorFondoRentabilidadNeta(data.val().unidad),
              'h-5 w-5 rounded-full',
            ]"
          ></div>
        </div>
        <div class="flex flex-col">
          <div class="font-semibold">En proceso</div>
        </div>
        <div class="flex items-center justify-center">
          <Popover class="relative">
            <PopoverButton
              ><img class="h-5 w-5" src="/img/menu.svg" alt="menu"
            /></PopoverButton>

            <PopoverPanel
              class="absolute z-10 w-[300px] rounded-md border-2 border-black bg-white"
            >
              <div class="flex h-auto w-full w-auto flex-col">
                <a
                  class="flex h-7 w-full cursor-pointer items-center rounded-md hover:bg-fondo-gris"
                  @click=";[$store.commit('openModalEditarTiempoVolumetria')]"
                  >Editar tiempo/volumetria</a
                >
              </div>
            </PopoverPanel>
          </Popover>
          <modal-editar-tiempo-volumetria :data="data" />
        </div>
      </div>
      <!-- Fin tarjeta en proceso -->
      <Suspense>
        <proyectos-proceso-avance :data="data" />
      </Suspense>
    </div>
    <!-- Tarjeta costos / gastos -->
    <div class="flex flex-col space-y-6 lg:space-y-0 md:space-y-0 lg:flex-row md:flex-row h-full w-full justify-around">
      <div
        class="flex w-full md:w-[35%] lg:w-[35%] flex-col rounded-lg border bg-white px-8 py-4 shadow-md"
      >
        <div class="flex w-full justify-end">
          <modal-editar-costos-gastos :data="data" />
          <Popover class="relative">
            <PopoverButton>
              <div class="px-4">
                <img src="/img/menu.svg" alt="" />
              </div>
            </PopoverButton>
            <PopoverPanel
              class="absolute z-10 w-[300px] rounded-md border-2 border-black bg-white"
            >
              <div
                class="flex h-auto w-auto flex-col items-center justify-center"
              >
                <a
                  class="flex h-8 w-full cursor-pointer items-center rounded-md p-0.5 hover:bg-fondo-gris"
                  @click="$store.commit('openModalEditarCostosGastos')"
                  >Editar costos/gastos</a
                >
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        <div class="flex w-full flex-col space-y-4">
          <!-- Costo interno -->
          <div class="flex space-x-6" v-if="data.val().costoInterno">
            <div>
              <div
                :class="[
                  colorDegradadoDos(data.val().unidad),
                  'h-12 w-12 rounded-full p-1',
                ]"
              >
                <div
                  :class="[
                    colorTextoRentabilidadNeta(data.val().unidad),
                    'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
                  ]"
                >
                  <div class="text-xl font-bold">CI</div>
                </div>
              </div>
            </div>
            <div class="flex w-full flex-col">
              Costo Interno
              <div class="flex w-full items-end justify-between">
                <span class="text-lg font-semibold">{{
                  data.val().costoInterno.total
                }}</span>
                <button
                  class="text-[#2166E5] hover:underline"
                  @click="
                    detalleCostosGastosFunc(
                      'Costo Interno',
                      data.val().costoInterno
                    )
                  "
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
          <!-- Costo externo -->
          <div class="flex space-x-6" v-if="data.val().costoExterno">
            <div>
              <div
                :class="[
                  colorDegradadoDos(data.val().unidad),
                  'h-12 w-12 rounded-full p-1',
                ]"
              >
                <div
                  :class="[
                    colorTextoRentabilidadNeta(data.val().unidad),
                    'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
                  ]"
                >
                  <div class="text-xl font-bold">CE</div>
                </div>
              </div>
            </div>
            <div class="flex w-full flex-col">
              Costo Externo
              <div class="flex w-full items-end justify-between">
                <span class="text-lg font-semibold">{{
                  data.val().costoExterno.total
                }}</span>
                <button
                  class="text-[#2166E5] hover:underline"
                  @click="
                    detalleCostosGastosFunc(
                      'Costo Externo',
                      data.val().costoExterno
                    )
                  "
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
          <!-- Gastos -->
          <div class="flex space-x-6" v-if="data.val().gastos">
            <div>
              <div
                :class="[
                  colorDegradadoDos(data.val().unidad),
                  'h-12 w-12 rounded-full p-1',
                ]"
              >
                <div
                  :class="[
                    colorTextoRentabilidadNeta(data.val().unidad),
                    'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
                  ]"
                >
                  <div class="text-xl font-bold">GA</div>
                </div>
              </div>
            </div>
            <div class="flex w-full flex-col justify-around">
              Gastos
              <div class="flex w-full items-end justify-between">
                <span class="text-lg font-semibold">{{
                  data.val().gastos.total
                }}</span>
                <button
                  class="text-[#2166E5] hover:underline"
                  @click="detalleCostosGastosFunc('Gastos', data.val().gastos)"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin tarjeta costos/gastos -->
      <detalle-costos-gastos>
        <template #titulo>
          <div class="flex w-full justify-center text-xl font-bold">
            {{ dataDetalleCostosGastos.name }}
          </div>
        </template>
        <template #datos>
          <div>
            <div
              v-if="dataDetalleCostosGastos.control != 1"
              class="flex h-full w-full justify-around"
            >
              <div class="flex flex-col">
                <div>Material</div>
                <div
                  class="min-w-[120px] max-w-[120px] truncate rounded-md border border-[#7C8495] px-6 py-3"
                >
                  {{
                    dataDetalleCostosGastos.datos.material
                      ? dataDetalleCostosGastos.datos.material.toLocaleString(
                          "en"
                        )
                      : 0
                  }}
                </div>
              </div>
              <div class="flex flex-col">
                <div>Mano de obra</div>
                <div
                  class="min-w-[120px] max-w-[120px] truncate rounded-md border border-[#7C8495] px-6 py-3"
                >
                  {{
                    dataDetalleCostosGastos.datos.manoDeObra
                      ? dataDetalleCostosGastos.datos.manoDeObra.toLocaleString(
                          "en"
                        )
                      : 0
                  }}
                </div>
              </div>
            </div>
            <div v-else class="flex h-full w-full flex-col space-y-2">
              <div class="flex w-full justify-around">
                <div class="flex flex-col">
                  <div>Fijo</div>
                  <div
                    class="min-w-[120px] max-w-[120px] truncate rounded-md border border-[#7C8495] px-6 py-3"
                  >
                    {{
                      dataDetalleCostosGastos.datos.fijo
                        ? dataDetalleCostosGastos.datos.fijo.toLocaleString(
                            "en"
                          )
                        : 0
                    }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div>Nómina</div>
                  <div
                    class="min-w-[120px] max-w-[120px] truncate rounded-md border border-[#7C8495] px-6 py-3"
                  >
                    {{
                      dataDetalleCostosGastos.datos.nomina
                        ? dataDetalleCostosGastos.datos.nomina.toLocaleString(
                            "en"
                          )
                        : 0
                    }}
                  </div>
                </div>
              </div>
              <div class="flex w-full justify-around">
                <div class="flex flex-col">
                  <div>Variable</div>
                  <div
                    class="min-w-[120px] max-w-[120px] truncate rounded-md border border-[#7C8495] px-6 py-3"
                  >
                    {{
                      dataDetalleCostosGastos.datos.variable
                        ? dataDetalleCostosGastos.datos.variable.toLocaleString(
                            "en"
                          )
                        : 0
                    }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div>Otros</div>
                  <div
                    class="min-w-[120px] max-w-[120px] truncate rounded-md border border-[#7C8495] px-6 py-3"
                  >
                    {{
                      dataDetalleCostosGastos.datos.otros
                        ? dataDetalleCostosGastos.datos.otros.toLocaleString(
                            "en"
                          )
                        : 0
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </detalle-costos-gastos>
      <div class="flex items-center justify-center">
        <button
          class="rounded-xl bg-[#2166E5] py-3 px-12 text-white"
          type="button"
          @click="$store.commit('openModalFinalizarProyecto')"
        >
          Finalizar
        </button>
      </div>
      <modal-finalizar-proyectos :data="data" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getDatabase, ref as refDB, get, child } from "firebase/database"
import ModalFinalizarProyectos from "@/components/ModalFinalizarProyectos.vue"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
import ModalEditarTiempoVolumetria from "@/components/ModalEditarTiempoVolumetria.vue"
import ModalEditarCostosGastos from "@/components/ModalEditarCostosGastos.vue"
import ProyectosProcesoAvance from "@/components/ProyectosProcesoAvance.vue"
import { TransitionRoot } from "@headlessui/vue"
import {
  colorDegradado,
  colorDegradadoDos,
  colorFondo,
  colorTextoRentabilidadBruta,
  colorTextoRentabilidadNeta,
  colorFondoRentabilidadBruta,
  colorFondoRentabilidadNeta,
} from "@/utils/color.js"
import DetalleCostosGastos from "@/components/DetalleCostosGastos.vue"

const database = getDatabase()
const route = useRoute()
const proyectoRef = refDB(database)
const data = ref({
  nombre: "",
})
const dataDetalleCostosGastos = ref({
  name: "",
  datos: "",
  control: 0,
})
const creado = ref()
const iTotal = ref()
const diasAvanzados = ref()
const key = ref()

get(child(proyectoRef, `proyectos/${route.params.key}`)).then((snapshot) => {
  if (snapshot.exists()) {
    data.value = snapshot
    const date = new Date(snapshot.val().creado)
    creado.value =
      date.getDate() +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear()
    iTotal.value = snapshot.val().ingresoTotal.toLocaleString("en", {
      style: "currency",
      currency: "MXN",
    })
  }
})

onMounted(() => {
  detalleCostosGastosFunc("CostoInterno", data.value.val().costoInterno)
})

const detalleCostosGastosFunc = (titulo, datos) => {
  dataDetalleCostosGastos.value.name = titulo
  dataDetalleCostosGastos.value.datos = datos
  if (titulo === "Gastos") dataDetalleCostosGastos.value.control = 1
  else dataDetalleCostosGastos.value.control = 0
}
</script>
